import s from './users.module.css'

export const Filter = () => {
    return (
        <div className={s.filter}>
            <h1>Поиск пользователя</h1>
            <div>
                <p>Поиск по имени:</p>
                <input type="text" placeholder='введите имя' />
            </div>

            <div>
                <p>Поиск по id:</p>
                <input type="number" placeholder='введите id' />
            </div>

            <div>
                <p>Поиск по локации:</p>
                <input type="text" placeholder='введите страну или город' />
            </div>

            <div className={s.with_photo}>
                <input type="checkbox" />
                <p>C фотографией</p>
            </div>
        </div >
    )
}