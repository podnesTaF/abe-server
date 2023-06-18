import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { CoachEntity } from 'src/coach/entities/coach.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { LocationEntity } from 'src/locations/entities/locations.entity';
import { PersonalBestEntity } from 'src/personal-bests/entities/personal-best.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
evnconfig();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST || 'localhost',
  port: parseInt(process.env.MYSQLPORT, 10) || 3306,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [
    UserEntity,
    EventEntity,
    LocationEntity,
    PlayerEntity,
    TeamEntity,
    CoachEntity,
    PersonalBestEntity,
    PrizeEntity,
    TransactionEntity,
  ],
  synchronize: true,
};

export default config;
