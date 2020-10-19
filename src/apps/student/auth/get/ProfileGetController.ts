import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { StudentAuthGuard } from '../StudentAuthGuard';

@Controller('student/auth')
@UseGuards(StudentAuthGuard)
export class ProfileGetController {
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
