import { sign } from 'hono/jwt';
import type { IJwtProvider } from '../../adapter/provider/jwt_provider';
import { env } from '../../config/env';

export class HonoJwtProvider implements IJwtProvider {
    async generateToken(uuid: string): Promise<string> {
        const payload = {
            sub: uuid,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14,
            iat: Math.floor(Date.now() / 1000),
        };

        return await sign(payload, env.JWT_SECRET);
    }
}