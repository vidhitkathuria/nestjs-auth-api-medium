import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  UseGuards,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { Cache } from 'cache-manager';
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly productService: ProductService) {}

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

    // if (!user.isAdmin) {
    //   throw new ForbiddenException('Only Admin User can retrieve products');
    // }

    const productsResponse = await this.productService.findAllProducts();
    // console.log(productsResponse);
    const productString = JSON.stringify(productsResponse);
    // console.log(productString);
    const val = await this.cacheManager.get(productString);
    console.log(val);
    if (val) {
      return {
        data: val,
        FromRedis: 'this product list is loaded from redis cache',
      };
    }
    if (!val) {
      await this.cacheManager.set(productString, productsResponse, { ttl: 1000 });
      return {
        data: productsResponse,
        FromProduct: 'This product list is loaded from product table',
      };
    }
    // return this.productService.findAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') product_id: number, @Req() request: any) {
    const user: User = request.user;

    // if (!user.isAdmin) {
    //   throw new ForbiddenException('Only Admin User can retrieve a product');
    // }

    return this.productService.findSingleProduct(+product_id, user);
  }
}
