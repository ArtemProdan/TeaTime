import React from 'react'
import { UserHeader } from "./UserHeader"
import MyPostsContainer from '../MyPosts/MyPostsContainer'
import { connect } from "react-redux"
import { getUserProfileThunk, getStatus, updateStatus } from "../../redux/profiles-reducer"
import { getProfile, isAuth, myId } from '../../redux/users-selectors'
import { useParams } from 'react-router-dom'
import s from './Profile.module.css'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { savePhoto } from '../../redux/profiles-reducer'

class ProfileContainer extends React.PureComponent {
    // state ={
    //     isOwner : false
    // }

    refreshProfile() {
        let userId = this.props.userId['*'];
        if (!userId) { userId = this.props.myId }
        this.props.getUserProfileThunk(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userId !== prevProps.userId)
            this.refreshProfile()
    }

    render(props) {
        // console.log('Вызван Profile Container')
        return (
            <div className={s.user_page}>
                <UserHeader
                    {...this.props}
                    isOwner = {!this.props.userId['*']}
                    profile={this.props.profile}
                    updateStatus={this.props.updateStatus}
                    status={this.props.status}
                    savePhoto={this.props.savePhoto}
                />
                <MyPostsContainer />
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: getProfile(state),
    isAuth: isAuth(state),
    myId: myId(state),
    status: state.profilesData.status
})


const AuthRedirectComponent = (props) => {
    return <ProfileContainer {...props} userId={useParams()} />
};

export default compose(
    connect(mapStateToProps, { getUserProfileThunk, getStatus, updateStatus, savePhoto }),
    withAuthRedirect)
    (AuthRedirectComponent)
/*
compose
    connect
        WithAuthRedirect
            AuthRedirectComponent
                <ProfileContainer>
                        <UserHeader/>
*/
