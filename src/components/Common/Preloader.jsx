import preloader from '../../icons/preloader.gif'

export const Preloader = () => {
    return (
        <div className='preloader'>
            <img src={preloader} className='preloader' alt='gif' />
        </div>
    )
}