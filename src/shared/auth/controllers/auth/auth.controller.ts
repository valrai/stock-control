import { IResponse } from './../../interfaces/response.interface';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from '../../dtos/credentials/credentials.dto';
import { AuthService } from '../../services/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../guards/public.auth.guard';

@ApiTags('sign-in')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<IResponse> {
    return await this.authService.signIn(credentiaslsDto);
  }
}
