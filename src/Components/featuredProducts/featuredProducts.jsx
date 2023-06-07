import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedCard from "./featureCard";
import { Link } from "react-router-dom";




const FeaturedProducts = () => {


    let [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/showAds').then((resp) => {
            // console.log(resp.data);
            setProducts(resp.data);
        })
    }, [])


    return <>
        <div className="site-section block-3 site-blocks-2 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 site-section-heading text-center pt-4">
                        <h2>Featured Products</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="nonloop-block-3 owl-carousel">

                            <div className="featuredDisplay">
                                {/* <div className="owl-stage-outer">
                                    <div className="owl-stage"> */}
                                        {products.map((item) => {
                                            if (item.soldQty > 8) {
                                                return <Link to={`/productDetail/${item._id}`}><FeaturedCard product={item} /></Link>
                                            }
                                        })}
                                    {/* </div>
                                </div> */}
                            </div>
                            {/* <div className="item">
                                <div className="block-4 text-center">
                                    <figure className="block-4-image">
                                        <img
                                            src="images/shoe_1.jpg"
                                            alt="Image placeholder"
                                            className="img-fluid"
                                        />
                                    </figure>
                                    <div className="block-4-text p-4">
                                        <h3>
                                            <a href="#">Corater</a>
                                        </h3>
                                        <p className="mb-0">Finding perfect products</p>
                                        <p className="text-primary font-weight-bold">$50</p>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="block-4 text-center">
                                    <figure className="block-4-image">
                                        <img
                                            src="images/cloth_2.jpg"
                                            alt="Image placeholder"
                                            className="img-fluid"
                                        />
                                    </figure>
                                    <div className="block-4-text p-4">
                                        <h3>
                                            <a href="#">Polo Shirt</a>
                                        </h3>
                                        <p className="mb-0">Finding perfect products</p>
                                        <p className="text-primary font-weight-bold">$50</p>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="block-4 text-center">
                                    <figure className="block-4-image">
                                        <img
                                            src="images/cloth_3.jpg"
                                            alt="Image placeholder"
                                            className="img-fluid"
                                        />
                                    </figure>
                                    <div className="block-4-text p-4">
                                        <h3>
                                            <a href="#">T-Shirt Mockup</a>
                                        </h3>
                                        <p className="mb-0">Finding perfect products</p>
                                        <p className="text-primary font-weight-bold">$50</p>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="block-4 text-center">
                                    <figure className="block-4-image">
                                        <img
                                            src="images/shoe_1.jpg"
                                            alt="Image placeholder"
                                            className="img-fluid"
                                        />
                                    </figure>
                                    <div className="block-4-text p-4">
                                        <h3>
                                            <a href="#">Corater</a>
                                        </h3>
                                        <p className="mb-0">Finding perfect products</p>
                                        <p className="text-primary font-weight-bold">$50</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default FeaturedProducts;