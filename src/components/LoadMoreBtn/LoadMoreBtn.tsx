import React from 'react'
import {LoadMoreBtnProps} from './LoadMoreBtn.types'

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({onClick}) => {
  return (
    <div>
      <button onClick={onClick}>Load more</button>
    </div>
  )
}
export default LoadMoreBtn
