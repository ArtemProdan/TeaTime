import React, { useState } from 'react';
import Logo from '../../icons/tea.svg';
import s from './Header.module.css';
import { ThemeSwitcher } from './ThemeSwitcher';
import userDefault from '../../img/user_default.png';
import logout from '../../icons/logout.svg';

export const Header = (props) => {
    // debugger
  const { logOut } = props;
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleAvatarClick = () => {
    setIsMenuActive(!isMenuActive);
    if (!props.isAuth) {
      setIsMenuActive(!isMenuActive);
    }
  };

  const onAvatarClick = () => {
    logOut();
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className={s.header}>
      <div className={s.header_left}>
        <img src={Logo} alt="" />
        <h1>TeaTime</h1>
      </div>

      <div className={s.header_right}>
        <ThemeSwitcher />

        {props.isAuth && (
          <img
            src={(props.myProfile && props.myProfile.photos && props.myProfile.photos.large) || userDefault}
            onClick={handleAvatarClick}
            className={s.avatar}
            alt=""
          />
        )}
        <ul className={`${s.menu} ${isMenuActive ? s.active : ''}`}>
          <li className={s.logout_btn} onClick={onAvatarClick}>
            <img src={logout} alt="" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
