import { Controller, Get, Post, Body,Param } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qrs')
export class QrsController {
  constructor(private readonly qrsService: QrsService) {}

  @Post()
  create(@Body() createQrDto: CreateQrDto) {
    return this.qrsService.create(createQrDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrsService.findOneByIdentifier(id);
  }

}
