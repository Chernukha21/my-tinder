import React from 'react';
import { auth } from '@/auth';
import ClientSession from '@/components/ClientSession';

const SessionInfoPage = async () => {
  const session = await auth();
  return (
    <div className="mt-20 flex flex-row justify-around gap-6">
      <div className="w-1/2 overflow-auto rounded-xl bg-green-50 p-10 shadow-md">
        <h3 className="text-2xl font-semibold">Server session data:</h3>
        {session ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
      <ClientSession />
    </div>
  );
};

export default SessionInfoPage;
