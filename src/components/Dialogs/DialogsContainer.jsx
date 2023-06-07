// import React from 'react'
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/dialogs-reducer';
import { Dialogs } from './Dialogs';
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux'


let mapStateToProps = (state) => {
    return {
        messagesData : state.messagesData,
        profilesData : state.profilesData.users,
        isAuth : state.auth.isAuth
    }
}

export default compose(connect(mapStateToProps, {sendMessage}), withAuthRedirect)(Dialogs)


