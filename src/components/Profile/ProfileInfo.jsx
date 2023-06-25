import s from './Profile.module.css';
import { FaFacebook, FaInstagram, FaGithub, FaVk, FaTwitter, FaUserAlt, FaGlobe, FaYoutube } from 'react-icons/fa';

export const ProfileInfo = (props) => {
    // debugger
    const { profile } = props
    const socialIcons = {
        facebook: <FaFacebook />,
        instagram: <FaInstagram />,
        github: <FaGithub />,
        vk: <FaVk />,
        twitter: <FaTwitter />,
        mainlink: <FaUserAlt />,
        website: <FaGlobe />,
        youtube: <FaYoutube />
    };


    const ContactItem = ({ title, value }) => {
        return value ? (
            <div className={s.form_info_item}>
                {socialIcons[title.toLowerCase()]}
                <p>{title}</p>
                <a href={value} target="_blank" rel="noopener noreferrer">
                    <h4>{value}</h4>
                </a>
            </div>
        ) : null;
    };
    return (
        <div>
            {
                profile.aboutMe &&
                <div className={s.info_item}>
                    <p>Обо мне</p>
                    <h4>{profile.aboutMe}</h4>
                </div>
            }

            {
                profile.lookingForAJob && profile.lookingForAJobDescription &&
                <div className={s.info_item}>
                    <p>Ищу работу :</p>
                    <h4> {profile.lookingForAJobDescription} </h4>
                </div>
            }

            <div>
                {Array.isArray(profile?.contacts) && profile.contacts.some(value => value !== null) && <div>Контакты:</div>}

                {profile?.contacts && Object.keys(profile.contacts).map(key => (
                    <ContactItem key={key} title={key} value={profile.contacts[key]} />
                ))}
            </div >
        </div>
    )
}