import React from 'react'

const HomeInstructions = () => {

    return (
        <div className='instructions mt-85'>
            <div className='card-1 instruction-card'>
                <img src='/images/HAND1.png' alt='selecting and option'></img>
                <p className='small-header bold'>1. Such dir dein Wunschprodukt aus</p>
            </div>
            <div className='card-1 instruction-card'>
                <img src='/images/HAND2.png' alt='handshake'></img>
                <p className='small-header bold'>2. Wähle deinen Gönner und profitiere von einem epic Deal</p>
            </div>
            <div className='card-1 instruction-card'>
                <img src='/images/HAND3.png' alt='heart gesture'></img>
                <p className='small-header bold'>3. Home n’ Chill! Du bekommst dein Wunschprodukt bequem nach Hause geliefert</p>
            </div>
        </div>
    )
}

export default HomeInstructions