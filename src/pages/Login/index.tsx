import {
  Alert,
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
import loginApi from "../../services/LoginService";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const Login = () => {
  const [signup] = loginApi.useSignupMutation();
  const [login] = loginApi.useLazyLoginQuery();

  const navigate = useNavigate();
  const [error, setError] = useState<{
    data: {
      error: string;
    };
  } | null>();
  const [form] = useForm();

  const handleRegister = () => {
    form.validateFields().then(() => {
      signup({
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
        tenant: "tenant_agent_00",
      })
        .unwrap()
        .then(() => {
          setError(null);
          navigate("/flights");
        })
        .catch((error) => {
          setError(error);
        });
    });
    // .catch((error) => {
    //   console.log("e = ", error.errorFields);
    // });
  };

  const handleLogin = (data: LoginType) => {
    login({
      username: data.username,
      password: data.password,
      tenant: "tenant_agent_00",
    })
      .unwrap()
      .then(() => {
        setError(null);
        navigate("/flights");
      })
      .catch(
        (error: {
          data: {
            error: string;
          };
        }) => {
          setError(error);
        }
      );
  };

  const { Title, Paragraph } = Typography;

  return (
    <Row className="w-[150px] md:w-[300px] lg:w-[1452px] bg-white align-middle justify-center py-7">
      <Col>
        <Form onFinish={handleLogin} form={form}>
          <Space direction="vertical">
            <Form.Item<LoginType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                addonBefore="Username"
                size="large"
                className="w-[150px] md:w-[300px] lg:w-[500px]"
              />
            </Form.Item>
            <Form.Item<LoginType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
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
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Form.Item>
            </Flex>
            {error && (
              <Alert
                showIcon={true}
                description={error.data.error}
                type="error"
                closable
              />
            )}
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
