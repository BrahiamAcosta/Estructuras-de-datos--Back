import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { userName, email, password } = registerDto;

    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(
        'Esta direccion de correo ya se encuentra registrada',
      );
    }
    user = await this.usersService.findOneByUserName(userName);
    if (user) {
      throw new BadRequestException(
        'Este nombre de usuario no se encuetra disponible',
      );
    }
    user = await this.usersService.create({
      userName,
      email,
      password: await bcryptjs.hash(password, 10),
    });
    return { message: 'Cuenta creada con exito', userName: user.userName };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        'No hay una cuenta asociada a este correo',
      );
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const payload = { userName: user.userName };
    const token = await this.jwtService.signAsync(payload);
    return { token, userName: user.userName };
  }
}
