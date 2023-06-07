import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    let currUser = useSelector((store) => {
        // console.log(store);

        return store.currUserSection
    });
    console.log(currUser);
    let cartItems = useSelector((store) => {
        // console.log(store.cartSection);
        if (store.cartSection.addToCart != undefined) {

            return store.cartSection.addToCart.filter((item) => {
                if (item.UserID == currUser._id) {
                    return true;
                }
            })

        }
    });

    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <>
            <header className="site-navbar" role="banner">
                <div className="site-navbar-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                                <form action="" className="site-block-top-search">

                                </form>
                            </div>
                            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                                <div className="site-logo">

                                    <Link to="/" className="js-logo-clone">
                                        Shoppers
                                    </Link>

                                </div>
                            </div>
                            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                                <div className="site-top-icons">
                                    <ul>
                                        <li>
                                            {(Object.keys(currUser).length != 0) ?
                                                <Link to="/cart" className="site-cart">
                                                    <span className="icon icon-shopping_cart" />
                                                    <span className="count">{cartItems ? cartItems.length : null}</span>
                                                </Link> :
                                                null
                                            }
                                        </li>
                                        <li className="d-inline-block d-md-none ml-md-0">
                                            <a  className="site-menu-toggle js-menu-toggle">
                                                <span className="icon-menu" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="site-navigation text-right text-md-center" role="navigation">
                    <div className="container">
                        <ul className="site-menu js-clone-nav d-none d-md-block">
                            <li >
                                <a >
                                    <Link to="/">
                                        Home
                                    </Link>
                                </a>
                            </li>
                            <li >
                                <a>
                                    <Link to="/about">
                                        About
                                    </Link>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <Link to="/shop">
                                        Shop
                                    </Link>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Link to="/contact">
                                        Contact
                                    </Link>
                                </a>
                            </li>
                            {(Object.keys(currUser).length === 0) ? <>
                                <li>
                                    <a>
                                        <Link to="/signup">
                                            Signup
                                        </Link>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </a>
                                </li>
                            </> :
                                <li>
                                    <a onClick={() => {
                                        dispatch({
                                            type: 'logout'
                                        })
                                        navigate('/login')
                                    }}>LogOut</a>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>


        </>
    )
}

export default Navbar;