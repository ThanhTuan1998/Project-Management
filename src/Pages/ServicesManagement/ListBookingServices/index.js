import "./index.css";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getAllBookingServicesAction,
  getDetailBookingServicesAction,
} from "./store/action";
import {
  selectBookingServices,
  selectLoadingBookingServices,
  selectBookingServicesDetail,
} from "./store/selector";
import {
  Table,
  Space,
  Input,
  Button,
  Form,
  Drawer,
  Collapse,
  DatePicker,
} from "antd";
import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import { withTranslation } from "react-i18next";
// import { t } from "i18next";

const BookingServicesComponent = (props) => {
  const { t } = props;
  const {
    isLoadingBookingServices,
    listBookingServices,
    listBookingServicesDetail,
  } = props;
  const { bookingServicesAction, detailBookingServicesAction } = props;
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
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
      field: "chooseDate",
      order: "desc",
    },
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    bookingServicesAction(param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: t("ServiceName"),
      dataIndex: "serviceName",
      key: "serviceName",
      render: (text, record) => (
        <Button style={{ border: "none" }} onClick={() => getDetail(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        text === "REJECTED" ? (
          <div
            style={{
              color: "#fa8c16",
              background: "#fff7e6",
              borderColor: "#ffd591",
              border: "solid",
              width: 134,
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
              width: 134,
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
      title: t("BookingDate"),
      dataIndex: "chooseDate",
      key: "chooseDate",
    },
    {
      title: t("BookingTime"),
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
  ];
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const getDetail = (e) => {
    detailBookingServicesAction(e);
    showDrawer();
  };
  const onSearch = () => {
    bookingServicesAction({ ...param, search: searchValue });
    setSearchValue("");
  };
  const download = () => {
    const excel = new Excel();
    excel
      .addSheet("Excel")
      .addColumns(columns)
      .addDataSource(listBookingServices, {
        str2Percent: true,
      })
      .saveAs("Booking Services.xlsx");
  };
  return (
    <div className="booking-services">
      <h2>{t("BookingServices")}</h2>
      <div className="header-booking-services">
        <Form.Item name="search" className="left-booking-services">
          <Input
            className="search-booking-services"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            className="btn-booking-services"
            onClick={onSearch}
            icon={<SearchOutlined />}
          />
        </Form.Item>
        <Space direction="vertical" size={12} className="date-booking-services">
          <lable>
            <span style={{ margin: "18px 0", textAlign: "center" }}>
              {t("Filter")}:{" "}
            </span>{" "}
            <RangePicker picker="week" style={{ width: "100%" }} />
          </lable>
        </Space>
      </div>
      <Button
        onClick={download}
        icon={<VerticalAlignBottomOutlined />}
        style={{
          width: "200px",
          height: "50px",
          backgroundColor: "#1c931d",
          color: "orange",
        }}
      >
        Excel
      </Button>
      <Table
        dataSource={listBookingServices}
        loading={isLoadingBookingServices}
        columns={columns}
        className="tb-booking-services"
      ></Table>
      <Drawer
        //   title={`EQUIPMENT/GOODS MOVING APPLICATION FORM - ${listBookingServicesDetail.title}`}
        placement="right"
        onClose={onClose}
        visible={visible}
        width={950}
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={t("BookingServices")} key="1">
            <h4>{listBookingServicesDetail.serviceName}</h4>
            <p>
              Mobile No:<span></span>
            </p>
            <p>
              Email:<span></span>
            </p>
            <p>
              Status:
              <span style={{ fontWeight: "bold" }}>
                {listBookingServicesDetail.status}
              </span>
            </p>
            <p>
              Created by:
              <span style={{ fontWeight: "bold" }}>
                {listBookingServicesDetail.createdBy}
              </span>
            </p>
            <p>
              Created at:
              <span style={{ fontWeight: "bold" }}>
                {listBookingServicesDetail.createdAt}
              </span>
            </p>
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingBookingServices: selectLoadingBookingServices,
  listBookingServices: selectBookingServices,
  listBookingServicesDetail: selectBookingServicesDetail,
});

const mapDispatchToProps = (dispatch) => ({
  bookingServicesAction: (payload) =>
    dispatch(getAllBookingServicesAction(payload)),
  detailBookingServicesAction: (payload) =>
    dispatch(getDetailBookingServicesAction(payload)),
});

const BookingServices = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(BookingServicesComponent)
);
export default BookingServices;
