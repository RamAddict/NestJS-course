import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import Report from './reports/report.entity';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
const cookieSession = require('cookie-session');

@Module({
    imports: [
        // ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true,
        }),
        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
        // { provide: APP_INTERCEPTOR, useClass: GenericClassSerializerInterceptor},
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieSession({ keys: ['pemba'] })).forRoutes('*');
    }
}
