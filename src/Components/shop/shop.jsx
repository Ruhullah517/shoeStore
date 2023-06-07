import ProductCards from "./productCards";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Shop = () => {


    let [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/showAds').then((resp) => {
            // console.log(resp.data);
            setProducts(resp.data);
        })
    }, [])


    let [f1, setF1] = useState(false);
    let [f2, setF2] = useState(false);
    let [f3, setF3] = useState(false);

    useEffect(() => {
        let filterProducts = [];
        if (f1) {
            filterProducts.push({ brand: 'NIKE' })
        }
        if (f2) {
            filterProducts.push({ brand: 'ADIDAS' })
        }
        if (f3) {
            filterProducts.push({ brand: 'GUCCI' })
        }

        axios.post('/productFilter', { filterProducts }).then((resp) => {
            console.log(resp.data);
            setProducts(resp.data)
        })

    }, [f1, f2, f3])


    

    return <>
        <div className="bg-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-0">
                        <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>{" "}
                        <strong className="text-black">Shop</strong>
                    </div>
                </div>
            </div>
        </div>


        <div className="site-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-9 order-2">
                        <div className="row">
                            <div className="col-md-12 mb-5">
                                <div className="float-md-left mb-4">
                                    <h2 className="text-black h5">Shop All</h2>
                                </div>

                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="productsDisplay">
                                {
                                    products.map((product) => {
                                        return <Link to={`/productDetail/${product._id}`}><ProductCards product={product} /></Link>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3 order-1 mb-5 mb-md-0">
                        <div className="border p-4 rounded mb-4">
                            <div className="mb-4">
                                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                                    Filter by Price
                                </h3>
                                {/* <div id="slider-range" className="border-primary" />
                                <input
                                    type="text"
                                    name="text"
                                    id="amount"
                                    className="form-control border-0 pl-0 bg-white"
                                    disabled=""
                                /> */}
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-3 h6 text-uppercase text-black d-block">Brands</h3>
                                <label htmlFor="s_sm" className="d-flex">
                                    <input type="checkbox" id="s_sm" className="mr-2 mt-1" onChange={(evt) => { setF1(evt.target.checked) }} />{" "}
                                    <span className="text-black">NIKE</span>
                                </label>
                                <label htmlFor="s_md" className="d-flex">
                                    <input type="checkbox" id="s_md" className="mr-2 mt-1" onChange={(evt) => { setF2(evt.target.checked) }} />{" "}
                                    <span className="text-black">ADIDAS</span>
                                </label>
                                <label htmlFor="s_lg" className="d-flex">
                                    <input type="checkbox" id="s_lg" className="mr-2 mt-1" onChange={(evt) => { setF3(evt.target.checked) }} />{" "}
                                    <span className="text-black">GUCCI</span>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
};


export default Shop;