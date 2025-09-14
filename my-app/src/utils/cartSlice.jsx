import {createSlice}  from "@reduxjs/toolkit"


const cartSlice= createSlice({


  name:'cart',
  initialState:{
    items:[],
  },
  // reducer function basically modify the cart
  //it take state based on state it take action modify.

  reducers:{
    //first reducer// mutating the state , directly updatingthe state
    addItem:(state,action)=>{

     state.items.push(action.payload);

    },
    //2 nd reduer
    removeItem:(state,action)=>{
        const index = action.payload;
        if (index !== undefined && index >= 0 && index < state.items.length) {
          state.items.splice(index, 1);
        }
    },
    cleartCart :(state)=>{
        state.items.length=0;
    },


  },


});



export const {addItem, removeItem, cleartCart}=cartSlice.actions;
export default  cartSlice.reducer;