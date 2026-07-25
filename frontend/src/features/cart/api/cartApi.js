import axiosClient from "../../../api/axiosClient";

export const getCartItem = async (id)=> {
    console.log("inside the cartApi.js");
    const res = await axiosClient.get(`/cart`);
    return res.data;

}

export const deleteCartItem = async (id) => {
    console.log("iside the car api");
    const res = await axiosClient.delete(`/cart/${id}`);
    return res.data;
}

   export const updateCartQuantity = async (item,quantity) => {
    const variantId = item.variant._id;
    const res = await axiosClient.put(`/cart/${variantId}`, {
        qty: quantity,
    });
    
    return res.data;
};
