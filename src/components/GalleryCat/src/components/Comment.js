import React from 'react'

export default function Comment ({comment}) {
  return (
    <div className="popup__comment">
      <p className="popup__text">{comment.text}</p>
      <p className="popup__date">{comment.date}</p>
    </div>
  )
}
