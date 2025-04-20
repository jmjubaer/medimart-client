// import { IProduct } from "@/types/Product.types";
// import { RootState } from "@/redux/store";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface ICartItem extends IProduct{
//   quantity:number;
// }

// interface CartState{
//   cartItems:ICartItem[];
//   totalQuantity:number;
//   totalPrice:number;
// }

// const loadCartFromLocalStorage=():CartState=>{
//   const storedCart=localStorage.getItem("cart");
//   return storedCart?JSON.parse(storedCart):
//   {cartItems:[],totalQuantity:0,totalPrice:0}
// };

// const initialState:CartState=loadCartFromLocalStorage();

// export const cartSlice=createSlice({
//   name:"cart",
//   initialState,
//   reducers:{
//     addToCart:(state,action:PayloadAction<{product:IProduct,quantity?:number}>)=>{
// const {product:product,quantity=1} = action.payload;
// const existingItem=state.cartItems.find(item=>item._id===product._id);
// if(existingItem){
//   existingItem.quantity += quantity;
// }else{
//   state.cartItems.push({...product,quantity})
// }
// state.totalQuantity += quantity;
// state.totalPrice += product.price*quantity;
// localStorage.setItem("cart",JSON.stringify(state))
//     },

//     removeFromCart:(state,action:PayloadAction<string>)=>{
//      const productId = action.payload;
//      const itemIndex=state.cartItems.findIndex(item=>item._id===productId);
//      if(itemIndex!==-1){
//       state.totalQuantity -= state.cartItems[itemIndex].quantity;
//       state.totalPrice-=state.cartItems[itemIndex].price*state.cartItems[itemIndex].quantity;
//       state.cartItems.splice(itemIndex,1);
//      } 
//      localStorage.setItem('cart',JSON.stringify(state));
//     },

// decreaseQuantity:(state,action:PayloadAction<string>)=>{
//   const itemIndex=state.cartItems.findIndex(item=>item._id===action.payload);
//   if(itemIndex!==-1){
//     const item=state.cartItems[itemIndex];
//     if(item&&item.quantity>1){
//       item.quantity -= 1;
//       state.totalQuantity -= 1;
//       state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));
     
//     }
//     else{
//       state.totalQuantity -= 1
//       state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));
//       state.cartItems.splice(itemIndex,1);
//     }
//     localStorage.setItem("cart",JSON.stringify(state));
//    } 


// },

// clearCart:(state)=>{
//   state.cartItems=[];
//   state.totalQuantity=0;
//   state.totalPrice=0;
//   localStorage.removeItem("cart");
// }



//   }
// })


// export const useTotalPrice =(state:RootState)=>state.cart.totalPrice;
// export const useTotalQuantity =(state:RootState)=>state.cart.totalQuantity;
// export const useCartItems =(state:RootState)=>state.cart.cartItems

// export const {addToCart,removeFromCart,decreaseQuantity,clearCart}=cartSlice.actions;

// export default cartSlice.reducer;