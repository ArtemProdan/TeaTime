// import React from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {
    return {
        navbarItem: state.sidebar.sidebar,
        burgerEditMode: state.sidebar.burgerEditMode,
    }
}

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer;

