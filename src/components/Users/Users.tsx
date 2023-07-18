import React, {FC} from 'react';
// @ts-ignore
import s from './users.module.css';
// @ts-ignore
import userDefault from '../../img/user_default.png';
import { NavLink } from 'react-router-dom';
// import { Filter } from './Filter';
// import Paginator from '../Common/Paginator/Paginator';
import { UserType } from '../../types/types'

type PropsType = {
    // totalUsersCount: number
    // pageSize: number
    // currentPage: number
    // onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    myId: number | null
    // followed: boolean
}

export const Users: FC<PropsType> = React.memo(props => {

    return (
        <div className={s.users_wrapper}>
           
            <div className={s.users}>
                {props.users &&
                    props.users.map((u) => (
                        <div className={s.user_item} key={u.id}>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small !== null ? u.photos.small : userDefault} alt="" />
                            </NavLink>

                            <div className={s.follow_btn}>
                            {u.id !== props.myId ? (
                                u.followed ? (
                                    <button
                                        disabled={props.followingInProgress.some((id) => id === u.id)}
                                        className={s.btn_unfollow}
                                        onClick={() => {
                                            props.unfollow(u.id);
                                        }}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        disabled={props.followingInProgress.some((id) => id === u.id)}
                                        className={s.btn_follow}
                                        onClick={() => {
                                            props.follow(u.id);
                                        }}
                                    >
                                        Follow
                                    </button>
                            )) : <h2>😉 it's me</h2> }
                            </div>

                            <pre>
                                <p className={s.name}>{u.name}</p>
                                <p className={s.status}> {u.status} </p>
                            </pre>
                        </div>
                    ))}
            </div>
        </div>
    );
}
)

