


import axios from "axios";
import { useSelector } from "react-redux";


const CheckoutButton = ({ cartItems }) => {


    let user = useSelector((store) => {
        return store.currUserSection
    });

    let data = {
        cartItems,
        userID: user._id
    }


    const handleCheckout = () => {
        // console.log(cartItems);

        axios.post('http://localhost:6789/create-checkout-session', data).then((resp) => {

            if (resp.data.url) {
                window.location.href = resp.data.url
            }
        }).catch(err => console.log(err.message))
    }


    return <>
        <button className="btn btn-primary btn-lg py-3 btn-block" onClick={() => handleCheckout()}>CheckOut</button></>
};



export default CheckoutButton;