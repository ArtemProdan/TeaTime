import React, {useEffect, useState} from 'react';
import styles from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={styles.statusBlock}>
            {!editMode &&
            <div className={styles.status}>
                        <span onClick={activateEditMode}>
                            {props.status || 'not status'}
                        </span>
            </div>
            }
            {editMode &&
            <div>
                <input className={styles.statusInput}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       onChange={onStatusChange}
                       value={status}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;