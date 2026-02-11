import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { productID } = useParams();
  const { currency, products, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productID) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID, products]);

  return productData ? (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ================= IMAGE SECTION ================= */}
          <div className="flex flex-col md:flex-row gap-4">

            {/* Thumbnails */}
            <div
              className="
                flex gap-3
                md:flex-col
                order-2 md:order-1
                justify-center
              "
            >
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setImage(img)}
                  loading="lazy"
                  className={`
                    w-20 aspect-6/7
                    object-cover
                    border cursor-pointer
                    ${image === img
                      ? "border-black"
                      : "border-gray-200"
                    }
                  `}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex flex-col justify-around flex-1 order-1 md:order-2">
              <div className="w-full aspect-3/4 bg-gray-100">
                <img
                  src={image}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>



          {/* ================= PRODUCT INFO ================= */}
          <div className="space-y-6">

            {/* Title */}
            <h1 className="text-2xl font-semibold">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-500">★★★★☆</span>
              <span className="text-gray-600">(122)</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold">{currency}{productData.price}</p>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {productData.description}
            </p>
            {/* Size Selection */}
            <div>
              <p className="text-sm font-medium mb-3">Select Size</p>

              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                      w-12 h-10
                      text-sm cursor-pointer
                      border
                      flex items-center justify-center
                      transition
                      ${item === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                      }
                      focus:outline-none
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>


            {/* Add to Cart */}
            <button onClick={() => addToCart(productData._id, size)} className="px-10 py-3 bg-black text-white text-sm active:bg-gray-600 transition">
              ADD TO CART
            </button>

            {/* Divider */}
            <div className="border-t pt-6 text-sm text-gray-600 space-y-1">
              <p>100% Original product.</p>
              <p>Cash on delivery available.</p>
              <p>Easy return & exchange within 7 days.</p>
            </div>

          </div>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </section>
  ) : <div className="opacity-0"></div>;
};

export default Product;
