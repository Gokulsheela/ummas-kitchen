const Cart = require("../models/cart/cart.model.js");
const Variant = require("../models/product/productVariant.model.js");
const Order = require("../models/order/order.model.js");

module.exports.addToCart =async (req,res) => {
    console.log(req.body);
    const { variantId, quantity } = req.body;
    const userId = req.user.id;

    let cartData = await Cart.findOne({ user: userId });

    if (!cartData) {

        cartData = new Cart({
            user: userId,
            items: [
                {
                    variant: variantId,
                   cartQuantity: quantity
                }
            ]
        });

    } 
    
    else {

        let item = cartData.items.find(
            item => item.variant.toString() === variantId
        );

        if (item) {
            item.cartQuantity += quantity;
        } else {
            cartData.items.push({
                variant: variantId,
                cartQuantity:quantity
            });
        }
    }

    await cartData.save();

    res.json(cartData);
};

module.exports.showCartItem = async(req,res)=> {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId })
            .populate({
            path: "items.variant",
            populate: {
            path: "productId",
            },
  });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
          }
        res.status(200).json({
        sucess : true,
        data : cart
               
    });
        // console.log(cart);
}
module.exports.deleteCartItem = async(req,res) => {
    const userId = req.user.id;
    const {id} =req.params;
    await Cart.findOneAndUpdate(
        { user: userId },
          { 
            $pull: {
              items: {
               variant: id
             }
        }
     },
     { new: true }
   );
   res.status(200).json({ 
        sucess : true,
        message: "item removed" });

}

module.exports.updateCartQuantity= async (req,res) => {
    const userId= req.user.id;
    const variantId = req.params;
    const id = variantId.id;
    const {qty} = req.body;
    
    


    const variant = await Variant.findOne({ _id: id })
            
    if (qty > variant.stockQuantity || qty <=0) {
    return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock."
    });
}
  console.log();

   const updateCartQuantity = await Cart.findOneAndUpdate(
        {
            user: userId,
            "items.variant": id
        },
        {
            $set: {
                "items.$.cartQuantity": qty
            }
        },
        { new: true }
    );

     const cart = await Cart.findOne({ user: userId })
            .populate({
            path: "items.variant",
            populate: {
            path: "productId",
            },
  });
        console.log("new cart is ",cart)

        res.json({
            success: true,
            data: cart
        });

    }
module.exports.checkout = async(req,res) =>{
    const { items} = req.body;

    if (!items || items.length === 0) {
        throw new ExpressError("No items selected for checkout.", 400);
    }

    const cartData = await Promise.all(
    items.map(async (item) => {
        return await Variant.findById(item.variantId)
            .populate("productId");
    })
);
    
        const orderItems = cartData.map((item) => ({
            productId: item.productId._id,
            // variantId: item.variant._id,

            title: item.variant.productId.title,
            thumbnail: item.variant.productId.thumbnail,

            sku: item.variant.sku,
            color: item.variant.color,
            size: item.variant.size,

            cartQuantity: item.cartQuantity,

            price: {
                original: item.variant.price.original,
                sale: item.variant.price.sale,
                currency: item.variant.price.currency
            },

            subtotal:
                item.variant.price.sale * item.cartQuantity
        }));

         const totalAmount = orderItems.reduce(
            (total, item) => total + item.subtotal,
            0
        );

        const order = await Order.create({
            user: req.user.id,
            orderItem: orderItems,
            totalAmount
        });
        
    res.status(201).json({
        success: true,
        data: order
    });
}
