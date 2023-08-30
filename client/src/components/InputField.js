import React from 'react';

function InputField(props) {
    let {name}= props;
    let handleChange = null;
    if(name === 'Kartnennummer'){
        handleChange = (e) => {
            let value = e.target.value;
            let valueWithoutSpace = value.replace(/\s/g,'');
           
            if(valueWithoutSpace.length % 4 === 0){
                props.set(prevValue => {
                    if(prevValue.length > value.length || value[value.length-1 === ' ']){
                        return value
                    }
                    else{
                        return value + ' '
                    }
                })
            }
            else{
                props.set(value)
            }
        }
    }
    else{
        handleChange = (e) => props.set(e.target.value)
    }
    return (
        <div style={{position: 'relative'}}>
            {props.icon &&
                <img
                    src={props.icon}
                    alt='form icon'
                    style={{
                        position: 'absolute',
                        top: '57.5%',
                        marginLeft: '30px',
                        zIndex: 2
                    }}
                />
            }
            <label
                className='grey-text price-text'
                htmlFor={props.name}>
                    {props.name}
            </label>
            <input
                id={props.name}
                value={props.value}
                onChange={handleChange}
                maxLength= {props.maxLength}
                placeholder={props.placeholder}                
                style={{
                    height: '56px',
                    width: '100%',
                    background: '#FFFFFF',
                    boxShadow: '0px 14px 90px rgba(0, 0, 0, 0.06)',
                    backdropFilter: 'blur(57px)',    
                    borderRadius: '35px',
                    paddingLleft: '10px',
                    border: '2px solid #F0F2F6',
                    paddingLeft: props.icon ? '50px' : '25px',
                    boxSizing: 'border-box'
                }}
                

            />
        </div>
    );
}

export default InputField