import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Modal, Divider, Space } from 'antd';
import { ISupplierData, ISupplierDataTable } from "../types/service.type";
import SupplierService from "../services/supplier.service";
import type { ColumnsType } from 'antd/es/table';

import { UserOutlined } from '@ant-design/icons';





const AddSupplier = () => {

    const [suppliers, setSuppliers] = useState<ISupplierDataTable[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const collums: ColumnsType<ISupplierDataTable> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
              <Space size="small">
                <button style={{border:'none', backgroundColor:'red', color:'white'}}
                    onClick={() => {
                        SupplierService.delete(record.key)

                            .then((response: any) => {
                                getAllSuplier();
                            })
                            .catch((e: Error) => {
                                console.log(e);
                            });
                    }}
                >Delete</button>
              </Space>
            ),
          },
        
    ]
    const getAllSuplier = () => {
        SupplierService.getAll()
            .then((response: any) => {
                setSuppliers([]);
                response.data.forEach((element: ISupplierData) => {
                    const supplier: ISupplierDataTable = {
                        key: element.id,
                        name: element.name,
                        city: element.city
                    }
                    setSuppliers((prev) => [...prev, supplier]);
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAllSuplier();
    }, []);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        SupplierService.create(values)
            .then((response: any) => {
                getAllSuplier();
                setIsModalOpen(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            <Modal title="Add Supplier" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        name="city"
                        rules={[{ required: true, message: 'Please input city!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="City" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="add-supplier-form-button">
                        Add Supplier
                    </Button>

                </Form>
            </Modal>
            <Button type="primary" onClick={showModal}>
                Add Supplier
            </Button>
            <Divider />
            <Table dataSource={suppliers} columns={collums} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}/>
        </div>
    );
};

export default AddSupplier;