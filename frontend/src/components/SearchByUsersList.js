import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoundShape, TextBlock } from 'react-placeholder/lib/placeholders';
import { Link, useLocation } from 'react-router-dom';
import { listUsers } from '../actions/userActions';

import '../styles/components/SearchBox.css';

const SearchByUsersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.search;
  const userList = useSelector((state) => state.userList);
  const { users, loading } = userList;

  useEffect(() => {
    dispatch(listUsers(keyword));
  }, [dispatch, keyword]);

  if (loading) {
    return [0, 1, 2, 3].map((key) => <SearchByUsersListPlaceholder key={key} />);
  }

  return (
    <div className="category-wrapper" id="category-users">
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={index} className="card">
              <div className="card__body">
                <Link to={`/profile/${user.username}`} className="searchitem__link ">
                  <div className="searchitem__wrapper--1">
                    <img alt="" className="avatar avatar--md" src={user.profile.profile_pic} />
                    <div className="searchitem__info">
                      <div className="searchitem__info--top">
                        <div className="searchitem__info--top-text">
                          <strong>{user.profile.name}&nbsp;</strong>
                          <small>@{user.username}</small>
                        </div>
                        <button className="btn btn--main--outline btn--sm">Follow</button>
                      </div>
                      <p>{user.profile.bio}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div>
          <h5>No Results found...</h5>
        </div>
      ) : null}
    </div>
  );
};

export default SearchByUsersList;

const SearchByUsersListPlaceholder = () => {
  return (
    <div className="card">
      <div className="card__body">
        <div className="searchitem__wrapper--1">
          <RoundShape color="#c5c5c5" style={{ width: 70, height: 70 }} />
          <div className="searchitem__info">
            <div className="searchitem__info--top">
              <div className="searchitem__info--top-text">
                <TextBlock rows={1} color="#c5c5c5" style={{ width: 100 }} />
                <TextBlock rows={1} color="#c5c5c5" style={{ width: 100 }} />
              </div>
            </div>
            <TextBlock rows={2} color="#c5c5c5" style={{ width: 200 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
