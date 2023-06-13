import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import {logOut } from "../../redux/auth-reducer";
// import { usersAPI } from "../../API/api";

 class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} /> 
    }
}

const mapStateToProps = (state) => ({
    isAuth : state.auth.isAuth,
    login : state.auth.login,
    profile : state.profilesData.profile,
    myProfile : state.auth.myProfile,
    myId : state.auth.userId
 })

 export default connect(mapStateToProps, {logOut})(HeaderContainer)