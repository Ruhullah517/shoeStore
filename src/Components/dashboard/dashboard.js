
import DashCards from './dashCards';
import LineChart from '../chart/chart';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {

    let [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('/getOrders').then((resp) => {
            // console.log(resp.data);
            setOrder(resp.data);
        })
    }, []);

    return (<div >
        <h2 style={{
            textAlign: 'center',
            fontFamily: 'auto',
            fontVariantCaps: 'petite-caps',
            fontSize: 'xxx-large',
            color: '#009688'
        }}>Welcome to Dashboard</h2>


        <DashCards />
        <div className='lineChart'>
            <LineChart orders={order} />
        </div>
    </div >
    );
}
