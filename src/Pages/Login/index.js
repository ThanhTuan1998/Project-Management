import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Table,
  Layout,
  Col,
  Menu,
  Dropdown,
  Space,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SmileOutlined,
  CheckOutlined,
  WarningOutlined,
  GlobalOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.css";
import { selectLoading } from "./stores/selector";
import { loginRequestService } from "../../Services/loginService";
import { loginRequestAction } from "./stores/actions";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import Item from "antd/lib/list/Item";
import { toast } from "react-toastify";
import { LayoutContext } from "antd/lib/layout/layout";
import { withTranslation, useTranslation } from "react-i18next";
import { changeLanguage, use } from "i18next";
import i18n from "../../i18n";
import EN_MESSAGE from "../../locales/en/message";
import VI_MESSAGE from "../../locales/vi/message";

const LoginComponent = (props) => {
  const { t, m } = props;
  const { is18n } = useTranslation();
  const { isLoading } = props;

  const [loadings, setLoadings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const onFinish = async (values) => {
    const { username, password } = values;

    if (username === "admineh" && password === "Estella1230") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
        })
      );
      toast.success(i18n.t("loginSuccess"));
    } else {
      toast.error(i18n.t("loginFailed"));
    }
    const payload = {
      values,
      navigate,
    };
    await props.loginRequest(payload);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/administrator/users");
    } else {
      navigate("/login");
    }
  }, []);

  // menu Translate
  const menu = (
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

  return (
    <>
      <Layout className="ftco-section">
        <div className="style-global">
          <Dropdown overlay={menu} placement="bottomRight">
            <span>
              <GlobalOutlined className="logo-global" />
            </span>
          </Dropdown>
        </div>

        <Layout className="container">
          <Col className="row justify-content-center">
            <Layout className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div
                  className="img"
                  style={{ backgroundImage: "url(images/bg-1.jpg)" }}
                ></div>
                <Layout className="login-wrap p-4 p-md-5">
                  <Layout className="d-flex">
                    <Layout className="w-100">
                      <h3 className="mb-4">{t("signIn")}</h3>
                    </Layout>
                    <Layout className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fa fa-facebook" />
                        </a>
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fa fa-twitter" />
                        </a>
                      </p>
                    </Layout>
                  </Layout>

                  {/* Form Login */}
                  <Form
                    name="basic"
                    labelCol={{
                      span: 12,
                    }}
                    wrapperCol={{
                      span: 10,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label={t("userName")}
                      name="username"
                      wrapperCol={{
                        offset: 1,
                      }}
                      className="label"
                      htmlFor="name"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: t("messageUserName"),
                        },
                      ]}
                    >
                      <Input placeholder={t("userName")} />
                    </Form.Item>

                    <Form.Item
                      label={t("Password")}
                      name="password"
                      hasFeedback
                      wrapperCol={{
                        offset: 1,
                      }}
                      rules={[
                        {
                          required: true,
                          message: t("messagePassword"),
                        },
                      ]}
                    >
                      <Input.Password placeholder={t("Password")} />
                    </Form.Item>

                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{
                        offset: 1,
                      }}
                    >
                      <Checkbox>{t("Remmeber")}</Checkbox>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 1,
                      }}
                      labelCol={{
                        span: 20,
                      }}
                    >
                      <Button
                        loading={isLoading}
                        type="primary"
                        htmlType="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        {t("signIn")}
                      </Button>
                    </Form.Item>
                  </Form>
                  <p className="text-center">
                    {t("Member")}{" "}
                    <a data-toggle="tab" href="#signup">
                      {t("signIn")}
                    </a>
                  </p>
                </Layout>
              </div>
            </Layout>
          </Col>
        </Layout>
      </Layout>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => dispatch(loginRequestAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default compose(withConnect)(Login);
const Login = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
);
export default Login;
