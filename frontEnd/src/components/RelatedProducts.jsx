import React from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProducts = ({ category, subCategory }) => {
    const [related, setRelated] = React.useState([]);
    const { products } = React.useContext(ShopContext);
    React.useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((product) =>
                product.category === category && product.subCategory === subCategory
            );
            setRelated(productsCopy.slice(0, 5)); // Limit to 5 related products
        }

    }, [category, subCategory, products]);

    return (
        <div>
            <section className="w-full py-20">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Section Title */}
                    <div className="flex items-center gap-4 mb-12 justify-center text-xl font-medium tracking-wide">
                        <Title text1="RELATED " text2="PRODUCTS" />
                    </div>

                    {/* Products Grid */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mt-10 px-4 max-w-7xl w-full'>
                        {related.map((product, index) => (
                            <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} date={product.date} />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default RelatedProducts