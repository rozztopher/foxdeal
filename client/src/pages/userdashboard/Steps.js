import React from 'react'

const Steps = () => {

    function scrollToElement(e) {
        const y = e.getBoundingClientRect().top + window.pageYOffset + (-120);
        window.scrollTo({top: y, behavior: 'smooth'})
    }

    return (
        <div>
        {window.innerWidth > 428 &&
        <div className='steps-container'>
        <div className='inline mt-4 pointer' onClick={() => scrollToElement(document.getElementById('personal-info'))}>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/user-icon.svg' alt='user icon'></img>
            </div>
            <p className='body-text'>Meine Informationen</p>
        </div>
        <div className='horizontal-divider mt-15'></div>
        <h3 className='grey-text price-text mt-19'>STEPS FOR CHECKOUT</h3>
        <div className='inline mt-12 pointer' onClick={() => scrollToElement(document.getElementById('ud-products'))}>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/star-icon.svg' alt='star icon'></img>
            </div>
            <p className='grey-text body-text'>1. Lieblingsprodukt aussuchen</p>
        </div>
        <div className='inline mt-12 pointer' onClick={() => scrollToElement(document.getElementById('ud-partners'))}>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/bag-icon.svg' alt='bag icon'></img>
            </div>
            <p className='grey-text body-text'>2. Gönner wählen</p>
        </div>
        <div className='horizontal-divider mt-118'></div>
        <div className='inline mt-15'>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/card-icon.svg' alt='card icon'></img>
            </div>
            <p className='grey-text body-text'>3. Deal!</p>
        </div>
    </div>
        }
        {window.innerWidth <= 428 &&
        <div className='steps-mobile-container'>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/user-icon.svg' alt='user icon'></img>
            </div>
            <div className='vertical-divider'></div>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/star-icon.svg' alt='star icon'></img>
            </div>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/bag-icon.svg' alt='bag icon'></img>
            </div>
            <div className='vertical-divider'></div>
            <div className='icon-container'>
                <img className='center-hv' src='/icons/card-icon.svg' alt='card icon'></img>
            </div>
        </div>
        }
        </div>
    )
}

export default Steps