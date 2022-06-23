import "./index.css";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getAllSystemServicesAction,
  asyncGetAllSystemServicesAction,
  asyncGetDetailSystemServices,
  asyncCreateSystemServices,
  asyncUpdateSystemServices,
  asyncDeleteSystemServices,
} from "./store/action";
import {
  selectSystemServices,
  selectLoadingSystemServices,
  selectDetailSystemServices,
} from "./store/selector";
import {
  Table,
  Space,
  Input,
  Button,
  Form,
  Drawer,
  Popconfirm,
  Radio,
  Upload,
  Row,
  Col,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { withTranslation } from "react-i18next";
// import { t } from "i18next";

const SystemServicesComponent = (props) => {
  const { t } = props;
  const { isLoadingSystemServices, listSystemServices } = props;
  const {
    systemServicesAction,
    detailSystemServiceAction,
    createSystemServiceAction,
    updateSystemServiceAction,
    deleteSystemServiceAction,
  } = props;
  const [data, setData] = useState();
  const [formModal] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [paginatios, setPaginatios] = useState({
    paging: { pageIndex: 1, pageSize: 0 },
  });
  const [sortMenu, setSortMenu] = useState({
    sorting: { field: "", order: "" },
  });
  const [paging, setPaging] = useState({});
  const [param] = useState({
    search: searchValue || "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: sortMenu.sorting.field,
      order: sortMenu.sorting.order,
    },
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await systemServicesAction(param);
      console.log(res);
      setData(res.result.data);
      setPaging(res.result.paging);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: t("STT"),
      width: "10px",
      render: (text, record, index) => {
        return (
          <span>
            {(paginatios.paging.pageIndex - 1) * paginatios.paging.pageSize +
              1 +
              index}
          </span>
        );
      },
    },
    {
      title: t("ServiceName"),
      dataIndex: "name",
      key: "name    ",
      render: (text, record) => (
        <Button style={{ border: "none" }} onClick={() => getDetail(record.id)}>
          {text}
        </Button>
      ),
      sorter: true,
      sortDirections: ["desc", "asc"],
    },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <div
          style={{
            color: "#fa8c16",
            background: "#fff7e6",
            borderColor: "#ffd591",
            border: "solid",
            textAlign: "center",
            width: 100,
            padding: 4,
          }}
        >
          {text}
        </div>
      ),
      sorter: true,
      sortDirections: ["desc", "asc"],
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        text === "ACTIVE" || "Active" ? (
          <div
            style={{
              color: "#1890f",
              background: "#e6f7ff",
              borderColor: "91d5ff",
              border: "solid",
              textAlign: "center",
              width: 100,
              padding: 4,
            }}
          >
            {text}
          </div>
        ) : (
          <div
            style={{
              color: "#fa8c16",
              background: "#fff7e6",
              borderColor: "#ffd591",
              border: "solid",
              textAlign: "center",
              width: 100,
              padding: 4,
            }}
          >
            {text}
          </div>
        ),
      sorter: true,
      sortDirections: ["desc", "asc"],
    },
    {
      title: t("Action"),
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <Space>
          <Popconfirm
            title={t("conform")}
            onConfirm={() => handleDelete(record.id)}
          >
            <button className="btn-delete">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = async (e) => {
    const res = await deleteSystemServiceAction(e);
    const resData = await systemServicesAction(param);
    console.log(resData);
    if (res.code === 200 && resData.code === 200) {
      console.log("complete !");
      setData(resData.result.data);
    }
  };

  const showDrawer = () => {
    setVisible(true);
    formModal.resetFields();
  };

  const onClose = () => {
    setVisible(false);
  };
  const getDetail = async (id) => {
    setVisible(true);
    const res = await detailSystemServiceAction(id);
    if (res) {
      formModal.setFieldsValue({
        id: res.id,
        name: res.name,
        type: res.type,
        status: res.status,
        contact: res.contact,
        description: res.description,
        phoneNumber: res.phoneNumber,
        email: res.email,
        // isQr: res.isQr,
        capicity: res.capicity,
        maxReorderDate: res.maxReorderDate,
        minReorderDate: res.minReorderDate,
        cancelReorderDate: res.cancelReorderDate,
      });
    }
  };
  const onSearch = async () => {
    const resData = await systemServicesAction({
      ...param,
      search: searchValue,
    });
    console.log(resData);
    if (resData.code === 200) {
      setData(resData.result.data);
    }
    setSearchValue("");
  };
  const onFinish = async (values) => {
    if (values.id === undefined) {
      const res = await createSystemServiceAction(values);
      const resData = await systemServicesAction(param);
      if (res.code === 200 && resData.code === 200) {
        setData(resData.result.data);
      } else {
        console.log("fail");
      }
    } else {
      const res = await updateSystemServiceAction(values);
      const resData = await systemServicesAction(param);
      if (res.code === 200 && resData.code === 200) {
        setData(resData.result.data);
      } else {
        console.log("fail");
      }
    }
    setVisible(false);
  };
  const onTableChange = async (pagination, filter, sorter) => {
    // sort
    const { field, order } = sorter;
    const sorting = { field, order };
    const paramsSort = { ...sortMenu, sorting };
    // phân trang
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current, pageSize };
    const params = { ...paginatios, paging };
    const resData = await systemServicesAction({ ...param, paging, sorting });
    console.log(resData);
    if (resData.code === 200) {
      setData(resData.result.data);
      setPaginatios(params);
      setSortMenu(paramsSort);
    }
  };
  const handleUpload = (e) => {
    // console.log(e.target.value);
    console.log(e);
  };
  return (
    <div className="system-services">
      <h2>System Services</h2>
      <div className="header-system-services">
        <div>
          <Form.Item name="search" className="left-system-services">
            <Input
              className="search-system-services"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              className="btn-system-services"
              onClick={onSearch}
              icon={<SearchOutlined />}
            ></Button>
          </Form.Item>
        </div>
        <div style={{ float: "right", position: "absolute", right: "40px" }}>
          <Button
            style={{ width: 200, height: 50 }}
            onClick={showDrawer}
            icon={<AppstoreAddOutlined />}
          >
            <span style={{ marginLeft: "10px" }}>{t("CreateService")}</span>
          </Button>
        </div>
      </div>
      <Table
        dataSource={data}
        loading={isLoadingSystemServices}
        columns={columns}
        className="tb-system-services"
        // pageIndex={paging.pageIndex}
        pagination={{
          pageIndex: paging.pageIndex,
          total: paging.total,
          pageSize: paging.pageSize,
        }}
        onChange={onTableChange}
      ></Table>
      <Drawer
        title={t("CreateService")}
        width={950}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>{t("Cancel")}</Button>
            <Button type="primary" htmlType="submit" form="formModal">
              {t("Submit")}
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={formModal}
          name="formModal"
          onFinish={onFinish}
        >
          <Form.Item name="id"></Form.Item>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="name" label={t("Name")}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label={t("Type")}>
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="contact" label={t("Contact")}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="description" label={t("Description")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="email" label={t("Email")}>
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phoneNumber" label={t("PhoneNumber")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="status" label={t("Status")}>
                <Radio.Group>
                  <Radio value="Active">{t("Active")}</Radio>
                  <Radio value="Passive">{t("Passive")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isQr" label={t("IsQR")}>
                <Radio.Group>
                  <Radio value={1}>{t("Yes")}</Radio>
                  <Radio value={0}>{t("No")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="capicity" label={t("Capicity")}>
                <InputNumber
                  className="ant-input"
                  style={{ width: "100%", border: "1px solid #d9d9d9" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cancelReorderDate"
                label={t("CancelReorderDate")}
              >
                <InputNumber
                  className="ant-input"
                  style={{ width: "100%", border: "1px solid #d9d9d9" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="minReorderDate" label={t("MinReorderDate")}>
                <InputNumber
                  className="ant-input"
                  style={{ width: "100%", border: "1px solid #d9d9d9" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxReorderDate" label={t("MaxReorderDate")}>
                <InputNumber
                  className="ant-input"
                  style={{ width: "100%", border: "1px solid #d9d9d9" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={24}>
              <Form.Item name="imageUrl" label={t("ImageUrl")}>
                <Input rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="drawer-create">
            <Col span={12}>
              <Form.Item name="rules" label={t("Information")}>
                <Upload onChange={handleUpload}>
                  <Button icon={<UploadOutlined />}>{t("Upload")}</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="rulesVN" label={t("InformationVn")}>
                <Upload>
                  <Button icon={<UploadOutlined />}>{t("Upload")}</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingSystemServices: selectLoadingSystemServices,
  listSystemServices: selectSystemServices,
  detailSystemServices: selectDetailSystemServices,
});

const mapDispatchToProps = (dispatch) => ({
  systemServicesAction: (payload) =>
    asyncGetAllSystemServicesAction(dispatch)(payload),
  createSystemServiceAction: (payload) =>
    asyncCreateSystemServices(dispatch)(payload),
  detailSystemServiceAction: (payload) =>
    asyncGetDetailSystemServices(dispatch)(payload),
  updateSystemServiceAction: (payload) =>
    asyncUpdateSystemServices(dispatch)(payload),
  deleteSystemServiceAction: (payload) =>
    asyncDeleteSystemServices(dispatch)(payload),
});

const SystemServices = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SystemServicesComponent)
);
export default SystemServices;
