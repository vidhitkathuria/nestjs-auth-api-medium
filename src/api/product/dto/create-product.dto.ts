import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Min,
  Max,
  IsUrl,
} from 'class-validator';

enum ProductCategory {
  HomeDecor = 'home_decor',
  Electronics = 'electronics',
  Fashion = 'fashion',
}

export class CreateProductDto {
  @IsString()
  @MinLength(2, { message: 'Product name must have at least 2 characters.' })
  @IsNotEmpty()
  product_name: string;

  @IsInt()
  price: number;

  @IsString()
  @MinLength(2, { message: 'Product description must have at least 2 characters.' })
  @IsNotEmpty()
  description: string;

  @IsEnum(ProductCategory, { message: 'Invalid product category.' })
  category: ProductCategory;

  @IsInt({ message: 'Rating must be an integer.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating cannot be more than 5.' })
  rating: number;

  @IsUrl({}, { message: 'Invalid URL format for imgUrl.' })
  imgUrl: string;
}
