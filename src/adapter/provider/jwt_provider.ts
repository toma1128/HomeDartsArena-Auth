export interface IJwtProvider {
    generateToken(uuid: string): Promise<string>
}