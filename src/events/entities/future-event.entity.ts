import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FutureEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  season: string;

  @Column({ nullable: true })
  date?: Date;
}
