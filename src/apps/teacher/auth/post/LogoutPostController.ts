import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';

@Controller('teacher/auth')
export class LogoutPostController {
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {}
}
