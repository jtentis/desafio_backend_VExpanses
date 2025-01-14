import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlansService } from './plans.service';

@ApiTags('plans') // Group the endpoints under the "plans" tag
@Controller('plans')
export class PlansController {
    constructor(private readonly planService: PlansService) { }

    @Post()
    @ApiOperation({ summary: 'Criar um novo plano', description: 'Cria um novo plano com pelo menos 1 produto' })
    @ApiResponse({ status: 201, description: 'O plano foi criado com sucesso!' })
    @ApiResponse({ status: 400, description: 'Erro de validação ou campos ausentes!' })
    create(@Body() createPlanDto: CreatePlanDto) {
        return this.planService.create(createPlanDto);
    }

    @Get()
    @ApiOperation({ summary: 'Ver detalhe de todos os planos!', description: 'Recebe informações detalhadas sobre todos os planos, incluindo seu histórico e produtos.' })
    @ApiResponse({ status: 200, description: 'Detalhes dos planos' })
    @ApiResponse({ status: 404, description: 'Erro ao listar planos' })
    getAllPlanDetails() {
        return this.planService.getAllPlanDetails();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ver detalhe dos planos!', description: 'Recebe informações detalhadas sobre um plano especifico, incluindo seu histórico e produtos.' })
    @ApiResponse({ status: 200, description: 'Detalhes do plano especificado.' })
    @ApiResponse({ status: 404, description: 'Plano não encontrado!' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do plano desejado.' })
    getDetails(@Param('id') id: number) {
        return this.planService.getPlanDetails(Number(id));
    }

    @Post(':planId/products/:productId')
    @ApiOperation({ summary: 'Adicione um produto a um plano!', description: 'Associar um produto a um plano existente!' })
    @ApiResponse({ status: 201, description: 'O produto foi adicionado ao plano.' })
    @ApiResponse({ status: 404, description: 'Plano ou produto não encontrado.' })
    @ApiParam({ name: 'planId', type: Number, description: 'ID do plano para qual o produto será adicionado!' })
    @ApiParam({ name: 'productId', type: Number, description: 'ID do produto a ser adicionado.' })
    addProduct(@Param('planId') planId: number, @Param('productId') productId: number) {
        return this.planService.addProductToPlan(Number(planId), Number(productId));
    }

    @Delete(':planId/products/:productId')
    @ApiOperation({ summary: 'Remova um produto de um plano.', description: 'Tirar um produto de um plano existente.' })
    @ApiResponse({ status: 200, description: 'O produto foi removido do plano!' })
    @ApiResponse({ status: 404, description: 'Plano ou produto não encontrado!' })
    @ApiParam({ name: 'planId', type: Number, description: 'ID do plano para qual o produto será removido!' })
    @ApiParam({ name: 'productId', type: Number, description: 'ID do produto a ser removido.' })
    removeProduct(@Param('planId') planId: number, @Param('productId') productId: number) {
        return this.planService.removeProductFromPlan(Number(planId), Number(productId));
    }
}
