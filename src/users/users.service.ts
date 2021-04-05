
import { Injectable } from '@nestjs/common';


export type User = any;


@Injectable()
export class UsersService {

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
    ];
    


    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    // async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    //     return this.prisma.user.findUnique({
    //         where: userWhereUniqueInput
    //     });
    // }

    // async users(params: {
    //     skip?: number,
    //     take?: number,
    //     cursor?: Prisma.UserWhereUniqueInput,
    //     where?: Prisma.UserWhereInput,
    //     orderBy?: Prisma.UserOrderByInput
    // }): Promise<User[]> {
    //     const { skip, take, cursor, where, orderBy } = params;
    //     return this.prisma.user.findMany({
    //         skip,
    //         take,
    //         cursor,
    //         where,
    //         orderBy
    //     });
    // }

    // async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //     return this.prisma.user.create({
    //         data,
    //     });
    // }
    
    // async updateUser(params: {
    //     where: Prisma.UserWhereUniqueInput;
    //     data: Prisma.UserUpdateInput;
    // }): Promise<User> {
    //     const { where, data } = params;
    //     return this.prisma.user.update({
    //         data,
    //         where,
    //     });
    // }
    
    // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    //     return this.prisma.user.delete({
    //         where,
    //     });
    // }
}
