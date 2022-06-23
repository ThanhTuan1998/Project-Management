import "./index.css";
import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllDashBoardAction } from "./store/action";
import { selectDashBoard, selectLoadingDashBoard } from "./store/selector";
import { Card, List, Avatar } from "antd";
import { t } from "i18next";

const AdminHome = (props) => {
  const { isLoadingDashBoard, listDashBoard } = props;
  const { dashBoardAction } = props;
  useEffect(() => {
    dashBoardAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div style={{ display: "flex", margin: "10px" }}>
        <Card
          title="Unreplied Bookings"
          bordered={false}
          style={{
            width: 800,
            margin: "10px 20px",
          }}
          loading={isLoadingDashBoard}
        >
          <p style={{ display: "flex" }}>
            Total bookings:
            <span>{listDashBoard.bookingTotal}</span>
          </p>
        </Card>
        <Card
          title="Unreplied Feedbacks"
          bordered={false}
          style={{
            width: 800,
            margin: "10px 20px",
          }}
          loading={isLoadingDashBoard}
        >
          <p>{listDashBoard.feedbackRemand}</p>
          <p style={{ display: "flex", textAlign: "end" }}>
            Total Feedbacks: <span>{listDashBoard.feedbackTotal}</span>
          </p>
        </Card>
        <Card
          title="Unreplied Forms"
          bordered={false}
          style={{
            width: 800,
            margin: "10px 20px",
          }}
          loading={isLoadingDashBoard}
        >
          <p>
            Total forms: <span>{listDashBoard.formTotal}</span>
          </p>
        </Card>
      </div>
      <Card
        title="New feedbacks"
        bordered={false}
        style={{
          width: "100%",
          margin: "10px 30px",
        }}
        loading={isLoadingDashBoard}
      >
        <List
          itemLayout="horizontal"
          dataSource={listDashBoard.feedbacks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <a href="https://ant.design" style={{ fontWeight: "bold" }}>
                    {item.title}
                  </a>
                }
                description={item.createdBy}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingDashBoard: selectLoadingDashBoard,
  listDashBoard: selectDashBoard,
});

const mapDispatchToProps = (dispatch) => ({
  dashBoardAction: (payload) => dispatch(getAllDashBoardAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(AdminHome);
