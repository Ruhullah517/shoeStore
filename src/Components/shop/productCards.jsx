

const ProductCards = ({ product }) => {


    return <>
        <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
            <div className="block-4 text-center border">
                <figure className="block-4-image">
                    <a href="shop-single.html">
                        <img
                            src={product.imagePath}
                            alt="Image placeholder"
                            className="img-fluid"
                        />
                    </a>
                </figure>
                <div className="block-4-text p-4">
                    <h3>
                        <a href="shop-single.html">{product.title}</a>
                    </h3>
                    <p className="mb-0">Brand:{product.brand}</p>
                    <p className="text-primary font-weight-bold">${product.price}</p>
                </div>
            </div>
        </div>
    </>
};


export default ProductCards;