import { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import style from './Cards.module.css';

const FOLLOWED_KEY = 'followed';

const CardItem = ({ user }) => {
  const [isFollow, setIsFollow] = useState(false);
  const [tweets, setTweets] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    setFollowers(() => user.followers);
    setTweets(() => user.tweets);

    const savedFollowedIds = localStorage.getItem(FOLLOWED_KEY);
    const isFollowed = savedFollowedIds && savedFollowedIds.includes(user.id);
    if (isFollowed) {
      setIsFollow(true);
      setFollowers(followers => followers + 1);
    }
  }, []);

  const onClickToggleFollow = () => {
    setIsFollow(state => !state);
    setFollowers(followers => (isFollow ? followers - 1 : followers + 1));

    const savedFollowed = JSON.parse(localStorage.getItem(FOLLOWED_KEY)) || [];
    const userIdIndex = savedFollowed.indexOf(user.id);
    let setLocalStorage = null;
    if (userIdIndex === -1) {
      setLocalStorage = [...savedFollowed, user.id];
    } else {
      let newFollowed = [...savedFollowed];
      newFollowed.splice(userIdIndex, 1);
      setLocalStorage = newFollowed;
    }
    localStorage.setItem(FOLLOWED_KEY, JSON.stringify(setLocalStorage));
  };

  const btnText = isFollow ? 'Following' : 'Follow';
  const tweetsCount = tweets.toLocaleString('en');
  const followersCount = followers.toLocaleString('en');

  return (
    <li className={style.cardContainer}>
      <img src={logo} alt="Logo" className={style.logo} />
      <div className={style.imageContainer}></div>
      <img src={user.avatar} alt="User" className={style.userPhoto} />
      <p className={style.stats}>{tweetsCount} tweets</p>
      <p className={style.stats}>{followersCount} Followers</p>
      <button
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

export default CardItem;
