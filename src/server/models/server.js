const express = require('express');
let Ad = require('./models/ad');
let User = require('./models/user')
const multer = require('multer')
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let Order = require('./models/orders');
const nodemailer = require('nodemailer');
require("dotenv").config();


// const stripe = require('stripe')('sk_test_51NAv0zSFhoIKN218Z4sQbxmxAfurqMuI63vjxrQwRsFgUHLa2fugP87OOTQsAb47Q6NSLiUdnkaRfv1UTUxipOg100U58GKCjx');
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);
const path = require('path')
// const stripe = Stripe(process.env.STRIPE_KEY);
const cors = require('cors');


const app = express();
mongoose.connect('mongodb://localhost:27017/shoestore').then(function (err, connection) {
    console.log(err || connection);
})

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const upload = multer({ dest: 'uploaded/' })

const { uploadFile, getFileStream } = require('./models/s3');


app.use(express.json());




app.use(express.static('./server/uploaded'));

console.log(process.env.AUTH_USER)

app.get('/images/:key', (req, res) => {
    // console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

app.post('/createAd', upload.single('pic'), async (req, res) => {

    try {
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        console.log(req.body);
        console.log(`/images/${result.Key}`);
        let newAd = new Ad(req.body);
        newAd.imagePath = `/images/${result.Key}`;
        await newAd.save();
    } catch (error) {
        console.log('error in posting ad', error);
    }


});

app.get('/showAds', async (req, res) => {
    try {
        let ads = await Ad.find();
        // console.log(ads);
        res.json(ads);
    } catch (error) {
        console.log("showAds error", error);
    }
});


app.delete('/deleteProduct', async (req, res) => {
    await Ad.findByIdAndDelete(req.query.id);
    res.json(
        { success: true }
    );
});


app.post('/productFilter', async (req, res) => {
    let ads;
    let filter = req.body.filterProducts;
    if (req.body.filterProducts.length) {
        ads = await Ad.find({ $or: filter });
    } else {
        ads = await Ad.find();
    }
    res.json(ads);
});






app.post('/createUser', upload.none(), async (req, res) => {
    let newUser = new User(req.body);
    // console.log(newUser);
    await newUser.save();
});


app.get('/getUsers', async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (error) {
        console.log("getUser error" + error);
    }
});

app.delete('/deleteUser', async (req, res) => {
    await User.findByIdAndDelete(req.query.id);

    res.json({
        success: true
    });
});

app.post('/userLogin', async (req, res) => {
    let userFound = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (userFound != undefined) {
        jwt.sign({ id: userFound._id }, "cat is singing in the house", { expiresIn: '1d' }, (err, myToken) => {
            res.json({
                userFound,
                myToken
            });
        })
    } else {
        res.json(null);
    }
});

app.post('/session-check', (req, res) => {
    jwt.verify(req.body.myToken, "cat is singing in the house", async (err, data) => {
        let userFound = await User.findById(data.id)
        res.json(userFound);

    });
});





app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`
}))



let productSold = [];
app.post('/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userID,

        }
    })

    const line_items = req.body.cartItems.map((item) => {

        productSold.push({ productId: item._id, productQty: item.qty })
        const s3Url = 'https://d1wqzb5bdbcre6.cloudfront.net';

        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    // images: ["https://cdn.shopify.com/s/files/1/0046/9139/4658/files/SS20_HOMEPAGE_MCCLEANPAIR_880x550_crop_center.jpg?v=1614334815"],
                    images: [item.imagePath.url],
                    description: item.description,
                    metadata: {
                        id: item._id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.qty,
        }


    })



    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: `${process.env.SUCCESS_URL}`,
        cancel_url: `${process.env.CANCEL_URL}`,
    });

    res.send({ url: session.url });
});




//nodemailer configuration....
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.AUTH_USER}`,
        pass: `${process.env.AUTH_USER_PASS}`,
    },
});

function sendEmail(to, subject, content) {
    const mailOptions = {
        from: `${process.env.AUTH_USER}`,
        to,
        subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Failed to send email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}




const createOrder = async (customer, checkoutSession, lineItems) => {


    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerEmail: checkoutSession.customer_details.email,
        customerName: checkoutSession.customer_details.name,
        customerId: checkoutSession.customer,
        paymentIntentId: checkoutSession.payment_intent,
        products: lineItems.data,
        subtotal: checkoutSession.amount_subtotal,
        total: checkoutSession.amount_total,
        payment_status: checkoutSession.payment_status,
    });

    try {
        const savedOrder = await newOrder.save();

        console.log("ProcessedOrder:", savedOrder);


        if (savedOrder) {


            // Send email to the user
            const userEmail = savedOrder._doc.customerEmail;
            const userSubject = 'Your Order Completion Email';
            const userContent = `
  <p>Dear ${savedOrder._doc.customerName},</p>
  <p>Your order with ID <b>${savedOrder._doc._id}</b> has been completed successfully. Thank you for shopping with us!</p>
  <p>The Shoes</p>
`;
            sendEmail(userEmail, userSubject, userContent);

            // Send email to the admin
            const adminEmail = `${process.env.ADMIN_EMAIL}`; // Replace with your admin email address
            const adminSubject = 'New Order Placement';
            const adminContent = `
  <p>Hello Admin,</p>
  <p>A new order with ID <b>${savedOrder._doc._id}</b> has been placed. Please process it accordingly.</p>
  <p>The Shoes</p>
`;
            sendEmail(adminEmail, adminSubject, adminContent);


        }

    } catch (error) {
        console.log(error);
    }


}



app.post('/webhook', express.json({ type: 'application/json' }), async (request, response) => {
    const event = request.body;
    let allAds = await Ad.find();
    allAds.forEach((ad) => {
        productSold.forEach((product) => {
            if (ad._id == product.productId) {
                ad.soldQty += product.productQty;
                ad.save();
                console.log(ad);
            };
        });
    });
    productSold = [];

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            stripe.customers.retrieve(checkoutSession.customer).then((customer) => {
                stripe.checkout.sessions.listLineItems(
                    checkoutSession.id,
                    {},
                    function (err, lineItems) {
                        // asynchronously called
                        console.log("line_items:", lineItems);
                        createOrder(customer, checkoutSession, lineItems)
                    }
                );

                console.log("checkoutSession:", checkoutSession.customer_details);
            }).catch(err => console.log(err.message));
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handleCheckoutSession(chekoutSession);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
});

app.post("/contactMessage", (req, res) => {
    const { name, email, subject, message } = req.body;

    const adminEmail = `${process.env.ADMIN_EMAIL}`; // Replace with your admin email address
    const adminSubject = `New Contact Form Submitted`;
    const adminContent = `<p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Message: ${message}</p>`;
    contactUs(adminEmail, adminSubject, adminContent);

    function contactUs(to, subject, content) {
        const mailOptions = {
            from: `${email}`,
            to,
            subject,
            html: content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Failed to send email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
    };

    res.json({
        success: true
    })


})

app.get('/getOrders', async (req, res) => {
    try {
        let orders = await Order.find();
        res.json(orders)
    } catch (error) {
        console.log(error);
    }
})


app.listen(6789, () => {
    console.log('server Conneted on port 6789');
})