

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './dashboard.css';
import { AiOutlineRise, AiOutlineFall } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashCards() {

    let [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('/getOrders').then((resp) => {
            // console.log(resp.data);
            setOrder(resp.data);
        })
    }, []);

    let productsSold = 0;
    let revenue = 0;
    order.forEach((item) => {
        item.products.forEach((data) => {
            // console.log(data.quantity)
            productsSold += data.quantity;
        })
        revenue += +item.total
    })
    console.log("$" + (revenue / 100));
    // let productsSold = order.map(item => item.products.quantity)
    console.log(order);



    return (<div className='dashCards'>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Total Revenue
                </Typography>
                <Typography variant="h5" component="div">
                    <b>{"$" + (revenue / 100)}</b> <div style={{
                        width: 'fit-content',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        borderRadius: '10px',
                        fontSize: '15px',
                        paddingTop: '5px',

                    }}><AiOutlineRise />59%</div>
                </Typography>
                <Typography variant="body2">

                    <br />
                    {'from previous period'}
                </Typography>
            </CardContent>

        </Card>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Total Orders
                </Typography>
                <Typography variant="h5" component="div">
                    <b>{order.length}</b> <div style={{
                        width: 'fit-content',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        borderRadius: '10px',
                        fontSize: '15px',
                    }}>50%</div>
                </Typography>
                <Typography variant="body2">

                    <br />
                    {'from previous period'}
                </Typography>
            </CardContent>

        </Card>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Product Sold
                </Typography>
                <Typography variant="h5" component="div">
                    <b>{productsSold}</b> <div style={{
                        width: 'fit-content',
                        backgroundColor: 'red',
                        color: 'white',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        borderRadius: '10px',
                        fontSize: '15px',
                    }}><AiOutlineFall />40%</div>
                </Typography>
                <Typography variant="body2">

                    <br />
                    {'from previous period'}
                </Typography>
            </CardContent>
        </Card>
    </div >
    );
}
