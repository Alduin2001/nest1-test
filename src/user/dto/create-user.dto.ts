import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username:string
    login:string
    password:string
}
