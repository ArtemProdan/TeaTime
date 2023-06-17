import React, { useState, memo } from 'react';
import s from './Profile.module.css';
import profileBg from '../../img/telegram-chats.jpg';
import UserDefault from '../../img/user_default.png';
import { Status } from './Status';
import { ProfileInfo } from './ProfileInfo';
import { ProfileInfoForm } from './ProfileInfoForm';
import camera from '../../icons/camera.svg'

export const UserHeader = memo(props => {

    const { profile, status, updateStatus, isOwner, savePhoto, saveProfile } = props

    let [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    console.log('RENDER USER HEADER')
    return (
        <div className={s.users_header}>
            <img className={s.background} src={profileBg} alt="background" />
            <div className={s.profile}>

                <img
                    src={(profile.photos !== undefined && profile.photos.large) || UserDefault}
                    className={s.avatar}
                    alt="avatar"
                />
                {isOwner &&
                    <div className={s.btn_file_div}>
                        <img src={camera} alt="" />
                        <input type="file" id='photo' onChange={onMainPhotoSelected} className={s.btn_file} />
                    </div>
                }
                {isOwner &&
                    <button onClick={() => setEditMode(!editMode)}>Edit info</button>
                }

                <div className="profile_info">
                    <h1 className={s.name}>{profile.fullName}</h1>

                    {status && <Status status={status} updateStatus={updateStatus} />}

                    {isOwner && editMode ? (
                        <ProfileInfoForm profile={profile} saveProfile={saveProfile} setEditMode={setEditMode}/>
                    ) : (
                        <ProfileInfo profile={profile} />
                    )}

                    {!isOwner &&
                        <div className={s.following}>
                            <button>Follow</button>
                            <button>Unfollow</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
})
