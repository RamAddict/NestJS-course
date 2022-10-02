import { UsersService } from '../users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should be defined', () => {
    expect(new AuthService({} as UsersService)).toBeDefined();
  });
});
