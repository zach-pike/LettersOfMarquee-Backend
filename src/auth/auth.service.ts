import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(data: LoginDTO) {
        if (!data.username || !data.password) throw new UnauthorizedException();

        const user = await this.usersService.getUserByUsername(data.username);

        // Check if password is correct
        if (!await this.usersService.checkPassword(user, data.password)) throw new UnauthorizedException();
        
        // Password correct
        const { username, realName, email, dateOfCreation } = user;

        return {
            accessToken: await this.jwtService.signAsync({
                username,
                realName,
                email,
                dateOfCreation
            }),
        };
    }
}
