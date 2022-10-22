import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";
export class ReportDto {
    @Expose()
    model: string;
    @Expose()
    make: string;

    @Expose()
    year: number;

    @Expose()
    mileage: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    price: number;

    @Expose()
    approved: boolean;

    @Expose()
    id: number;

    @Transform(({obj}) => {console.log(obj); return obj.user.id})
    @Expose()
    userId: number;
}