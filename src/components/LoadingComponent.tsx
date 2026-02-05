import { Spinner } from '@heroui/spinner';

const LoadingComponent = () => {
  return (
    <div className="vertical-center flex items-center justify-center">
      <Spinner className="px-4 py-2 text-transparent" label="loading" variant="gradient" />
    </div>
  );
};

export default LoadingComponent;
