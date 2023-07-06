import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveUserData} from "../../redux/prifile-reducer";
// import {withRouter} from "react-router";
import {compose} from "redux";
import { useParams } from 'react-router-dom'

class ProfileContainer extends React.Component{

    refreshProfile() {
        // let userId = this.props.match.params.userId;
        let userId = this.props.userId['*'];
        if (!userId){
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile();
        }
    }

    render() {

        return (
                <Profile { ...this.props}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

const AuthRedirectComponent = (props) => {
    return <ProfileContainer {...props} userId={useParams()} />
};


export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        saveUserData
    })
)(AuthRedirectComponent);
