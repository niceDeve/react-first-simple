import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Avatar } from '../common';

import { listRecommenedUsers } from '../actions/userActions';

const Contributors = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userListRecommended);
  const { users } = userList;

  useEffect(() => {
    dispatch(listRecommenedUsers());
  }, [dispatch]);

  return (
    <div className="card">
      <div className="card__body">
        <h5>Top Contributors</h5>
        <Link to={'/search'}>View More</Link>
        <div className="custom-spacer"></div>

        {users.map((user) => (
          <div key={user.id} className="contributor-wrapper">
            <div className="contributor-preview">
              <Avatar src={user.profile.profile_pic} alt="img-description" />
              <Link to={`/profile/${user.username}`}>
                <strong>{user.profile.name}</strong>
              </Link>
            </div>
            <Link className="btn btn--main--outline btn--sm" to="">
              Follow
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
