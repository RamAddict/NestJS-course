import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}