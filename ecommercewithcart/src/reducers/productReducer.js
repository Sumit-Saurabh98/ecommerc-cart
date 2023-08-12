export const productReducer = (state, action) =>{

    switch(action.type){
        case "PRODUCT ADDED":
            return {...state, products: action.payload}

            case "ADD_TO_CART":
            return {...state, cart: [{...action.payload, quantity: 1}, ...state.cart]}

            case "REMOVE FROM CART":
            return {...state, 
                cart: state.cart.filter((p)=>p.id !==action.payload.id)
            }

            default:
                return state
    }  
}