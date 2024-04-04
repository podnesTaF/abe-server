import { Country } from "src/country/entity/country.entity";
import { Media } from "src/media/entities/media.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  stadium: string;

  @ManyToOne(() => Media, { nullable: true, eager: true })
  placeImage: Media;

  @Column({ nullable: true, type: "text" })
  placeDescription: string;

  @ManyToOne(() => Country, (country) => country.locations, {
    onDelete: "CASCADE",
  })
  country: Country;
}
