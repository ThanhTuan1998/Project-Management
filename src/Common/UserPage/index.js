import { Layout, Menu, Breadcrumb, Input, Modal, Button, Dropdown, Form } from 'antd'
import React, { useState, useEffect } from "react";
// import "./index.css"
import routes from "../../routesUser";
import { Route, Routes, useNavigate, Link, Outlet } from "react-router-dom";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    VideoCameraOutlined,
    UserOutlined,
    AuditOutlined,
    SelectOutlined,
    DollarOutlined,
    CloudServerOutlined,
    ApiOutlined,
    LogoutOutlined,
    SettingOutlined, RedditOutlined
} from '@ant-design/icons';
import { icons } from 'antd/lib/image/PreviewGroup';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const UserPage = () => {
    const title = 'Home Page'
    // Lấy thông tin user ( key value) từ Local Storage
    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [collapsed, setcollapsed] = useState(false);
    const [form] = Form.useForm();

    const toggle = () => {
        setcollapsed(!collapsed);
    };
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };
    const navigate = useNavigate();
    useEffect(() => {
        document.title = title;
        // document.tittle = menuItems.label;
        const user = localStorage.getItem('user');
        if (!user) {
            navigate("/login")
        }
    }, [])

    const showContentMenu = (routes) => {
        let result = null;
        if (routes) {
            result = routes.map((item, index) => { return <Route key={index} path={item.path} element={item.component()} /> })
        }
        return result;
    }

    // Đổi pass - logout
    const menu = (
        <Menu
            style={{ padding: '5px' }}
            items={[
                {
                    icon: <SettingOutlined />,
                    label: (
                        <a onClick={showModal}>Đổi mật khẩu</a>
                    ),
                },
                {
                    icon: <LogoutOutlined />,
                    label: (
                        icons = <LogoutOutlined />,
                        <Link to='/logout'>Đăng xuất</Link>
                    ),
                },

            ]}
        />
    );

    const menuItems = [
        {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link to='createResident'>Create Account</Link>,
        },
    ];

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <img src='https://duanestellaheights.com/wp-content/uploads/2021/11/Estella-Heights-logo-2.jpg' alt='/' />
                    </div>
                    <Menu
                    defaultSelectedKeys={['1']} 
                    items={menuItems} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}

                        <div className="user-info" style={{ float: 'right', marginRight: '15px' }}>
                            <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }} className='icon-user' style={{ marginRight: '10px' }}>
                                <label><RedditOutlined style={{ color: "blue" }} /></label>
                            </Dropdown>
                            <label className='username'>
                                Xin chào {user?.username}
                            </label>
                        </div>
                    </Header>

                    <Breadcrumb style={{ marginLeft: '23px', marginBottom: '15px', marginTop: '10px' }}>
                        <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Component</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">General</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Button</Breadcrumb.Item>
                    </Breadcrumb>

                    <h3 style={{ marginLeft: '22px', marginBottom: '0px' }}>
                        <Routes>
                            {showContentMenu(routes)}
                        </Routes>
                    </h3>
                    <br />
                    <Modal
                        title="Đổi mật khẩu"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={
                            <Button type='primary' htmlType='submit' form='form'>
                                Save
                            </Button>
                        }
                    >
                        <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                            name='form'
                        >
                            <Form.Item
                                label="Nhập mật khẩu cũ"
                                name="oldPass"
                                rules={[{
                                    required: true,
                                    message: 'Please input your old password!',
                                },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Nhập mật khẩu mới"
                                name="newPass"
                                rules={[{
                                    required: true, message: 'Please input your new password!',
                                },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nhập lại mật khẩu mới"
                                name="renewPass"
                                rules={[{
                                    required: true, message: 'Please input your new password!',
                                },
                                ]}>
                                <Input />
                            </Form.Item>

                        </Form>
                    </Modal>

                </Layout>
            </Layout>
        </>
    )
}

export default UserPage;