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

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { user_id, products } = createOrderDto;
    const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

    const order = this.orderRepository.create({
      user: { id: user_id },
      products,
      totalAmount,
    });

    return this.orderRepository.save(order);
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
