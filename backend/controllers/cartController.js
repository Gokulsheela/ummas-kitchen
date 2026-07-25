const Cart = require("../models/cart/cart.model.js");
const Variant = require("../models/product/productVariant.model.js");

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

