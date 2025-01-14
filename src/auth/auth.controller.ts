import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Faça login para autenticar.' })
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro de login.' })
    async login(@Body() authDto: AuthDto) {
        const user = await this.authService.validateUser(authDto);
        if (!user) {
            throw new UnauthorizedException('Credencias inválidas.');
        }
        return this.authService.login(user);
    }
}
