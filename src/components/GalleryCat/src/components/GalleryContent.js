// import {cardList} from '../scriptsSSS/constants'
import Card from './Card'
import React from 'react'

export default function GalleryContent (props) {

  return (
    <main className="contentCat">
      <section className="galleryCat content__section">
        <ul className="gallery__list">
          {props.cardList.map((item, ind) => (
            <Card key={item.id} card={item} ind={ind} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}


