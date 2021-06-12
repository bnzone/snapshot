import React from 'react';
import useUser from '../../hooks/useUser';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId }
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
