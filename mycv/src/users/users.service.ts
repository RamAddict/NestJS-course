import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(user: CreateUserDto): Promise<User> {
        return this.repo.save(this.repo.create(user));
    }

    findOne(id: number) {
        if (!id) return null;
        return this.repo.findOne({ where: { id } });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (user) {
            Object.assign(user, attrs);
            return this.repo.save(user);
        }
        throw new NotFoundException('user not found');
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (user) {
            return await this.repo.remove(user);
        }
        throw new NotFoundException('user not found');
    }
}
