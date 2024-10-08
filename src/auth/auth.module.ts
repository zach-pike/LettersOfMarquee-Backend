import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtPassphrase } from 'src/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtPassphrase,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
