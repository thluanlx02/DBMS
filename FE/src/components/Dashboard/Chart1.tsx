import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ProductService from "../../services/product.service";
import SupplierService from "../../services/supplier.service";




ChartJS.register(ArcElement, Tooltip, Legend);



const Chart1 = () => {
    const [productBySupplier, setProductBySupplier] = React.useState<any>([]);
    const [supplier, setSupplier] = React.useState<any>([]);
   

    React.useEffect(() => {
        ProductService.findAllNumberProductBySupplier().then((response: any) => {
            setProductBySupplier(response.data);
        });
        SupplierService.getAll().then((response: any) => {
            setSupplier(response.data);
        })

    }, []);
    console.log("SUPPLIER", productBySupplier);
    
    const data = {
        labels: productBySupplier.map((item: any) => {
            return supplier.find((sup: any) => sup.id === item.supplier_id).name;
        }),
        datasets: [
            {

                data: productBySupplier.map((item: any) => item.total),
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
            <Pie data={data} />
            <label style={{
                fontSize: '20px',
                fontWeight: 'bold',

            }}>Biểu đồ:  Tỷ lệ sản phẩm cung cấp của các nhà cung cấp</label>
        </div>
    )
}

export default Chart1;