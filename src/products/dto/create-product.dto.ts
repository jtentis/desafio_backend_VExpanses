import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Produto 1' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto.', example: 'Descrição do produto 1', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'A qual plano esse produto será vinculado?', example: 'Opicional caso queira vincular produto a um plano logo na sua criação!', required: false })
  @IsOptional()
  planId?: number;
}
