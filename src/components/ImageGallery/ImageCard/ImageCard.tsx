import React from 'react'
import {ImageCardProps} from './ImageCard.types'

const ImageCard = ({item} : ImageCardProps) => {
  return (
    <div>
      <img src = {item.urls.small} alt={item.alt_description} />
    </div>
  )
}

export default ImageCard
