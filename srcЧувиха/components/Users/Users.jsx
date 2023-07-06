import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";

const paginationForUsers = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {
    return <Paginator currentPage={currentPage}
                      onPageChanged={onPageChanged}
                      totalUsersCount={totalUsersCount}
                      pageSize={pageSize}/>
}

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    return (
        <div className={styles.usersContainer}>
            <h2>Users</h2>
            {paginationForUsers({
                currentPage,
                onPageChanged,
                totalUsersCount,
                pageSize})
            }
            {
                props.users.map(user => (
                    <User user={user}
                              followingInProgress={props.followingInProgress}
                              unfollow={props.unfollow}
                              follow={props.follow}
                              key={user.id}
                    />)
                )
            }
            {paginationForUsers({
                currentPage,
                onPageChanged,
                totalUsersCount,
                pageSize})
            }
            <button onClick={props.getUsers}>Get users</button>
        </div>
    )
}

export default Users;