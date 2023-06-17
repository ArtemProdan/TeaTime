import s from './Profile.module.css';
import { FaFacebook, FaInstagram, FaGithub, FaVk, FaTwitter, FaUserAlt, FaGlobe, FaYoutube } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';

export const ProfileInfoForm = (props) => {
    const { profile, saveProfile, setEditMode} = props
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

    const ContactItem = ({title }) => {
        return (
            <div className={s.form_info_item}>
                {socialIcons[title.toLowerCase()]}
                <p>{title}</p>
                <Field name={'contacts.' + title} placeholder={title} />
            </div>
        )
    }
    return (
        <div className={s.form_info}>
            <Formik
                initialValues={
                    profile
                    //     {
                    //     fullName: '', lookingForAJob: false, lookingForAJobDescription: '', aboutMe: '', facebook: '', instagram: '',
                    //     github: 'this is sparta', vk: '', twitter: '', mainLink: '', website: '', youtube: ''
                    // }
                }
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        saveProfile(values)
                        setEditMode(false)
                    }, 100);
                }}
            >
                <Form>
                    <button onClick={() => { }} type="submit">Save</button>

                    <div className={s.form_info_item}>
                        <p>Полное имя</p>
                        <Field name="fullName" component="input" type="text" placeholder="Full Name" />
                    </div>

                    <div className={s.form_info_item}>
                        <p>Ищу работу</p>
                        <Field type="checkbox" name="lookingForAJob" id="checkbox" />
                    </div>

                    <div className={s.form_info_item}>
                        <p>Мои скилы :</p>
                        <Field name="lookingForAJobDescription" placeholder="type your skills" />
                    </div>

                    <div className={s.form_info_item}>
                        <p>Обо мне</p>
                        <Field name="aboutMe" placeholder="пару слов обо мне" />
                    </div>

                    <div>
                        <b>Контакты</b>:
                        {
                            profile?.contacts && Object.keys(profile.contacts).map(key => {
                                return <ContactItem key={key} title={key} value={profile.contacts[key]} />
                            })
                        }
                    </div>



                </Form>
            </Formik>
        </div >
    )
}