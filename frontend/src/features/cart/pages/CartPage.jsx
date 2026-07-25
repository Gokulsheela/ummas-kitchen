import { useState, useEffect } from "react";
import { getCartItem,
     deleteCartItem,
      updateCartQuantity,
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
        console.log(cartItem);
    }
        

       
   const  removeItem = async(id) =>{
        
        console.log("id",id);
        const res =  await deleteCartItem(id);
            

        setCartItem(res => ({
        ...res,
        items: res.items.filter(
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
        </>
    )}
