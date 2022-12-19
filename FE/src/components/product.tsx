import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Modal, Divider, Space, Select, message } from 'antd';
import { IProductData, IProductDataTable } from "../types/service.type";
import { ISupplierData } from "../types/service.type";

import ProductService from "../services/product.service";
import SupplierService from "../services/supplier.service";


import type { ColumnsType } from 'antd/es/table';

import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;




const Product = () => {

    const [products, setProducts] = useState<IProductDataTable[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<ISupplierData[]>([]);

    const collums: ColumnsType<IProductDataTable> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <button style={{ border: 'none', backgroundColor: 'red', color: 'white' }}
                        onClick={() => {
                            ProductService.delete(record.key)
                                .then((response: any) => {
                                    getAllProduct();
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
    useEffect(() => {
        SupplierService.getAll()
            .then((response: any) => {
                setSuppliers(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getAllProduct = () => {
        ProductService.getAll()
            .then((response: any) => {
                setProducts([]);
                response.data.forEach((element: IProductData) => {
                    const product: IProductDataTable = {
                        key: element.id,
                        name: element.name,
                        price: element.price,
                        supplierId: element.supplierId
                    }
                    setProducts((prev) => [...prev, product]);
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        ProductService.create(values)
            .then((response: any) => {
                getAllProduct();
                setIsModalOpen(false);
                message.success('Add success');
            })
            .catch((e: Error) => {
                console.log(e);
                message.error('Add fail');
            });
    };

    return (
        <div>
            <Modal title="Add Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="add-supplier"
                    className="add-supplier-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: 'Please input city!' }]}
                    >
                        <Input type="number" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Price" />
                    </Form.Item>
                    <Form.Item name="supplierId" label="Supplier" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select Supplier"
                            allowClear
                        >
                            {suppliers.map((supplier) => (
                                <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="add-supplier-form-button">
                        Add Product
                    </Button>

                </Form>
            </Modal>
            <Button type="primary" onClick={showModal}>
                Add Product
            </Button>
            <Divider />
            <Table dataSource={products} columns={collums} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }} />
        </div>
    );
};

export default Product;