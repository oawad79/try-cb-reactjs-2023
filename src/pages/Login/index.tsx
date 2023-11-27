import {
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import Password from "antd/es/input/Password";

const Login = () => {
  const handleLogin = () => {};
  const { Title, Paragraph } = Typography;

  return (
    <Row className="w-[150px] md:w-[300px] lg:w-[1452px] bg-white align-middle justify-center py-7">
      <Col>
        <Form onFinish={handleLogin}>
          <Space direction="vertical">
            <Form.Item>
              <Input
                addonBefore="Username"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-[500px]"
              />
            </Form.Item>
            <Form.Item>
              <Password
                addonBefore="Password"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-[500px]"
              />
            </Form.Item>
            <Flex vertical={false} align="center" justify="space-between">
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="w-60"
                  htmlType="submit"
                >
                  Log In
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  size="large"
                  className="w-60"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Flex>
          </Space>
        </Form>
      </Col>
      <Col>
        <Typography>
          <Space direction="horizontal" style={{ marginLeft: 80 }}>
            <Title>CBTravel</Title>
            <Image src="/CBTravel.LOGO.png" />
          </Space>
          <Paragraph style={{ width: 600, marginLeft: 80 }}>
            This is a sample app to demonstrate some of the things Couchbase can
            do. Create an account, book flights and search hotels while the app
            displays what's going on behind the scenes. You can find
            documentation for this app at the appropriate page for your
            preferred SDK
          </Paragraph>
        </Typography>
      </Col>
    </Row>
  );
};

export default Login;
