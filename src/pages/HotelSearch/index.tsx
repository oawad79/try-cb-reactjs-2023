import { Row, Col, Input, Button, Table, Divider, Form } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getHotelsRequest } from "../../redux/slices/hotelsSlice";

type FormTypes = {
  search: string;
  optional?: string;
};

const HotelSearch = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotels);

  const columns: ColumnsType<Hotel> = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      fixed: "left",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      fixed: "left",
      width: 300,
    },
  ];

  const handleOnClick = (data: FormTypes): void => {
    dispatch(
      getHotelsRequest({ location: data.search, optional: data.optional })
    );
  };

  return (
    <Form
      onFinish={handleOnClick}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Row>
        <Col className="mx-11">
          <Form.Item<FormTypes>
            name="search"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              addonBefore="Location"
              placeholder="Search for location"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[500px]"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FormTypes> name="optional">
            <Input
              addonBefore="Search Term"
              placeholder="(Optional)"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[500px]"
            />
          </Form.Item>
        </Col>
        <Col className="mx-11">
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="w-44"
              htmlType="submit"
            >
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Divider className="mx-11" />
      <Row justify={"center"} align={"middle"}>
        <Col className="w-full">
          <Table
            columns={columns}
            dataSource={hotels}
            rowKey={(record) => record.name}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default HotelSearch;
