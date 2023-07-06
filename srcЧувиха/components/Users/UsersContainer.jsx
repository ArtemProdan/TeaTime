import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, requestUsers,
    setCurrentPage, unfollow
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getPageUserSize, getUsers,
    getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingInProgress
} from "../../redux/users-selectors";

class UsersContainer extends React.Component{

    componentDidMount() {
        const {currentPage, pageSize, requestUsers} = this.props;
        requestUsers(currentPage,pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {setCurrentPage, requestUsers,pageSize} = this.props;
        setCurrentPage(pageNumber);
        requestUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   users={this.props.users}
                   getUsers={this.getUsers}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageUserSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        requestUsers,
        unfollow,
        follow,
    }),
    withAuthRedirect
)(UsersContainer)