import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userAva from '../../../assets/images/ava.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import iconPhoto from "../../../assets/images/iconPhone.png"


const ProfileInfo = ({profileInfo, isOwner, saveUserData, ...props}) => {

    let [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveUserData(formData).then(() => {
            setEditMode(false);
        })
    }

    if(!profileInfo){
        return <Preloader />
    } else {
        return (
            <div>
                <div className={styles.image}>
                    <img src="https://uploadfile.bizhizu.cn/up/0c/61/27/0c6127d7f40b099800fd5e2c33b6e9d1.jpg.source.jpg" alt="img" />
                </div>
                <div className={styles.user}>
                    <div className={styles.containerUserImg}>
                        <div className={styles.userImg}>
                            <img src={profileInfo.photos.large || userAva} alt="userImg" />
                                {isOwner && <div className={styles.uploadingPhoto}>
                                    <input id='file'  type="file" onChange={onMainPhotoSelected}/>
                                    <label className={styles.label} htmlFor='file'>
                                        <img className={styles.iconPhoto} src={iconPhoto} alt="iconPhoto"/>
                                    </label>
                                </div>
                                }
                        </div>
                    </div>
                    <div className={styles.userInfo}>
                        <div className="user__name"><h1>{profileInfo.fullName}</h1></div>
                        <ProfileStatusWithHooks
                            status={props.status}
                            updateUserStatus={props.updateUserStatus}
                        />
                        {editMode
                            ? <ProfileDataForm initialValues={profileInfo} profileInfo={profileInfo} onSubmit={onSubmit}/>
                            : <ProfileData profileInfo={profileInfo}
                                           isOwner={isOwner}
                                           goToEditMode={() => setEditMode(true)}
                            />
                        }

                    </div>
                </div>
            </div>
        )
    }
};

const Contact = ({contactTitle, contactValue}) => {
    return contactValue ? <li>{contactTitle} : {contactValue}</li> : null
}

const ProfileData = ({profileInfo, isOwner, goToEditMode}) => {
    return <div>

        <div>Looking for a job: {profileInfo.lookingForAJob
            ? 'yes'
            : 'no'}
        </div>
        {profileInfo.lookingForAJob && <div>My professional skills:
            {profileInfo.lookingForAJobDescription
                ? profileInfo.lookingForAJobDescription
                : null}
        </div>
        }
        <div>About me:  {profileInfo.aboutMe
            ? profileInfo.aboutMe
            : null}
        </div>

        <div>
            <ul>
                {Object.keys(profileInfo.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profileInfo.contacts[key]}
                    />})}
            </ul>
        </div>
        {isOwner && <div><button className={styles.button} onClick={goToEditMode}>Edit</button></div>}
    </div>
}

export default ProfileInfo;
