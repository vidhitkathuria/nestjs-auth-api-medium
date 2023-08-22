import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
import { User } from '../user/user.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
    if (!user.isAdmin) {
      throw new ForbiddenException('Only Admin User can create products');
    }
    const product: Product = new Product();
    product.product_name = createProductDto.product_name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    return this.productRepository.save(product);
  }

  findSingleProduct(product_id: number, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException('Only Admin User can retrieve a product');
    }
    return this.productRepository.findOne({ product_id });
  }

  findAllProducts() {
    return this.productRepository.find();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async findByIds(productIds: number[]): Promise<Product[]> {
    return this.productRepository.findByIds(productIds);
  }
}
