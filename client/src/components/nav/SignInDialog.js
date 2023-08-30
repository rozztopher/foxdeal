import React, { forwardRef, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import dbClient from '../../utils/dbClient'

const Transition = forwardRef(function Transition(props, ref) {
    const { classes,...other } = props;
    return <Slide direction='up'  ref={ref} {...other} />
})

function SignInDialog(props) {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('')

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const switchDialog = () => {        
        props.handleClose()
        props.switchDialog()
    }

    const submitForm = async () => {  
        setError(null)      
        try {
            const response = await dbClient.post('/auth/login', {
                email: email,
                password: password
            })
            if(response.data.user) {                
                response.data.user.jwtToken = response.data.jwtToken;
                props.signIn(response.data.user)
                props.handleClose()
            }
        } catch (err) {

                err.response ? setError(err.response.data.message) : setError('ungültige Zugangsdaten!')
            
        }
        // if(email === 'goenni@gmail.com' && password === 'fox') {
        //     const user = {
        //         email: email,
        //         name: 'Gönni Fox',
        //         credits: 99,
        //         telephone: '00000000000',
        //         dob: '01/01/2001'
        //     }
        // }
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            // classes={{paper: {
            //     width: '100vw'
            // }}}
        > 
        <div className='error-message text-center' >  {error ? error : ''} </div>
          
        
            <DialogTitle className='text-center'>{"Sign in"}</DialogTitle>
            <DialogContent>
                <form>
                    <input className='form-input' id='su-email' placeholder='Email' onChange={handleEmailInput}></input>
                    <input type='password' className='form-input mt-10' id='su-password' placeholder='Passwort' onChange={handlePasswordInput}></input>
                </form>
                <div className='cta-button blue fill-button mt-30' onClick={submitForm}>Sign in</div>
                <div className='flex-edge mt-38'>
                    <div onClick={switchDialog}>
                        <p className='body-text grey-text'>
                            Noch kein Glückspilz?&nbsp;<span className='hyperlink'>&nbsp;Registrier’ dich jetzt</span>
                        </p>
                    </div>
                    <p className='body-text underline grey-text' onClick={props.resetPassword}>Passwort vergessen? Hier lang</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog