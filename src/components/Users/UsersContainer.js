import React from 'react';
import { connect } from 'react-redux';
import { followThunk, unfollowThunk, getUsersThunk } from '../../redux/profiles-reducer';
import { Users } from './Users';
import { Preloader } from "../Common/Preloader";
// import { Navigate } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux';
import {
    getUsersOnOnePage, getUsers, getUsersTotalCount, getCurrentPage, getTotalPagesCount, getIsFetching,
    getFollowingInProgress, getIsAuth
} from '../../redux/users-selectors'
import Paginator from '../Common/Paginator/Paginator';


class UsersContainer extends React.Component {


    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.usersOnOnePage)
        // console.log('Вызван Юзерс Контейнер')
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunk(pageNumber, this.props.usersOnOnePage)
    }

    render() {
        // if (!this.props.isAuth) {return <Navigate to='/login'/>}
        const { currentPage, onPageChanged, usersTotalCount, usersOnOnePage } = this.props

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={usersTotalCount} pageSize={usersOnOnePage} />
            <Users usersTotalCount={this.props.usersTotalCount}
                usersOnOnePage={this.props.usersOnOnePage}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.followThunk}
                unfollow={this.props.unfollowThunk}
                followingInProgress={this.props.followingInProgress}
            // totalPagesCount={this.props.totalPagesCount}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        usersOnOnePage: getUsersOnOnePage(state),
        usersTotalCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        totalPagesCount: getTotalPagesCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}

export default compose(connect(mapStateToProps, { followThunk, unfollowThunk, getUsersThunk }), withAuthRedirect)(UsersContainer);

