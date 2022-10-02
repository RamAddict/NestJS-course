import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { Serialize } from '../interceptors/generic-class-serializer.interceptor';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }
    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Get('/:id')
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
