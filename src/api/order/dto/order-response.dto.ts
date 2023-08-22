export class OrderResponseDto {
    user_id: number;
    order_id: number;
    products: ProductResponseDto[];
    totalAmount: number;
  }
  
  export class ProductResponseDto {
    product_name: string;
    price: number;
  }