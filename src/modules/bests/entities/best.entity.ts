import { Runner } from "src/modules/users/entities/runner.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Best {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distanceInCm: number;

  @Column({
    nullable: true,
  })
  timeInMs: number;

  @Column({
    nullable: true,
  })
  result: string;

  @ManyToOne(() => Runner, (runner) => runner.selfDefinedSB, {
    onDelete: "CASCADE",
  })
  runnerSb: Runner;

  @ManyToOne(() => Runner, (runner) => runner.selfDefinedPB, {
    onDelete: "CASCADE",
  })
  runnerPb: Runner;
}
