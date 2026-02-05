import { Button } from '@heroui/button';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';

const SocialLogin = () => {
  const onclickHandler = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: '/members',
    });
  };
  return (
    <div className="flex w-full items-center gap-2">
      <Button size="lg" fullWidth variant="bordered" onPress={() => onclickHandler('google')}>
        <FaGoogle size={20} />
      </Button>
      <Button size="lg" fullWidth variant="bordered" onPress={() => onclickHandler('github')}>
        <FaGithub size={20} />
      </Button>
    </div>
  );
};

export default SocialLogin;
