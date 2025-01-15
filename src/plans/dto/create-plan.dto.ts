
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do plano.', example: 'Plano Premium' })
    name: string;

    @IsString()
    @ApiProperty({ description: 'Uma breve descrição do plano.', example: 'Esse plano contém coisas premium bl.', required: false })
    description?: string;

    @ArrayNotEmpty()
    @ApiProperty({ description: 'IDs de produtos para associar a um plano (em formato de matriz).', example: '[1,2,3]', required: true })
    @IsInt({ each: true })
    productIds: number[];
}