import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
const CartSummary = (props) => {

    const {removeProduct} = useContext(UserContext)
    const cartTotal= props.cartItems.length? props.cartItems.reduce((a, b) => a + (b.price/2 || 0), 0) : 0;
    const vat = props.cartItems.length? (19/cartTotal) *100 : 0;
    const deliveryCharges= props.cartItems.length? 3.99 : 0;
    const gTotal = props.cartItems.length? (cartTotal + vat + deliveryCharges) - props.coinsToUse : 0;
    return (
        <div className='cart-summary-container'>
            <p className='title'>Order summary</p>
            {props.cartItems.map(item => {
                return(
                    <div className='order-summary-product-view gap-top-2'>
                    <img src={item.image.src } alt='watch'></img>
                    <div>
                        <div className='cart-summary-product__info-remove' onClick={() => removeProduct(item)}> 
                            <img src='/images/remove.svg' alt='remove product' ></img> 
                        </div>
                        <p className='body-text'> {item.title}</p>
                        <div className='horizontal-divider mt-8'></div>
                        <div className='flex-edge mt-4'>
                            <p className='caption-text'>The lowest price:</p>
                            <p className='highlight caption-text'><span className='chf'>CHF </span>{(item.price/2).toFixed(2)}</p>
                        </div>
                    </div>
                </div>   
                )
                
            })
            }            
            <div className='horizontal-divider mt-20'></div>
            <div className='cost-summary-container mt-20 body-text'>
            {props.cartItems.map(item => {
                return(
                    <div className='flex-edge mt-7'>
                    <p className='grey-text chf'>{item.title}:</p>
                    <p className='grey-text body-text'><span className='chf'>CHF </span>{(item.price/2).toFixed(2)}</p>
                    </div>
                )
                
            })
            }
                <div className='flex-edge mt-16'>
                    <p className='grey-text chf'>Versand:</p>
                    <p className='grey-text body-text'><span className='chf'>CHF </span>  { cartTotal > 0 ? 3.99 : 0}</p>
                </div>
                <div className='flex-edge mt-16'>
                    <p className='grey-text chf'>Nettosumme:</p>
                    <p className='grey-text body-text'><span className='chf'>CHF </span> { ( cartTotal > 0 ?  (cartTotal + 3.99) : 0).toFixed(2)}</p>
                </div>
                <div className='flex-edge mt-16'>
                    <p className='grey-text chf'>Umsatzsteuer (19%):</p>
                    <p className='grey-text body-text'><span className='chf'>CHF </span> {vat.toFixed(2)}</p>
                </div>
                <div className='flex-edge mt-16'>
                    <p className='grey-text chf'>Auf Gönner’s Nacken:</p>
                    <p className='edge-row-right body-text'>-<span className='chf'>CHF </span> { cartTotal > 0 ? props.coinsToUse : 0 }</p>
                </div>
            </div>
            <div className='horizontal-divider mt-20'></div>
            <div className='flex-edge mt-20'>
                <p className='summary-text'>Gesamtwert:</p>
                <p className='edge-row-right'><span className='chf'>CHF </span>{gTotal.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CartSummary