import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//Implementacion pendiente para proteger la ruta admin
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    console.log(request.headers.authorization)
    return true;
  }
}