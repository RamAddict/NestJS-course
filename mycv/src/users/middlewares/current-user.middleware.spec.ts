import { UsersService } from '../users.service';
import { CurrentUserMiddleware } from './current-user.middleware';

describe('CurrentUserMiddleware', () => {
    it('should be defined', () => {
        expect(new CurrentUserMiddleware({} as UsersService)).toBeDefined();
    });
});
