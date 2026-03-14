import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../models/Product";

const Playstations = () => {
  const [listOfplaystations, setPlaystations] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPlaystations = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/get-products-by-category?productType=PlayStation",
        );
        const playstations = response.data.map(
          (item) =>
            new Product(
              item.title,
              item.imageUrl,
              item.basePrice,
              item.taxRate,
              item.discountRate,
              item.productType,
            ),
        );
        setPlaystations(playstations);
      } catch (error) {
        console.error("Error fetching PlayStations:", error);
        setPlaystations([]);
      }
    };

    fetchPlaystations();
  }, []);

  return (
    <div className="content-container">
      <h2>Playstations</h2>
      <div className="product-item-container">
        {listOfplaystations.map((playstation, index) => (
          <div className="product-item" key={index}>
            <img
              src={playstation.imageUrl}
              alt={playstation.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{playstation.title}</h3>
            <p>Price: ${playstation.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playstations;
