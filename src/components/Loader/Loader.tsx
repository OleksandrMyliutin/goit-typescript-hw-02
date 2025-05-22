import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = ({loading}: {loading:boolean}) => {
  return (
    <div>
      <ClipLoader color={"#00ffff"} loading={loading} size={60} aria-label="SyncLoader" data-testid="loader"/>
    </div>
  )
}

export default Loader
