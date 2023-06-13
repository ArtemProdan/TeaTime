import React from 'react';
import s from './Profile.module.css';
import profileBg from '../../img/telegram-chats.jpg';
import UserDefault from '../../img/user_default.png';
import { Status } from './Status';
import { FaFacebook, FaInstagram, FaGithub, FaVk, FaTwitter, FaUserAlt, FaGlobe, FaYoutube } from 'react-icons/fa';

export class UserHeader extends React.PureComponent {

    render() {
        const { profile, status, updateStatus, isOwner, savePhoto } = this.props;

        const onMainPhotoSelected = (e) => {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        }

        const socialIcons = {
            facebook: <FaFacebook />,
            instagram: <FaInstagram />,
            github: <FaGithub/>,
            vk : <FaVk/>, 
            twitter: <FaTwitter/>,
            mainlink: <FaUserAlt/>, 
            website: <FaGlobe />,
            youtube: <FaYoutube />
        };
        

        const ContactItem = ({ title, value }) => {
            return value ? (
                <div className={s.info_item}>
                    {socialIcons[title.toLowerCase()]}
                    <p>{title}</p>
                    <h4>{value}</h4>
                </div>
            ) : null;
        };

        console.log('RENDER USER HEADER')
        return (
            <div className={s.users_header}>
                <img className={s.profile_bg} src={profileBg} alt="" />
                <div className={s.information}>
                    <img
                        src={(profile.photos !== undefined && profile.photos.large) || UserDefault}
                        className={s.avatar}
                        alt="profile"
                    />
                    {isOwner && <input type="file" id='photo' onChange={onMainPhotoSelected} />}

                    <div className="profile_container">
                        <h1 className={s.name}>{profile.fullName}</h1>

                        {status && <Status status={status} updateStatus={updateStatus} />}

                        {profile.aboutMe &&
                            <div className={s.info_item}>
                                <p>Обо мне</p>
                                <h4>{profile.aboutMe}</h4>
                            </div>
                        }

                        <div>
                            <b>Контакты</b>:
                            {profile && profile.contacts && Object.keys(profile.contacts).map(key => {
                                return <ContactItem key={key} title={key} value={profile.contacts[key]} />
                            })}
                        </div>

                        {
                            profile.lookingForAJob && profile.lookingForAJobDescription &&
                            <div className={s.info_item}>
                                <p>Ищу работу :</p>
                                <h4> {profile.lookingForAJobDescription} </h4>
                            </div>
                        }


                        <div className={s.following}>
                            <button>Follow</button>
                            <button>Unfollow</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
