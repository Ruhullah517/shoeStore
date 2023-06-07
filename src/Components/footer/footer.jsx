import { Link } from "react-router-dom";



const Footer = () => {
    return <>
        <footer className="site-footer border-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="footer-heading mb-4">Navigations</h3>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/shop">Shop</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">ContactUs</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Signup</Link>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <h3 className="footer-heading mb-4">Promo</h3>
                        <a href="#" className="block-6">
                            <img
                                src="images/hero_1.jpg"
                                alt="Image placeholder"
                                className="img-fluid rounded mb-4"
                            />
                            <h3 className="font-weight-light  mb-0">
                                <Link to="/shop" >
                                    Finding Your Perfect Shoes
                                </Link>
                            </h3>
                            <p>Promo from Dec 15 — 25, 2023</p>
                        </a>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="block-5 mb-5">
                            <h3 className="footer-heading mb-4">Contact Info</h3>
                            <ul className="list-unstyled">
                                <li className="address">
                                    Gamica Cloud , Near Govt. College Universty , Faislabad, Pakistan
                                </li>
                                <li className="phone">
                                    <a href="tel://23923929210">+2 392 3929 210</a>
                                </li>
                                <li className="email">emailaddress@domain.com</li>
                            </ul>
                        </div>
                        <div className="block-7">
                            {/* <form action="#" method="post">
                                <label htmlFor="email_subscribe" className="footer-heading">
                                    Subscribe
                                </label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control py-4"
                                        id="email_subscribe"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="submit"
                                        className="btn btn-sm btn-primary"
                                        defaultValue="Send"
                                    />
                                </div>
                            </form> */}
                        </div>
                    </div>
                </div>
                <div className="row pt-5 mt-5 text-center">
                    <div className="col-md-12">
                        <p>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            Copyright © {new Date().getFullYear()}All rights reserved | This Website is created By <b>Ruhullah</b>{" "}
                            {/* <i className="icon-heart" aria-hidden="true" /> by{" "}
                            <a
                                href="https://colorlib.com"
                                target="_blank"
                                className="text-primary"
                            >
                                Colorlib
                            </a>
                            Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </>
};

export default Footer;