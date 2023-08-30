import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {

  return (
    <div className='thank-you-container footer-margin'>
        <img src='/images/clapping-hand.png' alt='clapping'></img>
        <p className='huge-text bold'><span className='highlight bold gap-top-2'> Danke</span> für dein Vertrauen, wir feiern dich!</p>
        <p className='grey-text gap-top-2'>Dein Deal wurde bestätigt und ist asap bei dir.</p>
        <div className='horizontal-divider gap-top-2'></div>
        <Link style={{textDecoration: 'none'}} to='/' id='home-link'>
            <div className='cta-blue-button wide-button gap-top-2'>Mehr Dealz!</div>
        </Link>
    </div>
  )
}

export default ThankYou