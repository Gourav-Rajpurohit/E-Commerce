import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {

    const currency = "$";
    const delivery_fee = 10.00;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Please select a size before adding to cart.");
            return;
        }

        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] ? cartData[itemId][size] += 1 : cartData[itemId][size] = 1;
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    };

    const getCartCount = () => {
        let count = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        count += cartItems[itemId][size];
                    }
                } catch (error) {
                    console.error("Error calculating cart count:", error);
                }
            }
        }
        return count;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
            if (cartData[itemId][size] <= 0) {
                delete cartData[itemId][size];
                if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
            await setCartItems(cartData);
            if (token) {
                try {
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }

    };

    const getCartTotal = () => {
        let total = 0;

        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);

            if (!product) continue;

            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];

                if (quantity > 0) {
                    total += product.price * quantity;
                }
            }
        }

        return total;
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Fetch user profile data
    const getUserData = async (token) => {
        try {
            if (!token) return;
            const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (response.data.success) {
                setUserData(response.data.userData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (token) {
            getUserData(token);
            getUserCart(token);
        }
    }, [token])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartTotal,
        navigate,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        getUserData
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;
