import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { OrderResponseDto } from './dto/order-response.dto';
import { AuthService } from '../user/auth/auth.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { user_id, products } = createOrderDto;
  
    const fetchedProducts = await this.productService.findByIds(products.map((p) => p.product_id));
    const totalAmount = fetchedProducts.reduce((sum, product) => {
      const matchingProduct = products.find(p => p.product_id === product.product_id);
      return sum + product.price * matchingProduct.quantity;
    }, 0);
  
    const order = this.orderRepository.create({
      user: { id: user_id },
      products: fetchedProducts, // Assign fetchedProducts instead of the original products array
      totalAmount,
    });
  
    const savedOrder = await this.orderRepository.save(order);
  
    return {
      user_id: savedOrder.user.id,
      order_id: savedOrder.order_id,
      products: savedOrder.products.map(product => ({
        product_name: product.product_name,
        price: product.price,
      })),
      totalAmount: savedOrder.totalAmount,
    };
  }
  async findAllOrders(user_id: number) {
    const orders = await this.orderRepository.find({
      where: { user: user_id },
      relations: ['user', 'products'], // Include user and products in the result
    });

    if (orders.length === 0) {
      return 'No orders placed yet.';
    }

    return orders;
  }

  async findSingleOrder(user_id: number, order_id: number) {
    const order = await this.orderRepository.findOne({
      where: { user: user_id, order_id },
      relations: ['user', 'products'], // Include user and products in the result
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
