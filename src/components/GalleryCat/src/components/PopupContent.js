import React from 'react'
import Comment from './Comment'
import send from '../../../../icons/send-paper.svg'

export default function PopupContent(props) {

  const { card } = props

  const [like, setLike] = React.useState(false)
  const [comments, setComments] = React.useState([])

  React.useEffect(() => {
    setLike(card ? card.isLiked : false)
  }, [card])

  React.useEffect(() => {
    setComments(card ? card.comments.reverse() : [])
  }, [card])

  const likeCard = () => {
    setLike(!like)
  }

  const input = React.useRef()
  const subBtn = React.useRef()

  const setActiveInput = () => {
    input.current.classList.add('active')
    subBtn.current.classList.add('active')
  }

  const removeActiveInput = () => {
    input.current.classList.remove('active')
    subBtn.current.classList.remove('active')
  }

  const getCommentText = () => {
    return input.current.value
  }

  const createComment = (evt) => {
    evt.preventDefault()
    const newText = getCommentText()
    const date = new Date()
    const newComment = { text: newText, date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` }

    setComments([...comments, newComment])
    input.current.value = ''
    removeActiveInput()
  }

  return (
    <div className="popup__container">
      <img className="popup__img" src={card ? card.link : ''} alt={card ? card.title : ''} />
      <div className="popup__comments-section">
        <div className="popup__about">
          <h2 className="popup__title">{card ? card.title : ''}</h2>
          <div className="popup__rate">
            <p className="popup__count">{card && like ? '1' : '0'}</p>
            <button
              type="button"
              aria-label="поставить лайк"
              className={`popup__like-btn ${card && like && 'popup__like-btn_liked'}`}
              onClick={likeCard}
            >
            </button>
          </div>
        </div>

        <div className="popup__comments">
          {card && comments.map((item, i) => (
            <Comment key={i + 1} comment={item} />
          ))}
        </div>

        <form name="form" className="popup__form" onSubmit={createComment}>
          <textarea className='popup__input' ref={input} placeholder='Оставьте комменатарий'onClick={setActiveInput}/>

          <button type="submit" className="popup__sbmt_btn" ref={subBtn}>
            <img src={send} alt="send" />
          </button>
        </form>

      </div>
    </div>
  )
}



