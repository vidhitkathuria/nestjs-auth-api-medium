import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../user/auth/auth.guard';
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() request: any): Promise<Product> {
    const user: User = request.user;
    if (!user.isAdmin) {
      throw new ForbiddenException('Only Admin User can retrieve a product');
    }

    return this.productService.createProduct(createProductDto, user);
  }

  @Get()
  async findAll(@Req() request: any) {
    const user: User = request.user;

    if (!user.isAdmin) {
      throw new ForbiddenException('Only Admin User can retrieve products');
    }

    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') product_id: number, @Req() request: any) {
    const user: User = request.user;

    if (!user.isAdmin) {
      throw new ForbiddenException('Only Admin User can retrieve a product');
    }

    return this.productService.findSingleProduct(+product_id, user);
  }
}
