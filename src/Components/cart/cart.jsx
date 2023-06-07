import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutButton from "./payButton";
import { Link, useNavigate } from "react-router-dom";



const Cart = () => {
    let navigate = useNavigate();
    let currUser = useSelector((store) => {
        // console.log(store);
        return store.currUserSection;
    });

    let cartItems = useSelector((store) => {
        return store.cartSection.addToCart;
    });
    console.log(cartItems);

    let dispatch = useDispatch();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].qty = newQuantity;
        dispatch({
            type: 'updateCart',
            payload: updatedCartItems
        });
    };

    const handleProductSelect = (product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter((item) => item !== product));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };





    useEffect(() => {
        let total = 0;
        selectedProducts.forEach((product) => {
            total += product.price * product.qty;
        });
        setSubtotal(total);
    }, [cartItems, selectedProducts]);


    return <>
        <div class="bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mb-0"><Link to="/">Home</Link> <span class="mx-2 mb-0">/</span> <strong class="text-black">Cart</strong></div>
                </div>
            </div>
        </div>


        <div className="site-section">
            <div className="container">
                <div className="row mb-5">
                    <form className="col-md-12" method="post">
                        <div className="site-blocks-table">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail">Select</th>
                                        <th className="product-thumbnail">Image</th>
                                        <th className="product-name">Product</th>
                                        <th className="product-name">Size</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Quantity</th>
                                        <th className="product-total">Total</th>
                                        <th className="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? cartItems.map((item, index) => {

                                        let quantityId = `Qty_${index}`;
                                        let totalId = `Total_${index}`;
                                        let total = item.price * item.qty;

                                        let newQtyDec = () => {
                                            let newQuantity = item.qty - 1;
                                            if (newQuantity >= 1) {
                                                handleQuantityChange(index, newQuantity);
                                            }
                                        }

                                        return (currUser._id == item.UserID && <tr>
                                            <td>
                                                <input type="checkbox"
                                                    checked={selectedProducts.includes(item)}
                                                    onChange={() => handleProductSelect(item)} />
                                            </td>
                                            <td className="product-thumbnail">
                                                <img
                                                    src={item.imagePath}
                                                    alt="Image"
                                                    className="img-fluid"
                                                />
                                            </td>
                                            <td className="product-name">
                                                <h2 className="h5 text-black">{item.title}</h2>
                                            </td>
                                            <td className="product-name">
                                                <h2 className="h5 text-black">{item.size}</h2>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                                                    <div className="input-group-prepend">
                                                        <button
                                                            className="btn btn-outline-primary js-btn-minus qtyBtn"
                                                            type="button"
                                                            onClick={() => {
                                                                let newQuantity = item.qty - 1;
                                                                if (newQuantity >= 1) {
                                                                    handleQuantityChange(index, newQuantity);
                                                                }
                                                            }}


                                                        >
                                                            −
                                                        </button>
                                                    </div>
                                                    <div className="qtyNum" id={quantityId}>
                                                        {item.qty}
                                                    </div>
                                                    {/* <input
                                                        id={quantityId}
                                                        type="text"
                                                        className="form-control text-center"
                                                        defaultValue={1}
                                                        value={Qty}
                                                        placeholder=""
                                                        aria-label="Example text with button addon"
                                                        aria-describedby="button-addon1"
                                                        onChange={(evt) => console.log(evt.target.value)}
                                                    /> */}
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-primary js-btn-plus qtyBtn"
                                                            type="button"
                                                            onClick={() => {
                                                                let newQuantity = item.qty + 1;
                                                                handleQuantityChange(index, newQuantity);
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td id={totalId}>{total}</td>
                                            <td>
                                                <a className="btn btn-primary btn-sm" onClick={() => {
                                                    dispatch({
                                                        type: 'removeItem',
                                                        index
                                                    })

                                                }}>
                                                    X
                                                </a>
                                            </td>
                                        </tr>)
                                    }) : <h3>Cart is Empty</h3>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <button className="btn btn-outline-primary btn-sm btn-block">
                                    <Link to="/shop">
                                        Continue Shopping
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    {cartItems.length > 0 ?
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-12 text-right border-bottom mb-5">
                                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <span className="text-black">Subtotal</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black" >${subtotal}</strong>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <span className="text-black" >Total</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">${subtotal}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {selectedProducts.length > 0 ?
                                                <CheckoutButton cartItems={selectedProducts} /> : "Select A Product"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                </div>
            </div >
        </div >

    </>
};


export default Cart;