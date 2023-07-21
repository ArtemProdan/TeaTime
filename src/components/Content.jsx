import DialogsContainer from './Dialogs/DialogsContainer'
import { Gallery } from './Gallery/Gallery'
import { Music } from './Music/Music'
import News from './News/News'
import GalleryCat from './GalleryCat/src/components/GalleryCat'
import { Routes, Route } from 'react-router-dom';
import UsersContainer from './Users/UsersContainer.tsx'
import ProfileContainer from './Profile/ProfileContainer'
import LoginPage from './Header/LoginPageFormik'
import { ShestilContainer } from './Shestil/ShestilContainer'

export const Content = (props) => {

    return (
        <div className='content'>
            <Routes>
                {/* <Route index element={<ProfileContainer />} /> */}
                <Route path="/" element={<ProfileContainer />} />
                <Route path="/profile/*?" element={<ProfileContainer />} />
                <Route path="/dialogs" element={<DialogsContainer store={props.store} />} />
                <Route path="/music" element={<Music />} />
                <Route path="/news" element={<News />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/groups" element={<GalleryCat />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shestil" element={<ShestilContainer />} />
                <Route path="*" element={<div>PAGE NOT FOUND</div>} />
            </Routes>
        </div >
    )
}
// git remote add origin https://github.com/ArtemProdan/TeaTime.git