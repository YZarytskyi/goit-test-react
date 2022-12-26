import { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import style from './Cards.module.css';

const FOLLOWED_KEY = 'followed';

export const CardItem = ({ user }) => {
  const [isFollow, setIsFollow] = useState(false);
  const [followers, setFollowers] = useState(user.followers);

  useEffect(() => {
    const savedFollowedIds = JSON.parse(localStorage.getItem(FOLLOWED_KEY));
    const isFollowed = savedFollowedIds?.includes(user.id);
    if (isFollowed) {
      setIsFollow(true);
      setFollowers(followers => followers + 1);
    }
  }, []);

  const onClickToggleFollow = () => {
    setIsFollow(state => !state);
    setFollowers(followers => (isFollow ? followers - 1 : followers + 1));

    const savedFollowedIds =
      JSON.parse(localStorage.getItem(FOLLOWED_KEY)) || [];

    const newFollowedIds = isFollow
      ? savedFollowedIds.filter(id => id !== user.id)
      : [...savedFollowedIds, user.id];

    localStorage.setItem(FOLLOWED_KEY, JSON.stringify(newFollowedIds));
  };

  const btnText = isFollow ? 'Following' : 'Follow';
  const tweetsCount = user.tweets.toLocaleString('en');
  const followersCount = followers.toLocaleString('en');

  return (
    <li className={style.cardContainer}>
      <img src={logo} alt="Logo" className={style.logo} />
      <div className={style.imageContainer}></div>
      <div className={style.userPhotoContainer}>
        <img src={user.avatar} alt="User" className={style.userPhoto} />
      </div>
      <p className={style.stats}>{tweetsCount} tweets</p>
      <p className={style.stats}>{followersCount} Followers</p>
      <button
        type="button"
        className={`${style.followBtn} ${
          isFollow ? style.followBtnActive : ''
        }`}
        onClick={onClickToggleFollow}
      >
        {btnText}
      </button>
    </li>
  );
};
