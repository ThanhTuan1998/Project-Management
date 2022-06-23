import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Table,
  Breadcrumb,
  Pagination,
  Switch,
  Modal,
  Form,
  Input,
  Checkbox,
  Popconfirm,
  Alert,
  Radio,
  Tabs,
  Col,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  LoginOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HomeOutlined,
  BookOutlined,
  GlobalOutlined,
  DashboardOutlined,
  CoffeeOutlined,
  SolutionOutlined,
  FormOutlined,
  SmileOutlined,
  ApiOutlined,
  TableOutlined,
  ProfileOutlined,
  SettingOutlined,
  AudioOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Select } from "antd";
import Item from "antd/lib/list/Item";
import { changeLanguage } from "i18next";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import {
  asyncreateAcountResident,
  asyndeleteAcountResident,
  asynGetIdUser,
  asynUpdateUsers,
  getAllResident,
} from "./stores/actions";
import { selectListAccountResident, selectLoading } from "./stores/selector";
const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

const UserManagementComponent = (props) => {
  const { isLoading } = props;
  const {
    getAllResident,
    listAccountResident,
    createAccountResident,
    deleteAccountResident,
    getIdUsers,
    updateUsers,
  } = props;
  console.log("props", props);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const { t } = props;
  const { is18n } = useTranslation();
  const onChange = (e) => {
    const params = {
      paging: {
        total: 935,
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "username",
        order: "asc",
      },
      type: e,
    };
    getAllResident(params);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [showBtn, setshowBtn] = useState(false);
  const onFinish = async (values) => {
    if (values) {
      const response = await createAccountResident(values);
      console.log(response);
      if (response) {
        getAllResidents();
      }
    }
    if (values.username) {
      const response = await updateUsers(values);
      console.log(response);
      if (response) {
        getAllResidents();
      }
    }
    handleCancel();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async (id) => {
    let response = await deleteAccountResident(id);
    if (response && response.code === 200) {
      getAllResidents();
    }
    toast.error("Xóa thành công");
    // let reponse = await deleteNew(id);
    // if (reponse.status === 200) {
    //   // getListNews();
    // }
  };
  const addNew = () => {
    setshowBtn(true);
    setIsModalVisible(true);
    formModal.resetFields();
  };
  // const onChangeSwitch = async (values, record) => {
  //   const params = {
  //     id: record.id,
  //     isShow: values,
  //   };
  //   let respone = await updateNew(params);
  //   if (respone) {
  //     // getListNews();
  //   }
  // };
  const showModal = async (username) => {
    setshowBtn(false);
    setIsModalVisible(true);
    const params = {
      username: username,
    };
    let res = await getIdUsers(params);
    console.log(res);
    if (res) {
      formModal.setFieldsValue({
        username: res.username,
        address: res.address,
        fullName: res.fullName,
        phoneNumber: res.phoneNumber,
        roleId: res.role,
        roomId: res.room,
        email: res.email,
      });
    }
  };
  const columns = [
    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => (
        <span>
          {text ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CheckCircleOutlined style={{ color: "red" }} />
          )}
        </span>
      ),
    },
    {
      title: t("fullName"),
      dataIndex: "fullName",
      key: "fullName",
      align: "left",
    },
    {
      title: t("debtAmount"),
      dataIndex: "debtAmount",
      key: "debtAmount",
      align: "center",
    },
    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <Space>
          <button className="btn-edit">
            <a>
              <EditOutlined onClick={() => showModal(record.username)} />
            </a>
          </button>
          <Popconfirm
            title="Are you sure to delete this account ?"
            onConfirm={() => handleDelete(record.username)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleLogout = () => {
    document.cookie = `token =`;
    window.location.href = "/login";
  };
  const [formModal] = Form.useForm();
  const global = (
    <Menu
      items={[
        {
          key: "1",
          label: <a onClick={() => changeLanguage("en")}>en English </a>,
        },
        {
          key: "2",
          label: <a onClick={() => changeLanguage("vi")}>vi Vietnamese </a>,
        },
      ]}
    />
  );
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="/login" onClick={handleLogout}>
              Đăng xuất
            </Link>
          ),
          icon: <LoginOutlined className="btn-icon" />,
          key: "0",
        },
        {
          label: (
            <Link to="/login" onClick={handleLogout}>
              Change Password
            </Link>
          ),
          icon: <SettingOutlined className="btn-icon" />,
          key: "1",
        },
      ]}
    />
  );
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [mode, setMode] = useState("top");

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  useEffect(() => {
    getAllResidents();
  }, []);
  const getAllResidents = (valueSearch) => {
    const params = {
      search: valueSearch || "",
      paging: {
        total: 935,
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "username",
        order: "asc",
      },
      type: "All",
    };
    getAllResident(params);
  };
  const [gender, setGender] = useState("MALE");

  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    console.log("hahah");
    setGender(e.target.value);
  };
  const [valueSearch, setvalueSearch] = useState("");
  const onSearch = () => {
    getAllResidents(valueSearch);
  };
  const onChandGender = (e) => {
    setGender(e.target.value);
  };
  return (
    <>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{t("Users")}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button className="btn-create" onClick={addNew}>
          <span className="style-span">{t("Create")}</span>
        </Button>
        <div className="style-button">
          <Input
            value={valueSearch}
            onChange={(e) => setvalueSearch(e.target.value)}
          />
          <Button
            style={{ top: "52px", right: "11px", position: "absolute" }}
            onClick={onSearch}
          >
            {t("Search")}
          </Button>
        </div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab={t("All")} key="All"></TabPane>
          <TabPane tab={t("resiDence")} key="Resident"></TabPane>
          <TabPane tab={t("Tenant")} key="Tenant"></TabPane>
          <TabPane tab={t("Admin")} key="Admin"></TabPane>
          <TabPane tab={t("Reception")} key="Reception"></TabPane>
          <TabPane tab={t("Accountant")} key="Accountant"></TabPane>
          <TabPane tab={t("Security")} key="Security"></TabPane>
          <TabPane tab={t("Guest")} key="Guest"></TabPane>
        </Tabs>
        <Table
          dataSource={listAccountResident}
          loading={isLoading}
          columns={columns}
          // pagination={{
          //   pageSize: 10,
          //   total: listAccountResident.paging.total,
          // }}
        ></Table>
        <Modal
          title={showBtn === true ? "Create" : "Edit"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Button className="btn-add" htmlType="submit" form="formModal">
              {showBtn === true ? "Add" : "Save"}
            </Button>
          }
        >
          <Form
            name="formModal"
            form={formModal}
            labelCol={{
              span: 20,
            }}
            wrapperCol={{
              span: 30,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Col className="row">
              <Form.Item
                className="col-6"
                label="User name"
                name="username"
                rules={[
                  { required: true, message: "Plese input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="col-6"
                label="Full name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your fullname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="row">
              <Form.Item
                className="col-12"
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="row">
              <Form.Item
                className="col-6"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                className="col-6"
                rules={[
                  {
                    required: true,
                    message: "Please input your title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Form.Item label="Gender" name="gender">
              <Radio.Group
                defaultValue={gender}
                onChange={onChangeGender}
                value={gender}
              >
                <Radio value="MALE">NAM</Radio>
                <Radio value="FEMALE">NỮ</Radio>
              </Radio.Group>
            </Form.Item>
            <Col className="row">
              <Form.Item className="col-6" label="Rooms" name="roomId">
                <Select>
                  <Option value="T4-3403">T4-3403</Option>
                  <Option value="T4-3402">T4-3402</Option>
                </Select>
              </Form.Item>
              <Form.Item className="col-6" label="Role" name="roleId">
                <Select>
                  <Option value="Accountant">Accountant</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Form>
        </Modal>
      </Content>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  listAccountResident: selectListAccountResident,
});

const mapDispatchToProps = (dispatch) => ({
  getAllResident: (payload) => dispatch(getAllResident(payload)),
  createAccountResident: (payload) =>
    asyncreateAcountResident(dispatch)(payload),
  deleteAccountResident: (payload) =>
    asyndeleteAcountResident(dispatch)(payload),
  getIdUsers: (payload) => asynGetIdUser(dispatch)(payload),
  updateUsers: (payload) => asynUpdateUsers(dispatch)(payload),
});
const UserManagement = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent)
);
export default UserManagement;
