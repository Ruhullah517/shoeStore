



const FeaturedCard = ({ product }) => {
    return <>
        {/* <div className="owl-stage-outer"> */}
            {/* <div className="owl-stage"> */}
                <div className="owl-item active">


                    <div className="item">
                        <div className="block-4 text-center">
                            <figure className="block-4-image">
                                <img
                                    src={product.imagePath}
                                    alt="Image placeholder"
                                    className="img-fluid"
                                />
                            </figure>
                            <div className="block-4-text p-4">
                                <h3>
                                    <a>{product.title}</a>
                                </h3>
                                <p className="mb-0">Brand: {product.brand}</p>
                                <p className="text-primary font-weight-bold">${product.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        {/* </div> */}
    </>
};


export default FeaturedCard;