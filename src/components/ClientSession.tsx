'use client';

import { useSession } from 'next-auth/react';

const ClientSession = () => {
  const session = useSession();

  return (
    <div className="w-1/2 overflow-auto rounded-xl bg-blue-50 p-10 shadow-md">
      <h3 className="text-2xl font-semibold">Client session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
};

export default ClientSession;
