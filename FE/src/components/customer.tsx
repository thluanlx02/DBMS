import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Modal, Divider, Space,  message, Select } from 'antd';
import { ICustomerData,  ICustomerDataTable } from "../types/service.type";


import CustormerDataService from "../services/customer.service";



import type { ColumnsType } from 'antd/es/table';

import { UserOutlined,PhoneOutlined } from '@ant-design/icons';
const { Option } = Select;

const Customer = () => {

    const [customers, setCustomers] = useState<ICustomerDataTable[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const collums: ColumnsType<ICustomerDataTable> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <button style={{ border: 'none', backgroundColor: 'red', color: 'white' }}
                        onClick={() => {
                            CustormerDataService.delete(record.key)
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
    useEffect(() => {
        CustormerDataService.getAll()
            .then((response: any) => {
                setCustomers(response.data);
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
    const getAllCustomer = () => {
        CustormerDataService.getAll()
            .then((response: any) => {
                setCustomers([]);
                response.data.forEach((element: ICustomerData) => {
                    const product: ICustomerDataTable = {
                        key: element.id,
                        name: element.name,
                        gender: element.gender,
                        phone: element.phone,
                    }
                    setCustomers((prev) => [...prev, product]);
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
        console.log('Received values of form: ', values);
        CustormerDataService.create(values)
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

    return (
        <div>
            <Modal title="Add Customer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        name="gender"
                        rules={[{ required: true, message: 'Please input gender!' }]}
                    >
                        <Select
                            placeholder="Gender"
                            allowClear
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Please input phone!' }]}
                    >
                        <Input prefix={<PhoneOutlined  className="site-form-item-icon" />} placeholder="Phone" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="add-supplier-form-button">
                        Add Customer
                    </Button>

                </Form>
            </Modal>
            <Button type="primary" onClick={showModal}>
                Add Customer
            </Button>
            <Divider />
            <Table dataSource={customers} columns={collums} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }} />
        </div>
    );
};

export default Customer;