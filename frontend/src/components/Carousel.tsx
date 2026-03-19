import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // navigation module



const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);

  axiosRetry(axios,
    {
      retries : 5,
      retryCondition: (error) => {
            console.log('Error fetching products:', error);
            return error.response?.status === 500;
        },
    }
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-product-recommendations');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([{"title":"Smartphone Galaxy G20","imageUrl":"https://cdn.lomax.dk/images/t_item_max/f_auto/v1630998173/produkter/70122740_1/samsung-galaxy-z-fold3-5g-256gb-smartphone-sort-1.jpg","basePrice":1099,"taxRate":1.25,"discountRate":0.25,"productType":"Phone"}]);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
        <div></div>
    )
  }

  return (
    <div className="content-container">
      <h2>Recommended Products!</h2>(
        <Swiper modules={[Navigation]}
          navigation spaceBetween={50} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <p>Price: ${Math.round(product.basePrice * (1 - product.discountRate) * product.taxRate)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )

    </div>
  );
};

export default Carousel;
