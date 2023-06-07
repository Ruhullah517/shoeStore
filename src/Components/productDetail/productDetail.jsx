import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const ProductDetail = () => {

    let navigate = useNavigate();
    let { adID } = useParams();

    let [products, setProducts] = useState({});
    let productMila = async () => {

        await axios.get('/showAds').then((resp) => {
            // console.log(resp.data);
            try {
                let AdMila = resp.data.find(product => product._id === adID)
                setProducts(AdMila);
                console.log(AdMila);
            } catch (error) {
                console.log(error);
            }
        })
    };

    useEffect(() => {
        productMila()
    }, [])

    let currUser = useSelector((store) => {
        return store.currUserSection;
    });
    console.log(currUser);
    let dispatch = useDispatch();



    let [size, setSize] = useState("");
    let [Qty, setQty] = useState(1);
    let incQty = () => {
        Qty++;
        setQty(Qty);
    };
    let decQty = () => {
        if (Qty != 1) {
            Qty--;
            setQty(Qty);
        };
    };
    console.log(Qty);

    let addToCart = () => {
        // if (Object.keys(currUser).length === 0) {
        //     navigate('/login');
        // } else {
        products.qty = Qty;
        products.size = size;
        products.UserID = currUser._id;
        
        dispatch({
            type: 'addToCart',
            payload: products,

        })

        // }

    }



    return <>
        <div class="bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mb-0"><Link to="/shop">Shop</Link> <span class="mx-2 mb-0">/</span> <strong class="text-black">{products.title}</strong></div>
                </div>
            </div>
        </div>


        <>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={products.imagePath} alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-black"><i>{products.brand}</i>{" "}{products.title}</h2>
                            <p>
                                {products.description}
                            </p>
                            <p>
                                <strong className="text-primary h4">${products.price}</strong>
                            </p>
                            <div className="mb-1 d-flex">
                                <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                                    <span
                                        className="d-inline-block mr-2"
                                        style={{ top: "-2px", position: "relative" }}
                                    >
                                        <input type="radio" id="option-sm" name="shop-sizes" onChange={(evt) => {
                                            if (evt.target.checked == true) {
                                                setSize("Small")
                                            }
                                        }} />
                                    </span>{" "}
                                    <span className="d-inline-block text-black">Small</span>
                                </label>
                                <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                                    <span
                                        className="d-inline-block mr-2"
                                        style={{ top: "-2px", position: "relative" }}
                                    >
                                        <input type="radio" id="option-md" name="shop-sizes" onChange={(evt) => {
                                            if (evt.target.checked == true) {
                                                setSize("Medium")
                                            }
                                        }} />
                                    </span>{" "}
                                    <span className="d-inline-block text-black">Medium</span>
                                </label>
                                <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                                    <span
                                        className="d-inline-block mr-2"
                                        style={{ top: "-2px", position: "relative" }}
                                    >
                                        <input type="radio" id="option-lg" name="shop-sizes" onChange={(evt) => {
                                            if (evt.target.checked == true) {
                                                setSize("Large")
                                            }
                                        }} />
                                    </span>{" "}
                                    <span className="d-inline-block text-black">Large</span>
                                </label>
                                <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                                    <span
                                        className="d-inline-block mr-2"
                                        style={{ top: "-2px", position: "relative" }}
                                    >
                                        <input type="radio" id="option-xl" name="shop-sizes" onChange={(evt) => {
                                            if (evt.target.checked == true) {
                                                setSize("Extra-Large")
                                            }
                                        }} />
                                    </span>{" "}
                                    <span className="d-inline-block text-black"> Extra Large</span>
                                </label>
                            </div>
                            <div className="mb-5">
                                <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                                    <div className="input-group-prepend">
                                        <button
                                            className="btn btn-outline-primary js-btn-minus"
                                            type="button"
                                            onClick={decQty}
                                        >
                                            −
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        defaultValue={1}
                                        value={Qty}
                                        placeholder=""
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                    // onChange={(evt) => setQty(evt.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-primary js-btn-plus"
                                            type="button"
                                            onClick={incQty}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p>
                                <Link to={(Object.keys(currUser).length === 0) ? "/login" : "/cart"} className="buy-now btn btn-sm btn-primary" onClick={addToCart}>
                                    Add To Cart
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    </>
};

export default ProductDetail;