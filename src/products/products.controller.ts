import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products') // Grupo de endpoints para produtos
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Crie um produto.' })
    @ApiResponse({ status: 200, description: 'O produto foi criado com sucesso!' })
    @ApiResponse({ status: 400, description: 'Erro de validação ou campos ausentes!' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Liste todos os produtos.', description: 'Retrieves all products.' })
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Detalhes de produtos.'})
    @ApiParam({ name: 'id', description: 'ID do produto para ver.', type: Number })
    @ApiResponse({ status: 200, description: 'Detalhes do produto especificado.' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado!' })
    findOne(@Param('id') id: number) {
        return this.productsService.findOne(Number(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualize um produto.', description: 'Atualiza um produto existente.' })
    @ApiResponse({ status: 201, description: 'O produto foi edito com sucesso.' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    @ApiParam({ name: 'id', description: 'ID do produto para editar.', type: Number })
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(Number(id), updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto.', description: 'Deleta um produto.' })
    @ApiParam({ name: 'id', description: 'ID do produto para deletar.', type: Number })
    remove(@Param('id') id: number) {
        return this.productsService.remove(Number(id));
    }
}
