import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: null,
    },
    reducers: {
        setProducts: (state, action) => {
            console.log("<<<Redux all products>>>", action.payload)
            state.items = action.payload;
        },
        addProduct: (state, action) => {
            if (state.items) {
                state.items.push(action.payload);
            } else {
                state.items = [action.payload];
            }
        },
        updateProduct: (state, action) => {
            if (!state.items) return;
            const updated = action.payload;
            const index = state.items.findIndex((p) => p._id === updated._id);
            if (index !== -1) {
                state.items[index] = updated;
            }
        },
        deleteProduct: (state, action) => {
            if (!state.items) return;
            const id = action.payload;
            state.items = state.items.filter((p) => p._id !== id);
        },
    },
});

// Products exports
export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.products.items;


/* ------------------ Pending Orders Slice ------------------ */
const pendingOrdersSlice = createSlice({
    name: "pendingOrders",
    initialState: {
        items: null,
    },
    reducers: {
        setPendingOrders: (state, action) => {
            console.log("<<<Redux pending orders>>>", action.payload)
            state.items = action.payload;
        },
        addPendingOrder: (state, action) => {
            if (state.items) {
                state.items.push(action.payload);
            } else {
                state.items = [action.payload];
            }
        },
        updatePendingOrder: (state, action) => {
            if (!state.items) return;
            const updated = action.payload;
            const index = state.items.findIndex((o) => o._id === updated._id);
            if (index !== -1) {
                state.items[index] = updated;
            }
        },
        deletePendingOrder: (state, action) => {
            if (!state.items) return;
            const id = action.payload;
            state.items = state.items.filter((o) => o._id !== id);
        },
    },
});

// Pending orders exports
export const {
    setPendingOrders,
    addPendingOrder,
    updatePendingOrder,
    deletePendingOrder,
} = pendingOrdersSlice.actions;
export const selectAllPendingOrders = (state) => state.pendingOrders.items;


/* ------------------ Export Reducers ------------------ */
export default {
    products: productSlice.reducer,
    pendingOrders: pendingOrdersSlice.reducer,
};