import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Role must be one of INTERN, ENGINEER, ADMIN' })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}