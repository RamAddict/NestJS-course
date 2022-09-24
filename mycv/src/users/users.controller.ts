import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { GenericClassSerializerInterceptor } from 'src/inerceptors/generic-class-serializer.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.create(body);
    }
    @Get('/:id')
    @UseInterceptors(new GenericClassSerializerInterceptor(UserDto))
    async findUser(@Param('id') id: string) {
        const user = this.usersService.findOne(Number.parseInt(id));
        if (user) {
            return user;
        }
        throw new NotFoundException('user not found');
    }
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return await this.usersService.find(email);
    }
    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        return await this.usersService.remove(Number.parseInt(id));
    }
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return await this.usersService.update(Number.parseInt(id), body);
    }
}
