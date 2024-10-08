import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from 'src/users/dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('/signup')
    async signUp(@Body() body: SignUpDTO) {
        return await this.usersService.createUser(body);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDTO) {
        return await this.authService.login(body);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
