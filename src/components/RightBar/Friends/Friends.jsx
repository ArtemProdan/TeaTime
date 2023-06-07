// import { useSelector } from 'react-redux'
import React from 'react';
import './Friends.css'
import userDefault from '../../../img/user_default.png'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
// import { getUsersThunk } from '../../../redux/profiles-reducer'
import { usersAPI } from '../../../API/api'
import { setMyFriends } from '../../../redux/profiles-reducer'

let FriendsItem = (props) => {
    return (
        <NavLink to={'/profile/' + props.id}>
            <div className="friends__item">
                <img src={props.avatar} alt='' />
                <div className="friends__name">{props.firstName}</div>
            </div>
        </NavLink>
    )
}

class Friends extends React.Component {
    componentDidMount() {
        usersAPI.getMyFriends()
            .then(data => this.props.setMyFriends(data.items))
    }

    render() {
        let friendsElements = this.props.myFriends.map(f =>
            <FriendsItem firstName={f.name} avatar={f.photos.small != null ?? f.photos.small=== undefined ? f.photos.small : userDefault} id={f.id} key={f.id} />
        )

           if(!this.props.isAuth) {return null} 
           return (
            <div className="friends">
                <div className="friends__header">
                    <h1>All my friends</h1>
                    <h1>Friends online</h1>
                    {/* <div className="friends__header__round"></div> */}
                </div>
                <div className="friends__content__wrapper">
                    <div className="friends__content">
                        {friendsElements}
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        myFriends: state.profilesData.myFriends,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { setMyFriends })(Friends);