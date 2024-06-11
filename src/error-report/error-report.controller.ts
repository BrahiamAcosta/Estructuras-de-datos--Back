import { Controller, Get, Post, Body,  Param, Delete } from '@nestjs/common';
import { ErrorReportService } from './error-report.service';
import { CreateErrorReportDto } from './dto/create-error-report.dto';

@Controller('errorReport')
export class ErrorReportController {
  constructor(private readonly errorReportService: ErrorReportService) {}

  @Post()
  create(@Body() createErrorReportDto: CreateErrorReportDto) {
    return this.errorReportService.create(createErrorReportDto);
  }

  @Get()
  findAll() {
    return this.errorReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.errorReportService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorReportService.remove(+id);
  }
}
