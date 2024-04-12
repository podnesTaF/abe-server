import { Content } from "src/modules/content/entities/content.entity";
import { Hashtag } from "src/modules/hashtag/entities/hashtag.entity";
import { Media } from "src/modules/media/entities/media.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Media, { nullable: true })
  mainImage: Media;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.news)
  @JoinTable()
  hashtags: Hashtag[];

  @OneToMany(() => Content, (content) => content.news, { onDelete: "CASCADE" })
  contents: Content[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
