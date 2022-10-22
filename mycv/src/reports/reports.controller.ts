import { Body, Controller, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/generic-class-serializer.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';

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
    @UseGuards(AdminGuard)
    @Patch(':id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
