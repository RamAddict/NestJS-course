import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/generic-class-serializer.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}
    @Post()
    @UseGuards(AuthGuard)
    // @UseInterceptors(GenericClassSerializerInterceptor<ReportDto>)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
