import React, { useState, useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/components/Profile.css';

//Components
import Feed from '../components/Feed';
import DiscussionsCard from '../components/DiscussionsCard';
import ArticlesCard from '../components/ArticlesCard';
import SkillTags from '../components/SkillTags';

//Dummy Data Files
//import userData from '../data/users';
//import postsData from '../data/posts';
import discussions from '../data/discussions';
import articles from '../data/articles';
import UserCard from '../components/UserCard';

function Profile({ match }) {
  //const user = userData.find((u) => u.username === match.params.username);
  const username = match.params.username;

  const [user, setUser] = useState({ skills: [] });
  let [posts, setPosts] = useState([]);

  let fetchPosts = useCallback(() => {
    //Why is the proxy URL not workin here??
    fetch(`/api/users/${username}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [username]);

  let fetchUser = useCallback(() => {
    fetch(`/api/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          username: username,
          profile_pic: data.profile.profile_pic,
          skills: data.profile.skills,
          name: data.profile.name,
          bio: data.profile.bio,
          vote_ratio: data.profile.vote_ratio,
          followers_count: data.profile.followers_count,
        });
      });
  }, [username]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [fetchUser, fetchPosts]);

  // let posts;
  // if (user)
  //   posts = postsData.filter((p) => p.user.username === match.params.username);

  return user ? (
    <div className="container profile--layout">
      <section id="sidebar--left--profile">
        <UserCard user={user} />
        <SkillTags tags={user.skills} />
      </section>

      <section id="center-content">
        <div className="card">
          <div className="card__body">
            <Link className="btn btn--main--outline" to={'/'}>
              &#8592; Go Back{' '}
            </Link>
          </div>
        </div>
        <Feed posts={posts} />
      </section>

      <section id="sidebar--right--profile">
        <DiscussionsCard discussions={discussions} />
        <ArticlesCard articles={articles} />
      </section>
    </div>
  ) : (
    <Redirect to="/404" />
  );
}

export default Profile;
