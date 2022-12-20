import { Divider } from "antd";
import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Divider />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    width: '300px',
                    height: '300px',
                    marginTop:'90px'
                }}>
                    <Chart1 />
                </div>
                <div style={{
                    width: '300px',
                    height: '300px',
                }}>
                    <Chart2 />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;