import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [UserModule, ProductModule, OrderModule],
  //providers: [UserService, OrderService, ProductService, UsersRepository, OrderRepository, ProductRepository],
})
export class ApiModule {}
