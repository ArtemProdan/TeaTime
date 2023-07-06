import React from 'react';
import  styles from './Dialogs.module.css'
import DialogItems from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogsData
        .map(dialog => <DialogItems name={dialog.name} key={dialog.id} id={dialog.id} imageSrc={dialog.imageSrc}/>);

    let messagesElements = props.dialogsPage.messagesData
        .map(message => <Message message={message.message} key={message.id}/>)

    let sendMessage = (values) => {
        props.addMessage(values.newMessage);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div className={styles.messagesBlock}>
                    {messagesElements}
                </div>
                <DialogsReduxForm onSubmit={sendMessage} />
            </div>
        </div>
    )
}

const maxLength5 = maxLengthCreator(5);

const DialogsForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={styles.newMessage}>
                <Field
                    component={Textarea}
                    validate={[required, maxLength5]}
                    className={styles.textarea}
                    name={'newMessage'}
                    placeholder={'Enter your message'}
                />
                <button className={styles.button}>Send</button>
            </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);

export default  Dialogs;