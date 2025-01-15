import { Body, Controller, Delete, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlansService } from './plans.service';

@ApiTags('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // para o swagger
@Controller('plans')
export class PlansController {
    private readonly logger = new Logger(PlansController.name)
    constructor(private readonly planService: PlansService) { }

    @Post()
    @ApiOperation({ summary: 'Criar um novo plano', description: 'Cria um novo plano com pelo menos 1 produto' })
    @ApiResponse({ status: 201, description: 'Sucesso. O plano foi criado.' })
    @ApiResponse({ status: 404, description: 'Plano nao pode ser criado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    async create(@Body() createPlanDto: CreatePlanDto) {
        this.logger.log(`Criando plano: ${JSON.stringify(createPlanDto)}`);
        const plan = await this.planService.create(createPlanDto);
        this.logger.log(`Plano criado com sucesso: ${JSON.stringify(plan)}`)
        return plan;
    }

    @Get()
    @ApiOperation({ summary: 'Ver detalhe de todos os planos!', description: 'Recebe informações detalhadas sobre todos os planos, incluindo seu histórico e produtos.' })
    @ApiResponse({ status: 201, description: 'Sucesso. Detalhes de todos os planos sendo exibidos.' })
    @ApiResponse({ status: 404, description: 'Planos não encontrados.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    async getAllPlanDetails() {
        this.logger.log(`Exibindo todos os planos:`);
        const plan = await this.planService.getAllPlanDetails();
        this.logger.log(`Planos exibidos:`);
        return plan;
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ver detalhe de um plano especifico!', description: 'Recebe informações detalhadas sobre um plano especifico, incluindo seu histórico e produtos.' })
    @ApiResponse({ status: 201, description: 'Sucesso. Detalhes de plano especificado sendo exibido.' })
    @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do plano desejado.' })
    async getDetails(@Param('id') id: number) {
        this.logger.log(`Exibindo plano pelo ID: ${id}`);
        const plan = await this.planService.getPlanDetails(Number(id));
        this.logger.log(`Plano do ID ${id} exibido:`);
        return plan;
    }

    @Post(':planId/products/:productId')
    @ApiOperation({ summary: 'Adicione um produto a um plano especifico!', description: 'Associar um produto a um plano existente!' })
    @ApiResponse({ status: 201, description: 'Sucesso. O produto foi adicionado ao plano.' })
    @ApiResponse({ status: 404, description: 'Produto ou plano não encontrados.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    @ApiParam({ name: 'planId', type: Number, description: 'ID do plano para qual o produto será adicionado!' })
    @ApiParam({ name: 'productId', type: Number, description: 'ID do produto a ser adicionado.' })
    async addProduct(@Param('planId') planId: number, @Param('productId') productId: number) {
        this.logger.log(`Adicionando um produto a um plano especifico: produto ${planId} e plano ${productId}`);
        const plan = await this.planService.addProductToPlan(Number(planId), Number(productId));
        this.logger.log(`Foi adicionado um produto a um plano especifico: produto ${planId} e plano ${productId}`);
        return plan;
    }

    @Delete(':planId/products/:productId')
    @ApiOperation({ summary: 'Remova um produto de um plano.', description: 'Tirar um produto de um plano existente.' })
    @ApiResponse({ status: 201, description: 'Sucesso. O produto foi removido do plano.' })
    @ApiResponse({ status: 404, description: 'Produto ou plano não encontrados.' })
    @ApiResponse({ status: 401, description: 'Não autorizado!' })
    @ApiResponse({ status: 500, description: 'Conexão perdida!' })
    @ApiParam({ name: 'planId', type: Number, description: 'ID do plano para qual o produto será removido!' })
    @ApiParam({ name: 'productId', type: Number, description: 'ID do produto a ser removido.' })
    async removeProduct(@Param('planId') planId: number, @Param('productId') productId: number) {
        this.logger.log(`Removendo um produto a um plano especifico: produto ${planId} e plano ${productId}`);
        const plan = await this.planService.removeProductFromPlan(Number(planId), Number(productId));
        this.logger.log(`Foi removido um produto a um plano especifico: produto ${planId} e plano ${productId}`);
        return plan;
    }
}
