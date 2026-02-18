import userModel from "../models/userModel.js"

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId
        const { itemId, size } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Added to Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // If item exists in cart
        if (cartData[itemId]) {

            if (quantity > 0) {
                // Normal update
                cartData[itemId][size] = quantity;
            } 
            else {
                // 🔥 Remove that size when quantity is 0
                delete cartData[itemId][size];

                // 🔥 If no sizes left, remove the whole product
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }