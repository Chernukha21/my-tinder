import clsx from 'clsx';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { ActionResult } from '@/types';

type Props = {
  result: ActionResult<string> | null;
};

export default function ResultMessage({ result }: Props) {
  if (!result) return null;
  return (
    <div
      className={clsx('flex w-full items-center justify-center gap-x-2 rounded-xl p-3 text-sm', {
        'bg-danger-50 text-danger-800': result.status === 'error',
        'bg-success-50 text-success-800': result.status === 'success',
      })}
    >
      {result.status === 'success' ? (
        <FaCheckCircle size={20} />
      ) : (
        <FaExclamationTriangle size={20} />
      )}
      <p>{result.status === 'success' ? result.data : (result.error as string)}</p>
    </div>
  );
}
