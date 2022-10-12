import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => Promise.resolve({ id, email: 'cancain@sad.csa', password: 'sad!' } as User),
            find: (email: string) => Promise.resolve([{ id: 1, email, password: 'sad!' } as User]),
        };
        fakeAuthService = {
            signIn: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: fakeUsersService },
                { provide: AuthService, useValue: fakeAuthService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('findAllUsers returns a list of users with the given email', async () => {
        const users = await controller.findAllUsers('cancain@sad.csa');
        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual('cancain@sad.csa');
    });
    it('findUser returns a single user with the given id', async () => {
        const user = await controller.findUser('1');
        expect(user).toBeDefined();
    });
    it('findUser throws an error if user with given id is not found', async () => {
        fakeUsersService.findOne = () => null;
        await expect(controller.findUser('1')).rejects.toThrow();
    });
    it('signin updates session object and returns user', async () => {
        const session = { userId: 11 };
        const user = await controller.signIn({ email: 'canc@cnas.a', password: 'sad' }, session);
        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });
});
