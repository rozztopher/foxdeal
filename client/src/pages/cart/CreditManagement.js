import React, { useState,useEffect } from 'react'

const CreditManagement = (props) => {

    const [selectedPartners, setSelectedPartners] = useState([])
    const [allCredits, setAllCredits] = useState('all')
    const [result, setResult] = useState({});
    useEffect(() => {
        const sumValues = Object.keys(result).reduce((sum,key)=>sum+parseFloat(result[key]||0),0);
        props.setCoinsToUse(sumValues);
        props.setPartnerCoins(result);
      }, [result]);

    const updateSelectedPartners = (partner) => {
        let newList = [...selectedPartners]

        if(newList.includes(partner.name)) {
            newList = newList.filter(e => e !== partner.name)
            console.log('else',newList)
        } else {
            newList.push(partner.name)
        }        
        setSelectedPartners(newList)
            
        if(allCredits!='all'){                    
            setResult(prevState => ({...prevState,[partner.id]:0}))
        }else{                    
            props.setCoinsToUse(props.userCoins)
        }
        
    }

    const handleCreditRadio = (e) => {
        setAllCredits(e.currentTarget.value);
        if(e.currentTarget.value ==='all'){ 
            props.setCoinsToUse(props.userCoins) 
        }
    }
    
    const handleMax =   (partner,e,button) => {        
        if (button) return  setResult({...result, [partner.id]: partner.task.credits });
        if(partner.task.credits < e.target.value)  return  setResult({...result,[partner.id]: partner.task.credits});        
        setResult({ ...result,[e.target.name]: e.target.value});
          
    }

    return (
        <div className='billing-info-container gap-top-4'>
            <h3 className='sub-header'>Credits management:</h3>
            <div className='horizontal-divider mt-18'></div>
            <p className='highlight-text bold mt-35'>1. Select the partners you want to get credits</p>
            <div className='sub-container-grey mt-24'>
                <div className='card-grid-3'>
                    {props.userCompletedTasks.map(partner => {
                        return (
                            <div className='card-1 relative' onClick={() => updateSelectedPartners(partner)}>
                                <img src={partner.logo} alt='partner'></img>
                                <div className='bottom-info'>
                                    <p className='grey-text caption-text text-center'>voraussichtlicher Preis: <span className='highlight caption-text'>{partner.task.credits}</span></p>
                                </div>
                                <div className={selectedPartners.includes(partner.name) ? 'selected-circle' : 'unselected-circle'}>
                                    <img className='center-hv' src={selectedPartners.includes(partner.name) ? '/icons/tick-icon.svg' : '/icons/tick-grey-icon.svg'} alt='tick' style={{ width: '50%' }}></img>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <p className='highlight-text bold mt-35'>2. Select how many credits you want to use</p>
            <div className='sub-container-outline mt-24'>
                <input className='radio-input' type='radio' name='credits' id='all' value='all'  checked={allCredits === 'all'}  onChange={handleCreditRadio} ></input>
                <label className='small-header bold' htmlFor='all'>Use partner's credits <span className='highlight'>(CHF {props.coinsToUse} credits)</span></label>
                <div className='horizontal-divider mt-26'></div>
                <input className='radio-input mt-26' type='radio' name='credits' id='part' value='part' onChange={handleCreditRadio}></input>
                <label className='small-header bold' htmlFor='part'>Use part of partner's credits</label>
                {allCredits === 'part' &&
                    <>
                        <p className='price-text grey-text bold mt-35'>SPECIFY HOW MANY CREDITS YOU WANT TO USE IN EACH PARTNER</p>
                        <div className='card-grid-3 mt-12'>
                            {props.userCompletedTasks.map((partner) => {
                                if(selectedPartners.includes(partner.name) && allCredits === 'part') {                            
                                    return (
                                        <div className='card-1'>
                                            <img src={partner.logo} alt='partner' style={{marginTop: '-15px'}}></img>
                                            <div className='outline-button fill-button flex-edge' style={{justifyContent: 'space-around', marginTop: '-30px'}}>                                    
                                                <span className='body-text'> 
                                                <input type = "number" name={partner.task.id} value={result[partner.task.id]}  className='credit-input' min="0"   max = {partner.task.credits} onChange={e=>handleMax(partner, e, false)} />
                                                </span>
                                                <span className='grey-text caption-text' name= {partner.name} value = {partner.task.credits} onClick={(e) =>  handleMax(partner,e,true)} >USE MAX</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </>
                }
            </div>
            <div className='horizontal-divider mt-35'></div>
            <div className='flex-edge mt-30'>
                <p className='small-title'>Total credits you will use: {''}</p>
                <p className='small-title highlight'>CHF{props.coinsToUse}</p>
            </div>
        </div>
    )
}

export default CreditManagement