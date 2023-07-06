import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setAuthUserImg} from "../../redux/auth-reducer";
import {profileAPI} from "../../api/api";
import {setToggleBurgerMenuAC} from "../../redux/sidebar-reducer";

class HeaderContainer extends React.Component{

    componentDidMount() {
        profileAPI.getUserProfile(this.props.userId).then(data => {
            this.props.setAuthUserImg(data.photos.small)
        })
    }

    render() {
        return <Header {...this.props}/>
    }
};

let mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.id,
        imgSrc: state.auth.imgSrc,
        burgerEditMode: state.sidebar.burgerEditMode,
    }
);

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        },
        setAuthUserImg: (imgSrc) => {
            dispatch(setAuthUserImg(imgSrc))
        },
        setToggleBurgerMenu: (isToggle) => {
            dispatch(setToggleBurgerMenuAC(isToggle))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);