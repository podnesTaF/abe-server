import { Content } from "src/content/entities/content.entity";
import { Media } from "src/media/entities/media.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @OneToMany(() => Content, (content) => content.futureEvent)
  contents: Content[];
}
