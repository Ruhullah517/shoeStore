import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import './productsLists.css';
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ProductsList = () => {

    let [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/showAds').then((resp) => {
            // console.log(resp.data);
            setProducts(resp.data);
        })
    }, [])


    // let cartItems = useSelector((store) => {
    //     // console.log(store);
    //     return store.cartSection.addToCart;
    // });
    // let currUser = useSelector((store) => {
    //     // console.log(store);
    //     return store.currUserSection;
    // });
    // console.log(currUser);

    let navigate = useNavigate();
    let dispatch = useDispatch();


    return (
        <Box sx={{ width: '100%' }}  >
            <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
                Products List
            </Typography>
            <Stack spacing={2}>
                <Item className='List listHeading'>
                    <div className='main-List'>
                        <div className='childList'>
                            Image
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Title</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Price</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            Remove
                        </div>
                        {/* <hr className='hr' />
                        <div className='childList'>
                            Edit
                        </div> */}
                    </div>
                </Item>
                {products.map((item, index) => {

                    let quantityId = `Qty_${index}`;
                    let totalId = `Total_${index}`;
                    let total = item.price * item.qty;

                    return <Item className='List' key={index}>
                        <div className='main-List'>
                            <div className='childList'>
                                <img src={item.imagePath} />
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <b><i>{item.brand}</i> {item.title}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <b>${item.price}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <button className='removeBtn' onClick={() => {
                                    axios.delete('/deleteProduct?id=' + item._id).then(() => {
                                        products.splice(index, 1);
                                        setProducts([...products]);
                                        toast.success("Product Deleted");
                                    })

                                }}>Remove</button>
                            </div>
                            {/* <hr className='hr' />
                            <div className='childList'>
                                <button className='editBtn' onClick={() => {
                                    navigate(`/editForm/${item._id}`);

                                }}>Edit</button>
                            </div> */}
                        </div>
                    </Item>
                })}

            </Stack>
        </Box >
    );
};

export default ProductsList;