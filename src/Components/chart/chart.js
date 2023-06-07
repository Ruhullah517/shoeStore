import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";



const LineChart = ({ orders }) => {
    // console.log(covidData);

    const currentMonth = new Date().getMonth(); // Get the current month (0-11)
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Sample data for demonstration
    const totalOrdersData = [10, 20, 15, 30, 25, 20, 40, 35, 30, 45, 50, 55];
    const totalRevenueData = [1000, 1500, 1200, 2000, 1800, 1500, 2200, 2100, 1900, 2500, 2700, 3000];
    const totalProductsSoldData = [50, 80, 60, 90, 70, 60, 100, 95, 85, 110, 120, 130];

    // Populate remaining months with default or zero values
    const populateDataForYear = (data) => {
        if (data.length === 12) {
            return data; // Data already has values for each month
        } else {
            const populatedData = Array(12).fill(0);
            for (let i = 0; i < data.length; i++) {
                const dataIndex = (currentMonth + i) % 12;
                populatedData[dataIndex] = data[i];
            }
            return populatedData;
        }
    };

    // Prepare chart data
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Total Orders',
                data: populateDataForYear(totalOrdersData),
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Total Revenue',
                data: populateDataForYear(totalRevenueData),
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Total Products Sold',
                data: populateDataForYear(totalProductsSoldData),
                borderColor: 'orange',
                fill: false,
            },
        ],
    };

    // Options for the line chart
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };







    // let productsSold = 0;
    // let revenue = 0;
    // orders.forEach((item) => {
    //     item.products.forEach((data) => {
    //         // console.log(data.quantity)
    //         productsSold += data.quantity;
    //     })
    //     revenue += item.total
    // })

    // const generateRandomData = (length) => {
    //     return Array.from({ length }, () => Math.floor(Math.random() * 100));
    // };

    // let data = {
    //     lables: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //     datasets: [{
    //         label: 'Revenue',
    //         data: [revenue],
    //         borderColor: 'yellowgreen',
    //         fill: false
    //     },
    //     {
    //         label: 'Orders',
    //         data: [orders.length],
    //         borderColor: 'blue',
    //         fill: false
    //     },
    //     {
    //         label: 'Product-Sold',
    //         data: [productsSold],
    //         borderColor: 'green',
    //         fill: false
    //     }]
    // }

    // // const chartOptions = {
    // //     responsive: true,
    // //     scales: {
    // //         x: {
    // //             display: true,
    // //             title: {
    // //                 display: true,
    // //                 text: 'Month',
    // //             },
    // //         },
    // //         y: {
    // //             display: true,
    // //             title: {
    // //                 display: true,
    // //                 text: 'Value',
    // //             },
    // //         },
    // //     },
    // // };

    return <Line data={chartData} options={chartOptions} />
};



export default LineChart;