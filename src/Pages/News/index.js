import React, { useEffect, useState } from "react";
import "../News/index.css";
import {
  selectLoading,
  selectNews,
  selectDetailContent,
} from "../News/store/selector";
import { compose } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import {
  Image,
  Table,
  Button,
  Input,
  Form,
  Modal,
  Select,
  notification,
  Space,
  Popconfirm,
  Upload,
} from "antd";
import {
  SearchOutlined,
  CheckOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getAllNews, getDetailNews } from "../News/store/actions";
import { withTranslation } from "react-i18next";
const { Search } = Input;
const { Option } = Select;
// import Header from '../../common/Header'
const NewsComponet = (props) => {
  // data
  const { listNews, isLoading } = props;
  const { t } = props;
  // Action dispatch
  const { showListNews, showListDetailNews } = props;

  // Edit
  const openModelEdit = async (id) => {
    setcheckTitle(false);
    setIsModalVisible(true);
    const res = await showListDetailNews(id);
    console.log(res + "edit");
    if (res) {
      formModal.setFieldsValue({
        Image: res.image,
        title: res.title,
        tag: res.tag,
        description: res.description,
      });
    }
  };

  // Columns of table
  const columns = [
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <label
          style={{ border: "none", color: "#1890ff" }}
          onClick={() => openModelEdit(record.id)}
        >
          {text}
        </label>
      ),
    },
    {
      title: t("Image"),
      dataIndex: "imageUrl",
      key: "imageUrl",
      className: "img-News",
      render: (text, record) => (
        <Image src={`data:imageUrl/jpeg;base64,${text}`} />
      ),

      // Img là base 64
    },
    {
      title: t("Tags"),
      dataIndex: "tag",
      key: "tag",
      render: (text, record) => (
        <div>{text}</div>
        // <div>{text.length > 0 ? text.slice(0, 20) + "..." : "Empty"}</div>
      ),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div>{text.length > 0 ? text.slice(0, 20) + "..." : "Empty"}</div>
      ),
    },
    {
      title: t("CreateAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      // render: (text, record) => (
      //     <div>{text.length > 5 ? text.slice(0, 20) + "..." : "Empty"}</div>
      // ),
    },
    {
      title: t("CreateBy"),
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <>
          <Space>
            <Popconfirm
              title="Bạn chắc chắn xóa chứ?"
              // onConfirm={() => handleDelete(record.id)}
            >
              <Button className="btn-delete">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  // Search
  const [searchValue, setSearchValue] = useState("");
  // upload
  const upload = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
  };
  // params
  const [params] = useState({
    search: searchValue || "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
  });
  useEffect(() => {
    showListNews(params);
  }, []);

  // Ẩn hiện Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  // Form Hook
  const [formModal] = Form.useForm();
  // Check label title: Create or Edit
  const [checkTitle, setcheckTitle] = useState(true);

  // // Get Detail
  // const getDetail = (id) => {
  //     getDetailNews(id);
  //     showDrawer();
  // };
  // const showDrawer = () => {
  //     setVisible(true);
  // };
  // const onClose = () => {
  //     setVisible(false);
  // };

  // OPEN Modal Create
  const showModal = () => {
    setcheckTitle(true);
    setIsModalVisible(true);
    formModal.resetFields();
  };
  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    showListNews();
  };
  //SUBMIT FAIL
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onSearch = () => {
    showListNews({ ...params, search: searchValue });
    setSearchValue("");
    // if (searchValue === null) {
    //     showListNews({ ...params, search: "" });
    // }
  };
  return (
    <>
      <div className="style-button">
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
        <Button
          type="primary"
          style={{ margin: "-20px 54px 24px 0px" }}
          onClick={showModal}
        >
          <span className="create-new">{t("Create")}</span>
        </Button>
      </div>
      <div className="table-books">
        <Table dataSource={listNews} columns={columns} loading={isLoading} />
      </div>
      {/* Modal for EDIT OR CREATE CONTENT */}
      <Modal
        title={checkTitle ? "Create user" : "Edit user"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            {checkTitle ? t("Create") : t("Edit")}
          </Button>
        }
      >
        <Form
          form={formModal}
          name="formModal"
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={t("Image")} name="imageUrl">
            <Upload {...upload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Form.Item
              label="Title"
              name="title"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Input your title!",
                },
                {
                  min: 1,
                  max: 50,
                  message: "More than 5 and less than 50 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={t("Title")}
            name="title"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Input your title!",
              },
              {
                min: 1,
                max: 50,
                message: "More than 5 and less than 50 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Tags")}
            name="tag"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your content",
                max: 255,
                message: "MAX 255 character",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={t("Content")} name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Drawer
            <Drawer
                //   title={`EQUIPMENT/GOODS MOVING APPLICATION FORM - ${listBookingServicesDetail.title}`}
                placement="right"
                onClose={onClose}
                visible={visible}
                width={950}
            >
                <h2>hihi</h2>
            </Drawer> */}
    </>
  );
};
// DATA STATE
const mapStateToProps = createStructuredSelector({
  listNews: selectNews,
  isLoading: selectLoading,
  detailContent: selectDetailContent,
});

//ACTION DISPATCH
const mapDispatchToProps = (dispatch) => ({
  showListNews: (payload) => dispatch(getAllNews(payload)),
  showListDetailNews: (payload) => dispatch(getDetailNews(payload)),
});

const News = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NewsComponet)
);
export default News;
