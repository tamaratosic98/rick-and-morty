import { CloseOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
} from "antd";
import { addMinutes } from "date-fns";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import { AUTH_COOKIE_DURATION, AUTH_COOKIE_KEY } from "../../utils/constants";

const DUMMY_USERS = [
  { username: "admin", password: "admin", auth_token: "admin" },
  { username: "user", password: "user", auth_token: "user" },
  { username: "x", password: "x", auth_token: "x" },
];

export const SignInForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, setCookie] = useCookies([AUTH_COOKIE_KEY]);

  const onFinish: FormProps<User>["onFinish"] = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    setIsLoading(true);

    const user = DUMMY_USERS.find(
      (u) => u.password === password && u.username === username
    );

    if (user) {
      setErrorMessage(null);
      setCookie(AUTH_COOKIE_KEY, user.auth_token, {
        expires: addMinutes(Date.now(), AUTH_COOKIE_DURATION),
      });
      navigate({ pathname: "/" });
    } else {
      setErrorMessage("Incorect username or password");
    }

    setIsLoading(false);
  };

  return (
    <>
      {errorMessage && (
        <Flex
          className="bg-red-100 w-full py-3 rounded-md"
          justify="space-around"
          align="center"
        >
          <Typography.Text type="danger" className="text-sm">
            {errorMessage}
          </Typography.Text>
          <CloseOutlined
            className="cursor-pointer text-red-500"
            onClick={() => setErrorMessage(null)}
            data-testid="close-error-message"
          />
        </Flex>
      )}
      <Form
        name="basic"
        style={{ minWidth: 300, maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        size="large"
      >
        <Form.Item<User>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Username"
            data-testid="username-input"
          />
        </Form.Item>

        <Form.Item<User>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="text-gray-400" />}
            type="password"
            placeholder="Password"
            data-testid="password-input"
          />
        </Form.Item>

        {/*TODO: Handle remember me feature*/}
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            block
            data-testid="submit-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
