import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}