import { User } from 'src/users/user.entity';
import { Test } from '@nestjs/testing';
import { UsersService } from './users/users.service';
import { AuthService } from './users/auth/auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async () => {
        // Create fake copy of users service
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter((user) => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (user: User) => {
                // const user = { id: Math.floor(Math.random()*999999), email: user.email, password: user.password } as User;
                user.id = Math.floor(Math.random()*999999);
                users.push(user);
                return Promise.resolve(user);
            },
        };
        const module = await Test.createTestingModule({
            providers: [AuthService, { provide: UsersService, useValue: fakeUsersService }],
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a user with a salted and hashed password', async () => {
        const user = await service.signUp('please@pleas.e', 'asd');
        const [salt, hash] = user.password.split('.');
        expect(user.password).not.toEqual('asd');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
    it('throws an error if user signs up with email already in use', async () => {
        await service.signUp('3242@asd.com', 'password');
        await expect(service.signUp('3242@asd.com', 'asd')).rejects.toThrow();
    });
    it('throws an error if signin is called with an unused email', async () => {
        await expect(service.signIn('asda@sda.com', 'spasdpasd')).rejects.toThrow();
    });
    it('throws if an invalid password is provided', async () => {
        await service.signUp('3242@asd.com', 'password');
        await expect(service.signIn('3242@asd.com', 'passwords')).rejects.toThrow();
    });
    it('returns a user if a correct password is provided', async () => {
        await service.signUp('sad@sad.sad', 'sad');
        const user = await service.signIn('sad@sad.sad', 'sad');
        expect(user).toBeDefined();
    });
});
