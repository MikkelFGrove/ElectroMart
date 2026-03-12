import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../models/Product";
import { ProductType } from "../models/ProductType";

const SSDs = () => {
  const [listOfssds, setSSDs] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSSDs = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/get-products-by-category?productType=SSD",
        );
        const ssds = response.data.map(
          (item) =>
            new Product(
              item.title,
              item.imageUrl,
              item.basePrice,
              ProductType.SSD,
            ),
        );
        setSSDs(ssds);
      } catch (error) {
        console.error("Error fetching SSDs:", error);
        setSSDs([]);
      }
    };

    fetchSSDs();
  }, []);

  return (
    <div className="content-container">
      <h2>SSDs</h2>
      <div className="product-item-container">
        {listOfssds.map((ssd, index) => (
          <div className="product-item" key={index}>
            <img
              src={ssd.imageUrl}
              alt={ssd.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{ssd.title}</h3>
            <p>Price: ${ssd.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SSDs;
