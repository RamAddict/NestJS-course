import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signUp(email: string, password: string) {
        const users = await this.usersService.find(email);
        if (users.length) throw new BadRequestException('email in use');

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        const newUser = new CreateUserDto(email, result);
        console.log(newUser);
        return await this.usersService.create(newUser);
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) throw new NotFoundException('user not found');
        const [salt, hash] = user.password.split('.');
        const newHash = (await scrypt(password, salt, 32)) as Buffer;
        if (newHash.toString('hex') !== hash) throw new BadRequestException('bad password');
        return user;
    }
}
