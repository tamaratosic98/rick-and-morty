import { Card, Flex, Typography } from "antd";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { SignInForm } from "../components/SignInForm";
import { AUTH_COOKIE_KEY } from "../utils/constants";

const { Text } = Typography;

const SignIn = () => {
  let { state } = useLocation();
  const [, , removeCookie] = useCookies([AUTH_COOKIE_KEY]);

  useEffect(() => {
    if (state?.signOut) {
      removeCookie(AUTH_COOKIE_KEY);
    }
  });

  return (
    <Flex justify="center" align="center" className="h-screen bg-slate-200">
      <Card>
        <Flex justify="center" align="center" vertical gap="large">
          <Flex vertical justify="center" align="center">
            <Text>
              <Text type="secondary" className="text-lg">
                Welcome back!
              </Text>
              👋🏼
            </Text>

            <Text className="text-xl font-bold">Login to your account</Text>
          </Flex>

          <SignInForm />
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignIn;
