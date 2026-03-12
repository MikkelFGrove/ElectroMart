import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../models/Product";
import { ProductType } from "../models/ProductType";

const Phones = () => {
  const [listOfphones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/get-products-by-category?productType=Phone",
        );
        const phones = response.data.map(
          (item) =>
            new Product(
              item.title,
              item.imageUrl,
              item.basePrice,
              ProductType.Phone,
            ),
        );
        setPhones(phones);
      } catch (error) {
        console.error("Error fetching phones:", error);
        setPhones([]);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div className="content-container">
      <h2>Phones</h2>
      <div className="product-item-container">
        {listOfphones.map((phone, index) => (
          <div className="product-item" key={index}>
            <img
              src={phone.imageUrl}
              alt={phone.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{phone.title}</h3>
            <p>Price: ${phone.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phones;
