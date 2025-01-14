
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Usuário de acesso.', example: 'usuario_teste' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Senha de acesso.', example: 'password_teste'})
    password: string;
}