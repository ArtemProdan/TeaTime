import React from 'react';
import s from './Profile.module.css';
import profileBg from '../../img/telegram-chats.jpg';
import UserDefault from '../../img/user_default.png';
import { Status } from './Status';

export class UserHeader extends React.Component {
    componentDidMount () {
    // console.log('Вызван User Header')
    // alert('User Header вызвался')
    }
    
    render() {
        const { profile, status, updateStatus, isOwner, savePhoto } = this.props;

        const onMainPhotoSelected = (e) => { 
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        }

        return (
            <div className={s.users_header}>
                <img className={s.profile_bg} src={profileBg} alt="" />
                <div className={s.information}>
                    <img
                        src={
                            // profile.photos !== undefined ? profile.photos.large ?? UserDefault : UserDefault
                            (profile.photos !== undefined && profile.photos.large) || UserDefault
                        }
                        className={s.avatar}
                        alt="proff"
                    />
                    { isOwner && <input type="file" id='photo' onChange={onMainPhotoSelected}/> }

                    <div className="profile_container">
                        <h1 className={s.name}>{profile.fullName}</h1>
                        <h1 className={s.name}>{profile.userId}</h1>
                        <h4>{profile.aboutMe ?? null}</h4>
                        <h4>
                            {profile.contacts !== undefined
                                ? profile.contacts.facebook ?? null
                                : null}
                        </h4>
                        <Status
                            status={status}
                            updateStatus={updateStatus}
                        />
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
