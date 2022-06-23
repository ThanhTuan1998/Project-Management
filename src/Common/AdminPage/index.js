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
import "./index.css";
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
import routes from "../../routesAdmin";
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
const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

const showContentMenu = (routes) => {
  let result = null;
  if (routes) {
    result = routes.map((item, index) => {
      return <Route key={index} path={item.path} element={item.component()} />;
    });
  }
  return result;
};
const AdminComponent = (props) => {
  const { isLoading } = props;
  const {
    getAllResident,
    listAccountResident,
    createAccountResident,
    deleteAccountResident,
    getIdUsers,
    updateUsers,
  } = props;
  console.log("check props", props);
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
    localStorage.removeItem("token");
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
    // getAllResidents();
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
  console.log(listAccountResident);
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Layout>
            <h1 className="title logo"></h1>
          </Layout>
          <Menu
            theme="default"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "0",
                icon: <DashboardOutlined />,
                label: <Link to="dashboard">{t("dashBoard")}</Link>,
              },
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="users">{t("userManaGement")}</Link>,
              },
              {
                key: "2",
                icon: <CoffeeOutlined />,
                label: <Link to="news">{t("News")}</Link>,
              },
              {
                key: "3",
                icon: <SolutionOutlined />,
                label: <Link to="feedbacks">{t("feedBacks")}</Link>,
              },
              {
                key: "4",
                icon: <FormOutlined />,
                label: <Link to="form-online">{t("formOnline")}</Link>,
              },
              {
                key: "5",
                label: "sub menu",
                icon: <SmileOutlined />,
                label: (
                  <span className="span-style">{t("servicesManaGemnt")}</span>
                ),
                key: "submenu",
                children: [
                  {
                    icon: <TableOutlined />,
                    label: (
                      <Link to="/administrator/services/booking">
                        {t("listBookServices")}
                      </Link>
                    ),
                    key: "submenu-item-1",
                  },
                  {
                    icon: <ProfileOutlined />,
                    label: (
                      <Link to="/administrator/services/system">
                        {t("systemServices")}
                      </Link>
                    ),
                    key: "submenu-item-2",
                  },
                ],
              },
              ,
              {
                key: "6",
                icon: <ApiOutlined />,
                label: <Link to="configuration">{t("conFiguRation")}</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Dropdown
              overlay={global}
              placement="bottomRight"
              className="global"
            >
              <GlobalOutlined />
            </Dropdown>
            <Dropdown overlay={menu} className="menu" placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <Space>{user?.username}</Space>
              </a>
            </Dropdown>
          </Header>
          <Routes>{showContentMenu(routes)}</Routes>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});
const Admin = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AdminComponent)
);
export default Admin;
