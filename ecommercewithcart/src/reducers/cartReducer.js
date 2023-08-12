const cartReducer = (state, action) => {
    switch (action.type) {
        case "CARTDATA":
            return { ...state, cartData: action.payload };
        case "INCREMENT":
            return {
                ...state,
                cartData: state.cartData.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        case "DECREMENT":
            return {
                ...state,
                cartData: state.cartData.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };
        case "REMOVE":
            return {
                ...state,
                cartData: state.cartData.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
}

export default cartReducer;
