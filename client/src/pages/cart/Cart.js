import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext';
import BillingInfo from './BillingInfo'
import PaymentInfo from './PaymentInfo'
import CartSummary from './CartSummary'
import { Link,useHistory } from 'react-router-dom'
import CreditManagement from './CreditManagement'
import dbClient from '../../utils/dbClient'


const Cart = () => {    
    const { user, signIn,selectedProducts,  resetProducts, userCompletedTasks } = useContext(UserContext);    
    const [coinsToUse, setCoinsToUse] = useState(user ?user.credits: 0);
    const [cartTotal, setCartTotal] = useState(0);
    const [partnerCoins, setPartnerCoins] = useState({});

    const [cartInfo,setCartInfo]  = useState({
        cardNumber:'',
        cvc:'',
        expiryDate:''
    })
    const [isCartValid,setIsCartValid] = useState({
        isBillingInfoCorrect:false,
        isPaymentInfoCorrect:false
    })

    const [isFormValid,setIsFormValid] = useState(false)
    const history = useHistory()
    const handlePayment = async (e)=>{
         e.preventDefault();
         let productIds   = await selectedProducts.map(item=> item.id);          
         const headers = {
            'Content-Type': 'application/json',
            'Authorization': user.jwtToken
        };
        try {
            const response = await dbClient.post('/user/checkout', {cartInfo:cartInfo,credits: coinsToUse, totalCoins: cartTotal.toFixed(2), products: productIds, partnerCoins: partnerCoins}, {
                headers: headers
            }) 
            user.credits = response.data.credits;            
            resetProducts();
            signIn(user);
            
            return history.push('/thankyou')
            
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
            const cartTotal= selectedProducts.length? selectedProducts.reduce((a, b) => a + (b.price/2 || 0), 0) : 0;
            const tax = selectedProducts.length? (19/cartTotal) *100 : 0;
            const deliveryCharges= selectedProducts.length? 3.99 : 0;

            if (cartTotal < coinsToUse) setCoinsToUse(cartTotal.toFixed(2)); 
            const gTotal = selectedProducts.length? (cartTotal + tax + deliveryCharges) - coinsToUse : 0;
            setCartTotal(gTotal);
        }, []);
        
    useEffect(() =>{
        setIsFormValid(Object.values(isCartValid).every(e => e))
    },[isCartValid])

    useEffect(() => {
        console.log(isFormValid)
    },[isFormValid])
    
    
    return (
        <div>
            {window.innerWidth <= 428 &&
                <div className='cart-grid footer-margin'>
                    <div>
                        <CartSummary  setCoinsToUse = {setCoinsToUse} cartItems={selectedProducts}  coinsToUse = {coinsToUse} setCartTotal = {setCartTotal} />
                        <div className={'cart-inputs-container' + window.innerWidth <= 428 ? ' mt-20' : ''}>
                            <BillingInfo isCartValid={isCartValid} setIsCartValid={setIsCartValid}/>
                            <CreditManagement partnerCoins = {partnerCoins} setPartnerCoins ={setPartnerCoins} userCompletedTasks={userCompletedTasks} userCoins = {user.credits} coinsToUse = {coinsToUse} setCoinsToUse = {setCoinsToUse} />
                            <PaymentInfo cartInfo={cartInfo} setCartInfo={setCartInfo} isCartValid={isCartValid} setIsCartValid={setIsCartValid}  />
                            <Link style={{ textDecoration: 'none' }} to='/thankyou' id='thankyou-link'>
                                <div className='button-disabled bw-229 mt-40'>Checkout (CHF215.00)</div>
                            </Link>
                        </div>
                    </div>
                </div>
            }
            {window.innerWidth > 428 &&
                <div className='cart-grid footer-margin'>

                    <div>
                        <div className='cart-inputs-container'>
                            <BillingInfo isCartValid={isCartValid} setIsCartValid={setIsCartValid}/>
                            <CreditManagement partnerCoins = {partnerCoins} setPartnerCoins ={setPartnerCoins} userCompletedTasks={userCompletedTasks} userCoins = {user.credits} coinsToUse = {coinsToUse} setCoinsToUse = {setCoinsToUse}   />
                            <PaymentInfo  cartInfo={cartInfo} setCartInfo={setCartInfo}  isCartValid={isCartValid} setIsCartValid={setIsCartValid} />
                            <Link className={isFormValid && selectedProducts.length > 0?'active_anchor bw-229':'disabled_anchor bw-229'} style={{ textDecoration: 'none' }} to='/thankyou' id='thankyou-link' onClick={isFormValid && selectedProducts.length > 0 ? handlePayment : null}>
                                <div className={isFormValid && selectedProducts.length > 0?'active_link bw-229 mt-40':'disabled_link bw-229 mt-40'} >DEAL! (CHF {cartTotal.toFixed(2)})</div>
                            </Link>
                        </div>
                    </div>
                    <CartSummary  cartItems={selectedProducts} coinsToUse = {coinsToUse} setCoinsToUse = {setCoinsToUse} setCartTotal = {setCartTotal}/>

                </div>
            }
        </div>
    )
}

export default Cart