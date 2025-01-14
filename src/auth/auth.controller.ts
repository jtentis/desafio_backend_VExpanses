import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Faça login para autenticar.', description: 'Autentique-se para liberar todas as funcionalidades abaixo!'})
    @ApiResponse({ status: 201, description: 'Usuário logado com sucesso.' })
    @ApiResponse({ status: 401, description: 'Credencias inválidas.' })
    @ApiResponse({ status: 500, description: 'Erro de conexão!' })
    async login(@Body() authDto: AuthDto) {
        const user = await this.authService.validateUser(authDto);
        if (!user) {
            throw new UnauthorizedException('Credencias inválidas.');
        }
        return this.authService.login(user);
    }
}
