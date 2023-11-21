import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";

const FlightSearch = () => {
  const columns: ColumnsType<Flight> = [
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
      width: 50,
    },
    {
      title: "Utc",
      dataIndex: "utc",
      key: "utc",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      fixed: "left",
      width: 50,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "left",
      width: 100,
    },
  ];

  return (
    <Form>
      <Row justify={"center"} align={"middle"}>
        <Col className="mx-11">
          <Form.Item>
            <Input
              addonBefore="From"
              placeholder="E.g. San Francisco Intl, SFO"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[632px]"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Input
              addonBefore="To"
              placeholder="E.g. Los Angeles Intl, LAX"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[632px]"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col className="mx-11">
          <Form.Item>
            <DatePicker
              format="MM/DD/YYYY"
              placeholder="mm/dd/yyyy"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[632px]"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <DatePicker
              format="MM/DD/YYYY"
              placeholder="mm/dd/yyyy"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[632px]"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>You must log in to be able to book flights!</Col>
        <Col span={22} offset={21}>
          <Button
            type="primary"
            size="middle"
            className="w-44"
            htmlType="submit"
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="w-full">
          <Table
            title={() => <div className="text-xl">Outbound Flights</div>}
            columns={columns}
            rowKey={(record) => record.name}
          />
        </Col>
      </Row>
      <Row>
        <Col className="w-full">
          <Table
            title={() => <div className="text-xl">Returning Flights</div>}
            columns={columns}
            rowKey={(record) => record.name}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default FlightSearch;
