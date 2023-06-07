import { createStore, combineReducers } from 'redux';




let cart = {
    addToCart: []
};

function cartSection(oldCart = cart, newData) {
    if (!oldCart.addToCart) {
        oldCart.addToCart = [];
    }
    if (newData.type == 'addToCart') {
        let index = oldCart.addToCart.findIndex((item) => item._id == newData.payload._id && item.UserID == newData.payload.UserID);
        // console.log("index" + index);
        if (index >= 0) {
            oldCart.addToCart[index].qty += 1
        } else {
            oldCart.addToCart.push(newData.payload);
        }

    }
    else if (newData.type == 'removeItem') {
        oldCart.addToCart.splice(newData.index, 1)
    }
    else if (newData.type == 'updateCart') {
        oldCart.addToCart = newData.payload
    }


    return { ...oldCart, addToCart: [...oldCart.addToCart] }
};


let currUser = {};
function currUserSection(oldUser = currUser, newUser) {
    if (newUser.type == 'userLogin') {
        console.log(newUser.payload);
        oldUser = newUser.payload;
    }
    else if (newUser.type == 'logout') {
        localStorage.removeItem('myToken');
        oldUser = {};
    }
    return { ...oldUser }
}





let bigStore = combineReducers({ cartSection, currUserSection });


let store = createStore(bigStore);


export { store };
