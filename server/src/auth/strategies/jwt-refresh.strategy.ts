import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {
        const secret = configService.get<string>('JWT_REFRESH_SECRET');

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    return req.cookies?.refresh_token || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        } as any);
    }

    async validate(payload: any) {
        return payload;
    }
}