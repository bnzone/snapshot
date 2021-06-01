import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed('true');

    // firebase :  create 2 services
    // update the following array of the logged on user
    // update the followers array of the user who has been followed
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}'s avatar`}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={() => handleFollowUser()}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};
