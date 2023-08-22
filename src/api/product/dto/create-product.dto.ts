import { IsAlphanumeric, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, { message: 'Product name must have atleast 2 characters.' })
  @IsNotEmpty()
  product_name: string;

  @IsInt()
  product_id: number;

  @IsInt()
  price: number;

  @IsString()
  @MinLength(2, { message: 'Product name must have atleast 2 characters.' })
  @IsNotEmpty()
  description: string;
}
