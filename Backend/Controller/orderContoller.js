import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

// placing order using COD(Cash on delivery)
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();


        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order placed successfully" })
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}
//all order data for admin pannel

export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        return res.json({ success: "true", orders })
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

//order for a particular user

export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        return res.json({ success: "true", orders })
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

// change the order status

export const changeOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        return res.json({ success: "true", message: "Order status changed successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}




