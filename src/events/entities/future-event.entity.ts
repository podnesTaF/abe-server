import { Content } from "src/content/entities/content.entity";
import { Media } from "src/media/entities/media.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./event.entity";

@Entity()
export class FutureEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Media)
  introImage: Media;

  @Column()
  season: string;

  @Column({ nullable: true })
  locationInfo?: string;

  @Column({ nullable: true })
  date?: Date;

  @Column({ default: false })
  announced: boolean;

  @ManyToOne(() => Event, { nullable: true })
  event: Event;

  @OneToMany(() => Content, (content) => content.futureEvent)
  contents: Content[];
}
