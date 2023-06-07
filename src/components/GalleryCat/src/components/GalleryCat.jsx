import React from 'react'
import GalleryContent from './GalleryContent'
import Popup from './Popup'
import '../css/IndexGalleryCat.css'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GalleryCat = (props) => {
// debugger
  let cardList = props.cardList
  const [selectedCard, setSelectedCard] = React.useState(null)

  const closePopup = () => {
    setSelectedCard(null)
  }

  const handleCardClick = (card, i) => {
    setSelectedCard(card)
    setInd(i)
  }

  const [ind, setInd] = React.useState(null)

  const handlePrevCard = () => {
    setSelectedCard(cardList[ind - 1])
    setInd(ind - 1)
  }

  const handleNextCard = (props) => {
    setSelectedCard(cardList[ind + 1])
    setInd(ind + 1)
    props.removeActiveInput()
  }

  if (!props.isAuth) {return <Navigate to='/login' />} 

  return (
    <>
      <GalleryContent onCardClick={handleCardClick} cardList={cardList} />
      <Popup
        card={selectedCard}
        onClose={closePopup}
        prevCard={handlePrevCard}
        nextCard={handleNextCard}
        removeActiveInput={props.removeActiveInput}
        store={props.store}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {
      isAuth : state.auth.isAuth,
      cardList : state.cardList
  }
}


export default connect(mapStateToProps, {} )(GalleryCat)

