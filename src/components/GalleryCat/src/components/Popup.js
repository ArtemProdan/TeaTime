import React from 'react'
import PopupContent from './PopupContent'

export default function Popup (props) { 
  const {card, onClose, prevCard, nextCard} = props
  return (
    <div className={`popup ${card && 'popup_opened'}`}>
      <div className="pop_btn popup__prev" onClick={prevCard}></div>
      <div className="pop_btn popup__next" onClick={nextCard}></div>
      <button type="button" className="popup__close_btn" onClick={onClose}></button>

      <PopupContent store={props.store} card={card} removeActiveInput={props.removeActiveInput} />
    </div>
  )
}
