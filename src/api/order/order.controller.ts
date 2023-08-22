// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

// @Controller('order')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   create(@Body() createOrderDto: CreateOrderDto) {
//     return this.orderService.createOrder(createOrderDto);
//   }

// }

// order.controller.ts

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Post,
  Get,
  Param,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllOrders(@Request() request: any): Promise<any> {
    const user_id: number = request.user.id; // Accessing user ID from the request
    if (user_id) {
      const orders = await this.orderService.findAllOrders(user_id);

      if (typeof orders === 'string') {
        return { message: orders }; // Return the custom message
      }
      return orders;
    } else {
      throw new NotFoundException('user not found');
    }
  }

  @Get(':order_id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect the route
  @UseInterceptors(ClassSerializerInterceptor)
  async findSingleOrder(@Param('order_id') order_id: number, @Request() request: any): Promise<any> {
    const user_id: number = request.user.id; // Get user_id from the authenticated user

    const order = await this.orderService.findSingleOrder(user_id, order_id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
