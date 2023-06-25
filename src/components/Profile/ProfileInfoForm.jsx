import { useState } from 'react';
import s from './Profile.module.css';
import { FaFacebook, FaInstagram, FaGithub, FaVk, FaTwitter, FaUserAlt, FaGlobe, FaYoutube } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';

export const ProfileInfoForm = (props) => {
    // debugger
    const { profile, saveProfile, setEditMode, initialValues } = props
    const socialIcons = {
        facebook: <FaFacebook />,
        instagram: <FaInstagram />,
        github: <FaGithub />,
        vk: <FaVk />,
        twitter: <FaTwitter />,
        mainlink: <FaUserAlt />,
        website: <FaGlobe />,
        youtube: <FaYoutube />
    }

    const ContactItem = ({ title, value }) => {
        const index = errorContact ? errorContact.indexOf(title.toLowerCase()) : -1;
        const message = index >= 0 ? errorMessage[index].replace(/ \(Contacts->\w+\)/, '') : '';

        const handleChange = (e, form) => {
            const { name, value } = e.target;
            form.setFieldValue(name, value);
            const contactsError = form.errors && form.errors.contacts && form.errors.contacts[title];
            if (value.length === 0 && contactsError) {
                form.setFieldError(`contacts.${title}`, null);
                const updatedErrorContact = errorContact.filter(item => item !== title.toLowerCase());
                setErrorContact(updatedErrorContact.length > 0 ? updatedErrorContact : null);
            }
        };

        return (
            <div className={`${s.form_info_item} ${index >= 0 ? s.error : ''}`}>
                {index >= 0 && <span>{message}</span>}
                {socialIcons[title.toLowerCase()]}
                <p>{title}</p>
                <Field name={`contacts.${title}`}>
                    {({ field, form }) => (
                        <input {...field} value={field.value || ''} onChange={(e) => handleChange(e, form)} />
                    )}
                </Field>
            </div>
        )
    }

    const formFields = [
        { name: "fullName", type: "text", label: "Полное имя" },
        { name: "lookingForAJob", type: "checkbox", label: "Ищу работу" },
        { name: "lookingForAJobDescription", type: "text", label: "Мои скилы" },
        { name: "aboutMe", type: "text", label: "Обо мне" }
    ];

    const [errorMessage, setErrorMessage] = useState(null);
    const [errorContact, setErrorContact] = useState(null);
    const [formError, setFormError] = useState(null);

    console.log(formError);
    console.log(errorContact);
    console.log(errorMessage);

    const handleSubmit = (values) => {
        return saveProfile(values).then(error => {
            if (error) {
                const formErrors = {};
                error.forEach(message => {
                    const match = message.match(/Contacts->(\w+)/);
                    if (match) {
                        const field = match[1];
                        if (field === 'AboutMe' || field === 'FullName' || field === 'LookingForAJobDescription') {
                            formErrors[field] = message;
                        }
                    }
                });

                setFormError(formErrors);
                setErrorContact(error.map(message => message.match(/Contacts->(\w+)/)[1].toLowerCase()));

                const promises = [setFormError, setErrorContact];
                Promise.allSettled(promises).then((results) => results.forEach((result) => setErrorMessage(result) ));
            } else {
                setEditMode(false);
            }
        });
    }


    if (!profile) {
        return <h1>Не получены пропсы</h1>;
    }
    return (
        <div className={s.form_info}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <button className={s.btn_submit} onClick={() => { }} type="submit">Save</button>

                    {formFields && formFields.map(field => (
                        <div key={field.name} className={`${s.form_info_item} ${formError && s.error}`}>
                            <p>{field.label}</p>
                            {/* {formError[field.name] && <span>{formError[field.name]}</span> */}
                            {formError && Object.values(formError).map(message => (
                                <div>{message}</div>
                            ))}
                            <Field name={field.name} component="input" type={field.type} placeholder={field.label} />
                        </div>
                    ))}

                    <div>
                        <b>Контакты</b>:
                        {profile?.contacts && Object.keys(profile.contacts).map(key => {
                            return <ContactItem key={key} title={key} value={profile.contacts[key]} />
                        })}
                    </div>

                </Form>
            </Formik>
        </div>
    )
}