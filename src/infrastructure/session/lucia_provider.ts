import { Lucia, TimeSpan } from "lucia";
import type { IJwtProvider } from "../../adapter/provider/jwt_provider";

const lucia = new Lucia( null as any, {
    sessionExpiresIn: new TimeSpan(2, "w"), //二週間
    getUserAttributes: (attributes) => ({
        uuid: attributes.uuid,
    }),
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            uuid: string
        }
    }
}

export class LuciaJwtProvider implements IJwtProvider {
    async generateToken(uuid: string): Promise<string> {
        const session = await lucia.createSession(uuid, {});
        return session.id;
    }
}