import React, {useState,useEffect} from 'react'
import InputField from '../../components/InputField'
import { onBlurListener } from './validators'

const PaymentInfo = (props) => {

    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvc, setCvc] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('credit-card')

    const verifyPaymentInfo = () =>{
        let visaRe = /^4[0-9]{12}(?:[0-9]{3})?$/g, 
            mastercardRe = /^5[1-5][0-9]{14}$/g;
        let datumRe = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/g;
        let cvcRe = /^[0-9]{3,4}$/g;
        return (visaRe.test(cardNumber.replace(/\s/g,'')) || mastercardRe.test(cardNumber.replace(/\s/g,'')))
               && datumRe.test(expiryDate)
               && cvcRe.test(cvc)
    }

    useEffect(() => {
        props.setIsCartValid(prevState => ({...prevState,isPaymentInfoCorrect:verifyPaymentInfo()}))
        props.setCartInfo({cardNumber,cvc,expiryDate})
    }, [])

    useEffect(() => {
        props.setIsCartValid(prevState => ({...prevState,isPaymentInfoCorrect:verifyPaymentInfo()}))
        props.setCartInfo({cardNumber,cvc,expiryDate})
    }, [cardNumber,expiryDate,cvc])
        
    return (
        <div className='billing-info-container gap-top-4'>
            <h3 className='sub-header'>So zahl’ ich:</h3>
            <form className='cart-payment-form mt-30' onBlur={onBlurListener}>
                <div>
                    <input className='radio-input' type='radio' id='paypal' value='paypal' name='method' onClick={e=> setPaymentMethod(e.currentTarget.value)}></input>
                    <img src='/icons/paypal-logo.svg' alt='paypal' style={{width: '15%'}} className='gap-left-05'></img>
                </div>
                <div className='horizontal-divider mt-25'></div>
                <div className='flex-edge gap mt-25'>
                    <div>
                        <input className='radio-input' type='radio' id='credit-card' value='credit-card' name='method' checked={paymentMethod === 'credit-card'} onClick={e=> setPaymentMethod(e.currentTarget.value)} ></input>
                        <label className='small-header' htmlFor="credit-card">Kredit- oder Debitkarte</label>
                    </div>
                    <div>
                        <div className='inline'>
                            <img src='/icons/visa-icon.svg' alt='visa'></img>
                            <img className='gap-left-1' src='/icons/mastercard-icon.svg' alt='visa'></img>
                        </div>
                    </div>
                </div>
                <div className='gap-top-6 form-full-width'>
                    <InputField
                        name={'Kartnennummer'}
                        id="Kartnennummer"
                        value={cardNumber}
                        set={setCardNumber}
                        icon={'/icons/form-card-icon.svg'}
                        placeholder = "4242 4242 4242 4242"
                        required = {true}
                    />
                </div>
                <div className='small-inputs-grid gap-top-2'>
                    <InputField
                        name={'Ablaufdatum'}
                        id='Ablaufdatum'
                        value={expiryDate}
                        set={setExpiryDate}
                        icon={'/icons/form-date-icon.svg'}
                        required = {true}
                        placeholder = "12/25"
                        maxLength= "5"
                    />
                    <InputField
                        name={'CVC/CVV'}
                        id='CVC/CVV'
                        value={cvc}
                        set={setCvc}
                        icon={'/icons/form-lock-icon.svg'}
                        placeholder = "404"
                        maxLength='3'
                        required = {true}            
                    />
                </div>
                <p className='caption-text grey-text mt-30'>Deine Transaktion ist mit SSL-Verschlüsselung gesichert</p>
            </form>
        </div>
    )
}

export default PaymentInfo