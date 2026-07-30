import { useState, useEffect } from "react";
import { getCartItem,
         deleteCartItem,
        updateCartQuantity,
        checkout,

     } from "../api/cartApi";

import CartItem from "./CartItem";
export default function CartPage(){
    const [ cartItem, setCartItem ] = useState([]);
    const [ loading, setLoading ] = useState(false);

   
    useEffect(() => {
        const fetchprev = (async()=> {
            const prev = await getCartItem();
            console.log("First item getcart", prev.data.items[0]);
         const updatedCart =   {
                ...prev.data,
                items: prev.data.items.map(item => ({
                    ...item,
                    selected:true
                }))
        }
        setCartItem(updatedCart);
        });
        fetchprev();
    },[]);
    

const  updateQuantity = async(id, qty)=> {
          
       const res = await updateCartQuantity(id, qty);
     
       console.log("First item", res.data.items[0]);

    setCartItem({
        ...res.data,
        items: res.data.items.map(item => ({
            ...item,
            selected: item.selected ?? true,
            })),
        });
        
    }
        

       
   const  removeItem = async(id) =>{
        
        console.log("id",id);
        const res =  await deleteCartItem(id);
            

        setCartItem(prev => ({
        ...prev,
        items: prev.items.filter(
            item => item.variant._id !== id
        )
        }));
    }
    function toggleSelect(clickedItem) {
    setCartItem(prev => ({
        ...prev,
        items: prev.items.map(item =>
            item.variant._id === clickedItem.variant._id
                ? {
                    ...item,
                    selected: !item.selected,
                }
                : item
        ),
    }));
    }
    const handleCheckout = async()=> {
        console.log(cartItem);
        const orderItems = cartItem.items
        .filter(
            item => item.selected=== true
        )
        .map(item=>({
            variantId: item.variant._id,
            cartQuantity: item.cartQuantity
        }));
       

        const res = await checkout(orderItems);
        console.log(res);
    }

   return ( 
    <>
        <h1> My Shopping Bag</h1>
                { <div className="p-4 space-y-4 pb-36">

          {cartItem.items?.map((item) => (

            <CartItem
              key={item.variant._id}
              item={item}
          onQuantityChange={updateQuantity}
              onRemove={removeItem}
             onSelect={toggleSelect}
            />
          ))}
        </div> }
        <button className = "w-full py-2 rounded  bg-black text-white text-lg font-semibold "
        onClick={handleCheckout}
        >
            CHECK OUT</button>
        </>
    )}
