export class OrderResponseDto {
    user_id: number;
    order_id: number;
    products: ProductResponseDto[];
    totalAmount: number;
  }
  
  export class ProductResponseDto {
    product_id: number;
    product_name: string;
    description: string;
    price: number;
    imgUrl: string;
    category: string;
    rating: number;
  }