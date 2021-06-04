
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/service/auth.service";
import { Auth } from "src/models/auth";
import { SignupInput } from "../user/dto/signup.input";

@Resolver(of => Auth)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {

    }

    @Mutation(returns => Auth)
    async signup(@Args('data') data: SignupInput) {
        data.email = data.email.toLowerCase();
        const token = await this.authService.createUser(data);
        return {
            token
        };
    }

}