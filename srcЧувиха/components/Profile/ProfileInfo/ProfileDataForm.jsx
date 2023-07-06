import React from "react";
import {fieldCreator, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import styles from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profileInfo, error}) => {
    return <form>

        {error && <div className={styles.totalError}>{error}</div>}
        <div>Full Name: {fieldCreator(Input, 'fullName', [], 'Full name')}</div>

        <div><span>Looking for a job:</span>
            {fieldCreator(Input, 'lookingForAJob', [], '', 'checkbox')}
        </div>
        <div>My professional skills:
            {fieldCreator(Textarea, 'lookingForAJobDescription', [], 'My professional skills')}
        </div>
        <div>About me:
            {fieldCreator(Textarea, 'aboutMe', [], 'AboutMe')}
        </div>

        <div>{Object.keys(profileInfo.contacts)
            .map(key => {
                return <div key={key}> {key}: {fieldCreator(Input, 'contacts.' + key, [], key)}
                </div>})}
        </div>
        <div><button className={styles.button} onClick={handleSubmit}>Save</button></div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
