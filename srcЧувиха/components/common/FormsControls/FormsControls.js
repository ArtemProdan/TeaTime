import React from 'react';
import styles from './FormsControls.module.css'
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children} ) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}><textarea className={styles.textarea} {...input} {...restProps}></textarea></FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
    )
}

export const fieldCreator = (component, name, validate, placeholder, type='text', text=null) => {
    return <div className={styles.containerForm}>
        <Field component={component}
               name={name}
               placeholder={placeholder}
               validate={validate}
               type={type}/>
        {text}
    </div>
}