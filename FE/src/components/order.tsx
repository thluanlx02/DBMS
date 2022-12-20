import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Modal, Divider, Space, message, Select } from 'antd';
import { IOrderData, IOrderDataTable } from "../types/service.type";
import { IProductData, ICustomerData } from "../types/service.type";


import ProductService from "../services/product.service";
import CustomerService from "../services/customer.service";
import OrderService from "../services/order.service";
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const Order = () => {

    const [orders, setOrders] = useState<IOrderDataTable[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<IProductData[]>([]);
    const [customer, setCustomer] = useState<ICustomerData>();

    const getAllProduct = () => {
        ProductService.getAll()
            .then((response: any) => {
                setProducts(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

    useEffect(() => {
        getAllProduct()
    }, []);

    const collums: ColumnsType<IOrderDataTable> = [
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (

                <Space size="small">
                    <button style={{ border: 'none', backgroundColor: 'red', color: 'white' }}
                        onClick={() => {
                            OrderService.delete(record.key)
                                .then((response: any) => {
                                    getAllCustomer();
                                    message.success('Delete success');
                                })
                                .catch((e: Error) => {
                                    console.log(e);
                                    message.error('Delete fail');
                                });
                        }}
                    >Delete</button>
                </Space>
            ),
        },

    ]


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        getAllProduct()

        setCustomer(undefined);
    };
    const getAllCustomer = () => {
   
        
        OrderService.getAll()
            .then((response: any) => {
                setOrders([]);
                response.data.forEach((element: any, idx: number) => {                    
                    const product: IOrderDataTable = {
                        key: element.id,
                        customerId: element.customerId,
                        orderDate: element.createdAt,
                        total: element.total,   
                        orderId: element.id,
                    }
                    setOrders((prev) => [...prev, product]);
                   
                    
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAllCustomer();
    }, []);

    const onFinish = (values: any) => {
        getAllProduct()
        setCustomer(undefined);
        console.log('Received values of form: ',customer, {
            customerId: customer?.id,
            orderItems: values.orderItem,
            orderDate: new Date().toISOString(),
            //    total: values.orderItem.reduce((prev: number, curr: any) => prev + curr.quantity * curr.price, 0),
            total: 0
        });
        OrderService.create({
            customerId: customer?.id,
            orderItems: values.orderItem,
            createAt: new Date().toISOString(),
            //    total: values.orderItem.reduce((prev: number, curr: any) => prev + curr.quantity * curr.price, 0),
            total: 0
        })
            .then((response: any) => {
                getAllCustomer();
                setIsModalOpen(false);
                message.success('Add success');
            })
            .catch((e: Error) => {
                console.log(e);
                message.error('Add fail');
            });
    };
    // console.log("order",orders);



    return (
        <div>
            <Modal title="Add Order" open={isModalOpen} footer={null} onCancel={handleCancel} destroyOnClose={true}>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="phone"
                        label="Phone Customer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input'
                            },
                            {
                                pattern: new RegExp(/^[0-9\b]+$/),
                                message: 'Please input number of phone'
                            }
                            
                        ]}
                    >
                        <Input
                            // showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            // optionFilterProp="children"
                            onBlur={(value) => {
                                CustomerService.getByPhone(value.target.value)
                                    .then((response: any) => {
                                        console.log("cus",response.data);
                                        
                                        setCustomer(response.data[0]);
                                    })
                                    .catch((e: Error) => {
                                        console.log(e);
                                    });
                            }}
                            />
                    </Form.Item>
                    {
                        customer && (
                            <>
                            <Form.List name="orderItem" rules={
                        [
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject();
                                    } else {
                                        return Promise.resolve(
                                            names.forEach((name: any) => {
                                                if (name.productId && name.quantity) {
                                                    setProducts((prev) => {
                                                        const index = prev.findIndex((product) => product.id === name.productId);
                                                        if (index >= 0) {
                                                            prev.splice(index, 1);
                                                        }
                                                        console.log(prev);

                                                        return [...prev];
                                                    });
                                                }
                                            })

                                        );



                                    }
                                },
                            },

                        ]
                    }>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'productId']}
                                            rules={[{ required: true, message: 'Missing first name' }]}
                                        >

                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Select a product"
                                                optionFilterProp="label"
                                                options={products.map((product) => {
                                                    return {
                                                        value: product.id,
                                                        label: product.name,
                                                    }
                                                })}
                                                filterOption={(input, option) => {
                                                    return option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }}
                                            />

                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}

                                            rules={[{ required: true, message: 'Missing quantity' }]}
                                        >
                                            <Input type="number" min={1} placeholder="quantity" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                            </>
                        )
                    }
                </Form>
                    
               
            </Modal>
            <Button type="primary" onClick={showModal}>
                Add Order
            </Button>
            <Divider />
            <Table
                dataSource={orders}
                columns={collums}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
            />
        </div>
    );
};

export default Order;