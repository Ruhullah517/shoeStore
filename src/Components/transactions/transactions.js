import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import './transactions.css';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Transactions = () => {

    let [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('/getOrders').then((resp) => {
            // console.log(resp.data);
            setOrder(resp.data);
        })
    }, []);





    let dispatch = useDispatch();


    return (
        <Box sx={{ width: '100%' }}  >
            <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
                Transactions
            </Typography>
            <Stack spacing={2} className='listParent'>
                <Item className='List listHeading'>
                    <div className='main-List'>
                        <div className='childList'>
                            <b> Order Number</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Customer Contact</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Date</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Total</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Payment Status</b>
                        </div>
                    </div>
                </Item>
                {order.map((item, index) => {

                    let quantityId = `Qty_${index}`;
                    let totalId = `Total_${index}`;
                    let total = item.price * item.qty;

                    return <Item className='List' key={index}>
                        <div className='main-List'>
                            <div className='childListTr childList'>
                                <b> {item._id}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childListTr childList'>
                                <b> {item.customerEmail}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childListTr childList'>
                                <b> {item.createdAt}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childListTr childList'>
                                <b>${item.total/100}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childListTr childList'>
                                <b style = {{ color: item.payment_status == "paid" ? "#28a950" : "black" }} > {item.payment_status.toUpperCase()}</b>
                            </div>
                        </div>
                    </Item>
                })}

            </Stack>
        </Box >
    );
};

export default Transactions;