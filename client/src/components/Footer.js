import React from 'react';
import { Link } from 'react-router-dom'

function Footer() {

    const navStyle = {
        textDecoration: 'none'
    }

    return (
        <div className='footer'>
            <div className='footer-container' style={{marginTop: '-13px'}}>
                <div className='footer-content'>
                    <Link style={navStyle} to='/'>
                        <img src='/images/foxdeal-logo-white.svg' alt='foxdeal logo' id='nav-logo'></img>
                    </Link>
                    <div className='divider charcoal gap-left-55'></div>
                    <ul className='nav-links gap-left-55'>
                        <div className='nav-option'>
                            <Link style={navStyle} to='/products' id='products-link'>
                                <li className='bold' style={{color: '#AEAEAF'}}>Produkte</li>
                            </Link>
                        </div>
                        <div className='gap-left-60'></div>
                        <div className='nav-option'>
                            <Link style={navStyle} to='/partners' id='partners-link'>
                                <li className='bold' style={{color: '#AEAEAF'}}>Gönner</li>
                            </Link>
                        </div>
                    </ul>
                </div>
                <div className='footer-payment'>
                    <div className='payment-chip'>
                        <img className='center-hv' src='/icons/visa-icon.svg' alt='visa'></img>
                    </div>
                    <div className='payment-chip gap-left-15'>
                        <img className='center-hv' src='/icons/mastercard-icon.svg' alt='mastercard'></img>
                    </div>
                </div>
            </div>
            <div className='footer-rights'>
                <p className='caption-text light-grey-text text-center'>© 2021 FoxDeal. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer