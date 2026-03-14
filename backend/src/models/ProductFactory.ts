import { Product } from "./Product";
import { ProductType } from "./ProductType";
import fs from "node:fs";

export class ProductFactory {
  private taxRate: number;
  private discountRates: Record<ProductType, number>;

  constructor() {
    var data = JSON.parse(fs.readFileSync("src/config.json", "utf8"));
    this.discountRates = data.discountRates;
    this.taxRate = data.taxRate;
  }

  public createProduct(
    title: string,
    imageUrl: string,
    basePrice: number,
    productType: ProductType,
  ): Product {
    return new Product(
      title,
      imageUrl,
      basePrice,
      this.taxRate,
      this.discountRates[productType],
      productType,
    );
  }
}
