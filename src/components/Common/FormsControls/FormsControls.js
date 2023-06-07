import React from "react";
import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
    // debugger
    const hasError = meta.touched && meta.error
    // const visited = meta.visited
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
            {/* {visited && <span>Максимальное количество</span>} */}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;

    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )

}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;

    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}