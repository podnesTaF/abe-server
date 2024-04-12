import { Content } from "src/modules/content/entities/content.entity";
import { Hashtag } from "src/modules/hashtag/entities/hashtag.entity";
import { Location } from "src/modules/locations/entities/locations.entity";
import { Media } from "src/modules/media/entities/media.entity";
import { PrizeCategory } from "src/modules/prizes/entities/prize-category";
import { Race } from "src/modules/race/entities/race.entity";
import { TeamRegistration } from "src/modules/team-registration/entities/team-registration.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Timetable } from "src/modules/timetable/entities/timetable.entity";
import { ViewerRegistration } from "src/modules/viewer-registrations/entities/viewer-registration.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: "outdoor",
  })
  category: string;

  @Column({
    default: "free",
  })
  attendanceType: string;

  @Column()
  startDateTime: Date;

  @Column()
  endDate: Date;

  @Column()
  eventCode: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Media, { nullable: true, eager: true })
  @JoinColumn()
  introImage: Media;

  @ManyToOne(() => Media, { nullable: true, eager: true })
  @JoinColumn()
  minorImage: Media;

  @OneToMany(() => Content, (content) => content.event, { nullable: true })
  contents: Content[];

  @OneToMany(() => Timetable, (timetable) => timetable.event)
  timetables: Timetable[];

  @OneToOne(() => Location, { onDelete: "CASCADE" })
  @JoinColumn()
  location: Location;

  @OneToMany(() => PrizeCategory, (cat) => cat.event, {
    onDelete: "CASCADE",
    nullable: true,
  })
  prizeCategories: PrizeCategory[];

  @OneToMany(
    () => ViewerRegistration,
    (viewerRegistration) => viewerRegistration.event,
  )
  viewerRegistrations: ViewerRegistration[];

  @Column({ type: "datetime", nullable: true })
  publishedAt: Date;

  @Column({ default: false })
  finished: boolean;

  // to remove
  @ManyToMany(() => Team, (team) => team.events, {
    onDelete: "CASCADE",
  })
  teams: Team[];

  @OneToMany(
    () => TeamRegistration,
    (teamRegistration) => teamRegistration.event,
  )
  teamRegistrations: TeamRegistration[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.events, {
    onDelete: "CASCADE",
    nullable: true,
  })
  hashtags: Hashtag[];

  @OneToMany(() => Race, (race) => race.event, { nullable: true })
  races: Race[];
}
