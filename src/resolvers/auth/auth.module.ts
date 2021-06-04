import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../service/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/service/prisma.service';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { PasswordService } from 'src/service/password.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configServie: ConfigService) => {
        return {
          secret: configServie.get<string>('JWT_SECRET') //jwtConstants.secret
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
    PrismaService,
    GqlAuthGuard,
    PasswordService
  ],
  exports: [
    GqlAuthGuard,
  ],
})
export class AuthModule {

}
