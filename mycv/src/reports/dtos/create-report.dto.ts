import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
    @IsString()
    model: string;
    @IsString()
    make: string;

    @Min(1900)
    @Max(2023)
    year: number;

    @Min(0)
    @Max(1e6)
    mileage: number;
    @IsLongitude()
    lng: number;
    @IsLatitude()
    lat: number;
    @IsNumber({maxDecimalPlaces: 2})
    price: number;
}