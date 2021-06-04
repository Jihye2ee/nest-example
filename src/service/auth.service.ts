import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from 'src/resolvers/user/dto/signup.input';
import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private passwordService: PasswordService
    ) {}
    
    async validateUser(user: User): Promise<any> {
        // const userTmp = await this.usersService.findOne(user.username);
        // const userTmp = await this.usersService.user(user.id);
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result; 
        // }

        return null;
    }
    
    async createUser(payload: SignupInput): Promise<String> {
    // async createUser(payload: Prisma.UserCreateInput): Promise<String> {
        const password = await this.passwordService.hashPassword(payload.password);
        
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...payload,
                    password: password,
                }
            })
            
            return this.jwtService.sign({userId: user.id});
        } catch (error) {
            throw new ConflictException(`id ${payload.email} is already used`);
        }
    }

    async login(user: any) {
        console.log('[auth.service] login', user);
        const result = this.validateUser(user);
        const payload = { username: user.id, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
