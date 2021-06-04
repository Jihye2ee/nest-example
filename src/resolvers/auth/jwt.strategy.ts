import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/service/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            signOptions: { expiresIn: '60s' },
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: any) {
        console.log('[jwt strategy] validate', payload);
        const user = await this.authService.validateUser(payload.name);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}