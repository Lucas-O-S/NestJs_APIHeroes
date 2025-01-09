import { Body, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./dto/userCreate.dto";


export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() user: User) {

    }

}