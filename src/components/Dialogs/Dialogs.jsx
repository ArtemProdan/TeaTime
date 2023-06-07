import React from 'react'
import s from './Dialogs.module.css'
import send from '../../icons/send-paper-white.svg'
import { NavLink } from 'react-router-dom'
import userDefault from '../../img/user_default.png'
// import { Navigate } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

// ******************************
// import { useState } from 'react';
import { DialogNavs } from './DialogNavs'

// ******************************

let key = 0;

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog__item + ' ' + s.active}>
            <img src={props.src} alt="" />
            <NavLink to={path}> {props.firstName} {props.lastName} </NavLink>
        </div>
    )
}
const Message = (props) => {

    return (
        <div className={s.message}>
            <span id={props.id}> {props.text} </span>
        </div>
    )
}

export const Dialogs = (props) => {
    // ====================================================
    // const [chatHistory, setChatHistory] = useState([]);
    // const [userInput, setUserInput] = useState('');

    //   const handleUserInput = (event) => {
    //     setUserInput(event.target.value);
    //   }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter' && event.shiftKey) {
    //         event.preventDefault();
    //         onSendMessageClick();
    //     }
    // }

    // const sendMessage = () => {
    //     // setChatHistory([...chatHistory, { speaker: 'user', text: userInput }]);

    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer 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`
    //     }

    //     const data = {
    //         'model': 'text-ada-001',
    //         'prompt': newMessageBody,
    //         'temperature': 0.7,
    //         'max_tokens': 64,
    //         'n': 1,
    //         'stop': ''
    //     }

    // axios.post('https://api.openai.com/v1/completions', data, { headers })
    // .then(response => { 
    //     // setChatHistory([...chatHistory, { speaker: 'bot', text: response.data.choices[0].text }]);
    //     // setUserInput('');
    // })


    //     .then(data => {
    //         console.log(data);
    //     })

    //     .catch(error => console.log(error))
    // console.log(data)
    // }
    // ====================================================

    let dialogsElements = props.profilesData.map(d =>
        <DialogItem
            // firstName={d.firstName} key={d.id} lastName={d.lastName} id={d.id} src={d.avatar}
            firstName={d.name} src={d.avatar != null ? d.avatar : userDefault} id={d.id} key={d.id}
        />);

    let messagesElements = props.messagesData.Messages.map(m => <Message text={m.message} key={m.id + ++key} id={m.id} />);
    // let newMessageBody = props.messagesData.newMessageBody

    // let sendMessage = () => {
    //     // sendMessage()
    //     props.sendMessage()
    // }

    let addNewMessage = (values) => { 
        props.sendMessage(values.newMessageBody)
    }


    // if (!props.isAuth) { return <Navigate to="/login" /> }

    return (
        <div className={s.dialogs}>
            <div className={s.left} id='left'>
                <DialogNavs />
                {dialogsElements}
            </div>

            <div className={s.right}>
                <div className={s.messages_wrapper}>
                    {messagesElements}
                </div>

                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form className={s.send_wrapper}  onSubmit={props.handleSubmit} >
            <Field className={s.texttosend} name='newMessageBody' component='textarea' placeholder='add new message'/>
            <button> <img src={send} alt="" /> </button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'addMessage' })(AddMessageForm)
