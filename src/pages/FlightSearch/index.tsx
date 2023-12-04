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
import { getAirportSuggestByCode } from "../../redux/slices/airportsSlice";
import { BaseSyntheticEvent } from "react";
import {
  getFlightsByFromByToByTime,
  outFlightsForUI,
  returnFlightsForUI,
} from "../../redux/slices/flightsSlice";
import uniqid from "uniqid";
import { Flight } from "../../types/flight";
import { addToCart } from "../../redux/slices/cartSlice";
import { useForm } from "antd/es/form/Form";

type FormTypes = {
  from: string;
  to: string;
  leave: string;
  return: string;
};

const FlightSearch = () => {
  //I can use a custom selector to transform the state
  //however, I used the RTK Query transform response instead
  //const airports = useAppSelector(autoSuggestValues);

  const airports = useAppSelector((state) => state.airports);
  //const outFlights = useAppSelector((state) => state.outFlights);
  const outFlights = useAppSelector(outFlightsForUI);
  const returnFlights = useAppSelector(returnFlightsForUI);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const handleOnAddToCart = (record: Flight): void => {
    dispatch(
      addToCart({
        flight: {
          ...record,
          from: form.getFieldValue("leave").format("MM/DD/YYYY"),
          to: form.getFieldValue("return").format("MM/DD/YYYY"),
        },
      })
    );
  };

  const isLoggedIn = () => {
    return auth.token && auth.token.length > 0;
  };

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
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleOnAddToCart(record)}
          disabled={!isLoggedIn() || record.added}
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  const handleOnFinish = async (params: FormTypes) => {
    dispatch(
      getFlightsByFromByToByTime({
        from: params.from,
        to: params.to,
        leave: dayjs(params.leave).format("MM/DD/YYYY"),
        return: dayjs(params.return).format("MM/DD/YYYY"),
      })
    );
  };

  const handleFromAirportOnChange = (e: BaseSyntheticEvent) => {
    dispatch(getAirportSuggestByCode({ airportCode: e.currentTarget.value }));
  };

  return (
    <Form onFinish={handleOnFinish} form={form}>
      <Row justify={"center"} align={"middle"}>
        <Col className="mx-11">
          <Form.Item<FormTypes>
            name="from"
            rules={[{ required: true, message: "Please input from airport!" }]}
          >
            <AutoComplete options={airports} style={{ width: 632 }}>
              <Input
                addonBefore="From"
                placeholder="E.g. San Francisco Intl, SFO"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-fit"
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
            <AutoComplete options={airports} style={{ width: 632 }}>
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
            key={uniqid()}
            dataSource={outFlights}
          />
        </Col>
      </Row>
      <Row>
        <Col className="w-full">
          <Table
            title={() => <div className="text-xl">Returning Flights</div>}
            columns={columns}
            key={uniqid()}
            dataSource={returnFlights}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default FlightSearch;
