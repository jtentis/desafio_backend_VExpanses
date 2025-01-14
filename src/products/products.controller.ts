import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // para o swagger
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Crie um produto.' })
    @ApiResponse({ status: 201, description: 'Sucesso. Produto criado!' })
    @ApiResponse({ status: 400, description: 'Erro de validação ou campos ausentes!' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    create(@Body() createProductDto: CreateProductDto) {
        if (createProductDto.planId) {
            createProductDto.planId = Number(createProductDto.planId);
        }
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Liste todos os produtos.', description: 'Retrieves all products.' })
    @ApiResponse({ status: 201, description: 'Sucesso. Exibindo detalhes de todos os produtos!' })
    @ApiResponse({ status: 404, description: 'Produtos não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Detalhes de produtos.' })
    @ApiParam({ name: 'id', description: 'ID do produto para ver.', type: Number })
    @ApiResponse({ status: 201, description: 'Sucesso. Exibindo detalhes do produto!' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    findOne(@Param('id') id: number) {
        return this.productsService.findOne(Number(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualize um produto.', description: 'Atualiza um produto existente.' })
    @ApiResponse({ status: 201, description: 'Sucesso. O produto foi editad.' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    @ApiParam({ name: 'id', description: 'ID do produto para editar.', type: Number })
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(Number(id), updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto.', description: 'Deleta um produto.' })
    @ApiResponse({ status: 201, description: 'Sucesso. O produto foi deletado.' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    @ApiParam({ name: 'id', description: 'ID do produto para deletar.', type: Number })
    remove(@Param('id') id: number) {
        return this.productsService.remove(Number(id));
    }
}
