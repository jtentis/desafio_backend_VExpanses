import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Produto 1' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto.', example: 'Descrição do produto 1', required: false })
  description?: string;
}
