import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div >
            <ProfileInfo
                saveUserData={props.saveUserData}
                profileInfo={props.profileInfo}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />
            <MyPostsContainer />
        </div>
    )
};

export default Profile;
