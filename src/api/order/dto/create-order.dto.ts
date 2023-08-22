import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// export class CreateOrderDto {
//   @IsInt()
//   user_id: number;
//   @IsInt()
//   order_id: number;
//   @IsArray()
//   products: ProductResponseDto[];
//   @IsNumber()
//   totalAmount: number;
// }

// export class ProductResponseDto {
//   @IsString()
//   product_name: string;
//   @IsNumber()
//   price: number;
// }

export class CreateOrderDto {
  @IsInt()
  user_id: number;

  @IsArray()
  products: ProductDto[];
}

export class ProductDto {

  @IsInt()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
