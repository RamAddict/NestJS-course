import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

declare global {
    interface Request {
        currentUser?: User;
        session?: {userId?: number};
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}
    async use(req: Request, res: Response, next: () => void) {
        const {userId} = req.session || {};
        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }
        next();
    }
}
