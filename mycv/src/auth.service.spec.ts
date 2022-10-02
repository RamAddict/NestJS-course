import { User } from 'src/users/user.entity';
import { Test } from '@nestjs/testing';
import { UsersService } from './users/users.service';
import { AuthService } from './users/auth/auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async () => {
        // Create fake copy of users service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (user: User) => Promise.resolve({ id: 1, email: user.email, password: user.password } as User),
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
        fakeUsersService.find = () => Promise.resolve([{ email: 's2e@pleas.e2', id: 1, password: '1' } as User]);
        await expect(service.signUp('pleas2ee', 'asd')).rejects.toThrow();
    });
});
