import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateErrorReportDto } from './dto/create-error-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorReport } from './entities/error-report.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { QrsService } from 'src/qrs/qrs.service';

@Injectable()
export class ErrorReportService {

  constructor(@InjectRepository(ErrorReport) private readonly errorReportRepository:Repository<ErrorReport>,
  private readonly usersService:UsersService,
  private readonly qrsService:QrsService){}

  async create(createErrorReportDto: CreateErrorReportDto) {
    const {qrIdentifier, userName, description} = createErrorReportDto
    const user = await this.usersService.findOneByUserName(userName) 
    if (!user) {
       throw new BadRequestException('Ocurrio un error: Usuario invalido');
    }
    const qr = await this.qrsService.existsQr(qrIdentifier)
    if(!qr){
      throw new BadRequestException('Lo sentimos, este codigo no existe en nuestra base de datos')
    }

    const newErrorReport = new ErrorReport()
    newErrorReport.qr = qr
    newErrorReport.user = user
    newErrorReport.description = description
    newErrorReport.date = new Date()
    await this.errorReportRepository.save(newErrorReport)

    return 'Reporte agregado con exito'
  }

  async findAll() {
    const errorReports = await this.errorReportRepository
      .createQueryBuilder('errorReport')
      .leftJoinAndSelect('errorReport.qr', 'qr')
      .leftJoin('errorReport.user', 'user')
      .select([
        'errorReport.id',
        'errorReport.description',
        'errorReport.date', 
        'qr.id',
        'user.id', 
        'user.userName', 
      ])
      .getMany();

    return errorReports;
  }

  async findOne(id: number) {
    const errorReport = await this.errorReportRepository
      .createQueryBuilder('errorReport')
      .leftJoinAndSelect('errorReport.qr', 'qr') // Carga la relación del QR
      .leftJoinAndSelect('qr.resources', 'resource') // Carga la relación de recursos del QR
      .where('errorReport.id = :id', { id })
      .getOne();

    return errorReport;
  }


  async remove(id: number) {
    const errorReportToRemove = await this.errorReportRepository.findOne({where:{id}});
    if (!errorReportToRemove) {
        throw new NotFoundException(`Error:No se encontró un reporte con el id ${id}`);
    }
    return await this.errorReportRepository.remove(errorReportToRemove);
}
}
