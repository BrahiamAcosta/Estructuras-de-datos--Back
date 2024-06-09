import { Controller, Post, Body} from '@nestjs/common';
import { QrsService } from './qrs.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { GetQrDto } from './dto/get-qr.dto';

@Controller('qrs')
export class QrsController {
  constructor(private readonly qrsService: QrsService) {}

  @Post('create')
  create(@Body() createQrDto: CreateQrDto) {
    return this.qrsService.create(createQrDto);
  }

  @Post('find')
  findQr(@Body() getQrDto: GetQrDto) {
    return this.qrsService.findQr(getQrDto);
  }

}
