import { Col, Form, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppSelector } from "../../redux/hooks";

const Booked = () => {
  const booked = useAppSelector((state) => state.booked);

  const columns: ColumnsType<BookedType> = [
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
      dataIndex: "from",
      key: "from",
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
            rowKey={(record) => record.key}
            className="w-[150px] md:w-[300px] lg:w-[1352px]"
            dataSource={booked}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Booked;
