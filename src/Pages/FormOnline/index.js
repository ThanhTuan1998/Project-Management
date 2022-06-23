import "./index.css";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getAllFormOnlineAction,
  getDetailFormOnlineAction,
} from "./store/action";
import {
  selectFormOnline,
  selectLoadingFormOnline,
  selectFormOnlineDetail,
} from "./store/selector";
import {
  Table,
  Space,
  Popconfirm,
  Tabs,
  Input,
  Button,
  Form,
  DatePicker,
  Drawer,
  Collapse,
  Dropdown,
  Menu,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  DownOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import { withTranslation } from "react-i18next";

const FormOnlineComponent = (props) => {
  const { t } = props;
  const { isLoadingFormOnline, listFormOnline, listFormOnlineDetail } = props;
  const { formOnlineAction, formOnlineDetailAction } = props;
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [paginatios, setPaginatios] = useState({
    paging: { pageIndex: 0, pageSize: 10 },
  });
  const [param] = useState({
    search: searchValue || "",
    startAt: null,
    endAt: null,
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
    type: "",
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    formOnlineAction({ ...param, type: "All" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: t("STT"),
      width: "10px",
      render: (text, record, index) => {
        return (
          <span>
            {paginatios.paging.pageIndex * paginatios.paging.pageSize +
              1 +
              index}
          </span>
        );
      },
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Button style={{ border: "none" }} onClick={() => getDetail(record.id)}>
          {text}
        </Button>
      ),
      sorter: (a, b) => a.title - b.title,
      sortDirections: ["ascend" | "descend"],
    },
    {
      title: t("FormType"),
      dataIndex: "formType",
      key: "content",
      render: (text, record) => (
        <div
          style={{
            color: "#fa8c16",
            background: "#fff7e6",
            borderColor: "#ffd591",
            border: "solid",
            width: 70,
            padding: 4,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        text === "WaitingForApproved" ? (
          <div
            style={{
              color: "#fa8c16",
              background: "#fff7e6",
              borderColor: "#ffd591",
              border: "solid",
              width: 180,
              padding: 4,
            }}
          >
            {text}
          </div>
        ) : (
          <div
            style={{
              color: "#52c41a",
              background: "#f6ffed",
              borderColor: "#b7eb8f",
              border: "solid",
              width: 100,
              padding: 4,
            }}
          >
            {text}
          </div>
        ),
    },
    {
      title: t("CreateBy"),
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: t("CreateAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: t("Action"),
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <Space>
          <Popconfirm
            title="Are you sure？"
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
  const columnsDetail = [
    { title: "Id" },
    { title: "Name" },
    { title: "Quantity/Amount" },
    { title: "Reason/Note" },
  ];
  const onSort = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getDetail = (e) => {
    formOnlineDetailAction(e);
    showDrawer();
  };
  const handleDelete = () => {};
  const onChange = (e) => {
    formOnlineAction({ ...param, type: e });
  };
  const onSearch = () => {
    formOnlineAction({ ...param, search: searchValue });
    setSearchValue("");
  };
  const reject = () => {
    setIsModalVisible(true);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Approve
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={reject}>
              Reject
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <div className="form-online">
      <h2>{t("OnlineFormManagement")}</h2>
      <div className="header-form-online">
        <Form.Item name="search" className="left-form-online">
          <Input
            className="search-form-online"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className="btn-form-online" onClick={onSearch}>
            <SearchOutlined />
          </Button>
        </Form.Item>
        <Space direction="vertical" size={12} className="date-form-online">
          <lable>
            <span style={{ margin: "10px", textAlign: "center" }}>
              {t("Filter")}:{" "}
            </span>
            <RangePicker picker="week" style={{ width: "100%" }} />
          </lable>
        </Space>
      </div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab={t("All")} key="All"></TabPane>
        <TabPane tab={t("Work")} key="Fixing"></TabPane>
        <TabPane tab={t("MoveIn")} key="MoveIn"></TabPane>
        <TabPane tab={t("MoveOut")} key="MoveOut"></TabPane>
        <TabPane tab={t("WorkOrder")} key="WorkOrder"></TabPane>
      </Tabs>
      <Table
        dataSource={listFormOnline}
        loading={isLoadingFormOnline}
        columns={columns}
        className="tb-form-online"
        onChange={onSort}
      ></Table>
      <Modal
        title="Input reason"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea rows={4} />
      </Modal>
      <Drawer
        title={`EQUIPMENT/GOODS MOVING APPLICATION FORM - ${listFormOnlineDetail.title}`}
        placement="right"
        onClose={onClose}
        visible={visible}
        width={950}
        extra={
          <div
            style={{
              float: "right",
              border: "1px solid #1890ff",
              padding: "0 10px",
              background: "#1890ff",
              color: "orange",
            }}
          >
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Action
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        }
      >
        <h6
          style={{
            backgroundColor: "#e6f7ff",
            border: "1px solid #91d5ff",
            padding: "10px",
          }}
        >
          <ExclamationOutlined
            style={{
              width: "200px",
              backgroundColor: "#1890ff",
              borderRadius: "100px",
            }}
          />{" "}
          Informational Notes
        </h6>
        <Collapse defaultActiveKey={["1", "2", "3", "4", "5"]}>
          <Panel header="Personal Information" key="1">
            <p>
              Name of Owner(s):<span></span>
            </p>
            <p>
              Apartment No. / Working area:<span></span>
            </p>
            <p>
              Mobile No:<span></span>
            </p>
            <p>
              Email:<span></span>
            </p>
            <p>
              Form Created by:
              <span style={{ fontWeight: "bold" }}>
                {listFormOnlineDetail.createdBy}
              </span>
            </p>
            <p>
              Form Created at:
              <span style={{ fontWeight: "bold" }}>
                {listFormOnlineDetail.createdAt}
              </span>
            </p>
          </Panel>
          <Panel header="Moving Company Information" key="2">
            <p>
              Moving company:<span></span>
            </p>
            <p>
              Address:<span></span>
            </p>
          </Panel>
          <Panel header="Supervisor Information" key="3">
            <p>
              Contact person / Supervisor:<span></span>
            </p>
            <p>
              Mobile No:<span></span>
            </p>
          </Panel>
          <Panel header="Estimated Time" key="4">
            <p>
              From:<span></span>
            </p>
            <p>
              To:<span></span>
            </p>
          </Panel>
          <Panel header="Properties" key="5">
            <Table columns={columnsDetail}></Table>
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingFormOnline: selectLoadingFormOnline,
  listFormOnline: selectFormOnline,
  listFormOnlineDetail: selectFormOnlineDetail,
});

const mapDispatchToProps = (dispatch) => ({
  formOnlineAction: (payload) => dispatch(getAllFormOnlineAction(payload)),
  formOnlineDetailAction: (payload) =>
    dispatch(getDetailFormOnlineAction(payload)),
});

const FormOnline = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FormOnlineComponent)
);
export default FormOnline;
