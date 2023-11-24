import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  autoSuggestValues,
  getAirportSuggestByCode,
} from "../../redux/slices/airportsSlice";
import { BaseSyntheticEvent } from "react";

type FormTypes = {
  from: string;
  to: string;
  leave: string;
  return: string;
};

const FlightSearch = () => {
  //const { useLazyFlightsListQuery } = flightsApi;

  //const [trigger, result] = useLazyFlightsListQuery();
  const airports = useAppSelector(autoSuggestValues);
  const dispatch = useAppDispatch();

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

  const handleOnFinish = (data: FormTypes) => {
    console.log("Osama = ", data);

    //console.log(data.from, data.to, data.leave.$y, data.return.$y);
    // trigger({
    //   from: data.from,
    //   to: data.to,
    //   leave: data.leave,
    // });
  };

  const handleFromAirportOnChange = (e: BaseSyntheticEvent) => {
    dispatch(getAirportSuggestByCode({ airportCode: e.currentTarget.value }));
  };

  return (
    <Form onFinish={handleOnFinish}>
      <Row justify={"center"} align={"middle"}>
        <Col className="mx-11">
          <Form.Item<FormTypes>
            name="from"
            rules={[{ required: true, message: "Please input from airport!" }]}
          >
            <AutoComplete options={airports}>
              <Input
                addonBefore="From"
                placeholder="E.g. San Francisco Intl, SFO"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-[632px]"
                onChange={handleFromAirportOnChange}
              />
            </AutoComplete>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FormTypes>
            name="to"
            rules={[{ required: true, message: "Please input to airport!" }]}
          >
            <AutoComplete options={airports}>
              <Input
                addonBefore="To"
                placeholder="E.g. Los Angeles Intl, LAX"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-[632px]"
                onChange={handleFromAirportOnChange}
              />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col className="mx-11">
          <Form.Item<FormTypes>
            name="leave"
            rules={[
              {
                required: true,
                type: "object",
                message: "Please input leave date!",
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker
              format="MM/DD/YYYY"
              size="large"
              className="w-[150px] md:w-[300px] lg:w-[632px]"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FormTypes>
            name="return"
            rules={[
              {
                required: true,
                type: "object",
                message: "Please input return date!",
              },
            ]}
            initialValue={dayjs().add(30, "days")}
          >
            <DatePicker
              format="MM/DD/YYYY"
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
