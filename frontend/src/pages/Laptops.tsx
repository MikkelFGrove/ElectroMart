import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../models/Product";
import { ProductType } from "../models/ProductType";

const Laptops = () => {
  const [listOflaptops, setLaptops] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/get-products-by-category?productType=Laptop",
        );
        const laptops = response.data.map(
          (item) =>
            new Product(
              item.title,
              item.imageUrl,
              item.basePrice,
              ProductType.Laptop,
            ),
        );
        setLaptops(laptops);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="content-container">
      <h2>Laptops</h2>
      <div className="product-item-container">
        {listOflaptops.map((laptop, index) => (
          <div className="product-item" key={index}>
            <img
              src={laptop.imageUrl}
              alt={laptop.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{laptop.title}</h3>
            <p>Price: ${laptop.getPrice()}</p>
            <p>Price No Tax: ${laptop.getPriceWithoutTaxes()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptops;
