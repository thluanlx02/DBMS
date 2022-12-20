import { Space, DatePicker, Divider } from "antd";
import { time } from "console";
import React from "react";
import OrderService from "../../services/order.service";
import ProductService from "../../services/product.service";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const { RangePicker } = DatePicker;
const Chart2 = () => {
    const [dateRange, setDateRange] = React.useState<any>([
        '1990-01-01',
        new Date().toISOString(),
    ]);
    const [productByAmout, setProductByAmout] = React.useState<any>([]);
    const [products, setProducts] = React.useState<any>([]);

    React.useEffect(() => {
        console.log("______DATE RANGE", dateRange[1]);

        OrderService.findAllNumberProductBySupplier(
            {
                startTime: dateRange[0],
                endTime: dateRange[1],
            }
        ).then((response: any) => {
            console.log("______RESPONSE", response.data);

            setProductByAmout(response.data);
        });
        ProductService.getAll().then((response: any) => {
            setProducts(response.data);
        });
    }, []);

    console.log("PRODUCTS", products);

    const data = {
        labels: productByAmout.map((item: any) => {
            return products.find((sup: any) => sup.id === item.product_id).name;
        }),
        datasets: [
            {
                label: 'Số sản phẩm bán được',
                data: productByAmout.map((item: any) => item.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    }


    return (
        <div>

            <Space direction="vertical" size={12}>
                <RangePicker onChange={
                    (value, dateString) => {
                        setDateRange(dateString);
                        OrderService.findAllNumberProductBySupplier(
                            {
                                startTime: dateString[0],
                                endTime: dateString[1],
                            }
                        ).then((res) => {
                            console.log(dateString[0]);

                            setProductByAmout(res.data);
                        }
                        ).catch((err) => {
                            console.log(err);
                        });

                    }
                }
                    showTime />


            </Space>
            <Divider />
            <div>
                <Pie data={data} />
                <label style={{
                    fontSize: '20px',
                    fontWeight: 'bold',

                }}>Biểu đồ:  Tỷ lệ số sản phẩm bán được trong khoảng thời gian nhất định</label>
            </div>
        </div>
    );
};

export default Chart2;