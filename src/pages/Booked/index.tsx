import { Col, Form, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Booked {
  name: string;
  flight: string;
  date: string;
  flightPath: string;
  actions: string;
}

const Booked = () => {
  const columns: ColumnsType<Booked> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 150,
    },
    {
      title: "Flight",
      dataIndex: "flight",
      key: "flight",
      fixed: "left",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      fixed: "left",
      width: 100,
    },
    {
      title: "Flight Path",
      dataIndex: "flightPath",
      key: "flightPath",
      fixed: "left",
      width: 150,
    },
  ];

  return (
    <Form>
      <Row justify={"center"} align={"middle"}>
        <Col className="w-full">
          <Table
            columns={columns}
            rowKey={(record) => record.name}
            className="w-[150px] md:w-[300px] lg:w-[1352px]"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Booked;