import OriginalFile from "./OriginalFile"
import Shestil from "./Shestil"
import s from './shestil.module.css'

export const ShestilContainer = () => {
    return (
        <div className={s.container}>
            <OriginalFile/>
            <Shestil />
        </div>
    )
}