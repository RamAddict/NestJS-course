import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    approved: boolean;

    @Column()
    price: number;

    @Column()
    model: string;

    @Column()
    make: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    // This annotation actually provokes changes in the db, whereas its counterpart
    // OneToMany does not.
    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}