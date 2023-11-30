import { Button, Col, Form, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import uniqid from "uniqid";
import { useAppSelector } from "../../redux/hooks";

const Cart = () => {
  const cart = useAppSelector<Cart[]>((state) => state.cart);

  const columns: ColumnsType<Cart> = [
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
      width: 50,
    },
    {
      title: "Flight Path",
      dataIndex: "flightPath",
      key: "flightPath",
      fixed: "left",
      width: 100,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "left",
      width: 100,
      render: () => {
        return (
          <>
            <Button type="primary" className="mx-5">
              Buy
            </Button>
            <a>Delete</a>
          </>
        );
      },
    },
  ];

  return (
    <Form>
      <Row justify={"center"} align={"middle"}>
        <Col className="w-full">
          <Table
            columns={columns}
            rowKey={uniqid()}
            key={uniqid()}
            className="w-[150px] md:w-[300px] lg:w-[1352px]"
            dataSource={cart}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Cart;
