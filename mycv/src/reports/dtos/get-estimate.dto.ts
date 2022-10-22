import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    model: string;
    @IsString()
    make: string;

    @Transform(({value}) => parseInt(value))
    @Min(1900)
    @Max(2023)
    year: number;

    @Transform(({value}) => parseInt(value))
    @Min(0)
    @Max(1e6)
    mileage: number;

    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    lng: number;
    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    lat: number;

}