import { Pie } from "@ant-design/plots";
import { Col, Row } from "antd";

const Sales = () => {
  const config = {
    title: "Sales per year",
    data: [
      { type: "A", value: 27 },
      { type: "B", value: 25 },
      { type: "C", value: 18 },
      { type: "D", value: 15 },
      { type: "E", value: 10 },
      { type: "F", value: 5 },
    ],
    angleField: "value",
    with: 800,
    height: 800,
    colorField: "type",
    paddingRight: 80,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: true,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <Row className="w-[150px] md:w-[300px] lg:w-[1350px]">
      <Col>
        <Pie {...config} />
      </Col>
    </Row>
  );
};

export default Sales;
