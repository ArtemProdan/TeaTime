import React, {useState, useEffect} from 'react';
import s from './Profile.module.css';


export const Status = (props) => {
    // debugger
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.status}>
            { !editMode &&
            <div>
                <span onDoubleClick={ activateEditMode }>{props.status.toString()  || "put your"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={ deactivateEditMode }
                       value={status} />
            </div>
            }
        </div>
    )
}

