import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SplitsService } from 'src/splits/splits.service';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateRunnerResultDto } from './dto/create-runner-result.dto';
import { RunnerResult } from './entities/runner-results.entity';

@Injectable()
export class RunnerResultsService {
  constructor(
    @InjectRepository(RunnerResult)
    private repository: Repository<RunnerResult>,
    @InjectRepository(TeamResult)
    private teamResRepository: Repository<TeamResult>,
    @InjectRepository(User)
    private runnerRepository: Repository<User>,
    private splitService: SplitsService,
    private userService: UserService,
  ) {}

  async create(dto: CreateRunnerResultDto) {
    const teamResult = await this.teamResRepository.findOne({
      where: { id: dto.teamResultId },
    });

    const runner = await this.runnerRepository.findOne({
      relations: ['personalBest'],
      where: { id: dto.runnerId },
    });

    if (!runner) {
      throw new Error('Runner not found');
    }

    const runnerResult = await this.repository.save({
      teamResult,
      runner,
      distance: dto.distance,
      runnerType: dto.runnerType || null,
      finalResultInMs: dto.finalResultInMs,
    });

    runner.personalBests = runner.personalBests || [];

    const pbIdx = runner.personalBests.findIndex(
      (pb) => pb.distance === dto.distance,
    );

    if (pbIdx !== -1) {
      if (runner.personalBests[pbIdx].finalResultInMs > dto.finalResultInMs) {
        runner.personalBests[pbIdx].finalResultInMs = dto.finalResultInMs;
        await this.runnerRepository.save(runner);
      }
    } else {
      runner.personalBests.push(runnerResult);
      await this.runnerRepository.save(runner);
    }

    await this.userService.changeTotalPointsByAddedResult(runnerResult);

    await this.userService.updateRanking(runnerResult.runner.gender);

    const splits = [];

    for (const split of dto.splits) {
      const newSplit = await this.splitService.create(
        { ...split },
        runnerResult.id,
      );

      splits.push(newSplit);
    }

    return this.repository.save({
      ...runnerResult,
      splits,
    });
  }

  async getUserResults(
    userId: number,
    queries: { limit?: number; page?: number },
  ) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;

    const totalCount = await this.repository
      .createQueryBuilder('runnerResult')
      .leftJoin('runnerResult.runner', 'runner')
      .where('runner.id = :userId', { userId })
      .getCount();

    const pageCount = Math.ceil(totalCount / limit);

    const results = await this.repository
      .createQueryBuilder('runnerResult')
      .leftJoinAndSelect('runnerResult.teamResult', 'teamResult')
      .leftJoin('teamResult.team', 'team')
      .leftJoin('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .leftJoin('runnerResult.pbForRunner', 'pbForRunner')
      .leftJoin('runnerResult.runner', 'runner')
      .where('runner.id = :userId', { userId })
      .offset(offset)
      .limit(limit)
      .select([
        'runnerResult.id',
        'runnerResult.distance',
        'runnerResult.finalResultInMs',
        'teamResult.id',
        'teamResult.resultInMs',
        'race.id',
        'race.startTime',
        'event.id',
        'event.title',
        'winner.id',
        'team.id',
        'pbForRunner.id',
      ])
      .getRawMany();

    return {
      results,
      totalPages: pageCount,
    };
  }

  async updateResult(
    id: number,
    body: { distance?: number; finalResultInMs?: number },
  ) {
    return this.repository.update(id, body);
  }
}
