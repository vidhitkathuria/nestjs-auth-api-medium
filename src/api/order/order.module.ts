import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { AuthModule } from '@/api/user/auth/auth.module';
import { AuthService } from '../user/auth/auth.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
