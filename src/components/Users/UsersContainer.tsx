import React from 'react';
import { connect } from 'react-redux';
import { followThunk, unfollowThunk, getUsersThunk } from '../../redux/profiles-reducer.ts';
import { Users } from './Users.tsx';
import { Preloader } from "../Common/Preloader";
// import { Navigate } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux';
import {
    getUsersOnOnePage, getUsers, getUsersTotalCount, getCurrentPage, getTotalPagesCount, getIsFetching,
    getFollowingInProgress, getIsAuth
} from '../../redux/users-selectors'
import Paginator from '../Common/Paginator/Paginator';
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store';


type MapStatePropsType = {
    currentPage: number
    usersOnOnePage: number
    totalPagesCount: number
    myId: number | null
    usersTotalCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    unfollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}

type OwnPropsType = {
    // usersTotalCount = number
    // users = Array<UserType>
    // follow = { this.props.followThunk }
    // unfollow = { this.props.unfollowThunk }
    // followingInProgress = { this.props.followingInProgress }
    // myId = { this.props.myId }
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.usersOnOnePage)
        // console.log('Вызван Юзерс Контейнер')
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunk(pageNumber, this.props.usersOnOnePage)
    }

    render() {
        // if (!this.props.isAuth) {return <Navigate to='/login'/>}
        const { currentPage, usersTotalCount, usersOnOnePage } = this.props

        return <>
            {
                this.props.isFetching ? <Preloader /> : null}
                    < Paginator currentPage={ currentPage } onPageChanged={ this.onPageChanged } totalItemsCount={ usersTotalCount } pageSize={ usersOnOnePage } />
                    <Users 
                        users = { this.props.users }
                        follow = { this.props.followThunk }
                        unfollow = { this.props.unfollowThunk }
                        followingInProgress = { this.props.followingInProgress }
                        myId = { this.props.myId }
                     />
            </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        usersOnOnePage: getUsersOnOnePage(state),
        usersTotalCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        totalPagesCount: getTotalPagesCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
        myId: state.auth.userId
    }
}

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
    { followThunk, unfollowThunk, getUsersThunk }), 
// withAuthRedirect
)(UsersContainer);

