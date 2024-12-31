import React from 'react'
import "./inner-cards.css"
// import HeaderComponent from '../header/HeaderComponent'

function InnerCards(
   { innercarddiv, card_title}
) {
  return (
    <div className='CardComponent' style={{height:"auto", width:"auto",}}>
        <div >
          {/* <HeaderComponent
          title={card_title}
          /> */}
            {innercarddiv}
        </div>



    </div>
  )
}

export default InnerCards