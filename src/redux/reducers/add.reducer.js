import store from "../store";

const initialState = {

    price:[],
    number:0

};


const AddReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COMMODITIS':
            return {...state, Commoditis: action.payload};
        case 'ADD_COST':

           let New = (+state.price) + action.payload;
            return {...state, price: New};
        case 'ADD_NUMBER':

            let Num = (+state.number) + action.payload;
            return {...state, number: Num};

        default:
            return state;
    }

};

export {AddReducer};