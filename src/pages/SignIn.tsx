import { Card, Flex, Typography } from "antd";
import { SignInForm } from "../components/SignInForm";

const { Text } = Typography;

const SignIn = () => {
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
