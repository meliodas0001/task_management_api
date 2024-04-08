import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '@app/services/auth/auth.service';
import { PrismaService } from '@infra/database/prisma.service';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
