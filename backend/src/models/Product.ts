import { ProductType } from "./ProductType";

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number;
  public discountRate: number;
  public productType: ProductType;

  constructor(
    title: string,
    imageUrl: string,
    basePrice: number,
    taxRate: number,
    discountRate: number,
    productType: ProductType,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.taxRate = taxRate;
    this.discountRate = discountRate;
    this.productType = productType;
  }

  public getPrice(): number {
    return this.basePrice * (1 - this.discountRate) * this.taxRate;
  }
}
