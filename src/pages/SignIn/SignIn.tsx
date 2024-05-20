import { Card, Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthCookie } from '../../modules/auth/auth.hooks';
import { SignInForm } from './components/SignInForm/SignInForm';

const { Text } = Typography;

const SignIn = () => {
  const { state } = useLocation();
  const { removeCookie } = useAuthCookie();

  useEffect(() => {
    if (state?.signOut) {
      removeCookie();
    }
  }, [state?.signOut, removeCookie]);

  return (
    <Flex justify="center" align="center" className="flex-1 overflow-auto h-screen bg-slate-200">
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
