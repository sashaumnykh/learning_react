import React, { useState, useEffect } from "react";

function LogInForm({login}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFieldVisited, setEmailFieldVisited] = useState(false);
    const [passwordFieldVisited, setPasswordFieldVisited] = useState(false);
    const [emailError, setEmailError] = useState('email cannot be empty.');
    const [passwordError, setPasswordError] = useState('password cannot be empty.');

    const submitHandler = e => {
        e.preventDefault();
        login({email, password});
    }

    const [isInputValid, setIsInputValid] = useState(false);

    useEffect( () => {
        (emailError || passwordError) ? setIsInputValid(false) : setIsInputValid(true);
    }, [emailError, passwordError]);

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email': {
                setEmailFieldVisited(true);
                break;
            }
            case 'password': {
                setPasswordFieldVisited(true);
                break;
            }
            default: {
                alert('sos!');
                break;
            }
        }
    };

    const handleEmailInput = (e) => {
        let email = e.target.value;
        setEmail(email);
        /*{
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(regexEmail.test(String(email).toLowerCase()));
        regexEmail.test(String(email).toLowerCase()) 
            ? setEmailError('')
            : setEmailError('email is incorrect.');
        } */
        setEmailError('');
    }

    const handlePasswordInput = (e) => {
        let password = e.target.value;
        setPassword(password);
        if (String(password).trim() !== '') {
            setPasswordError('');
        }
    }

    return(
        <form className='f-out' onSubmit={submitHandler}>
            <div className="f-in">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">email:</label>
                    <input type="text" name="email" id="email" value={email} onBlur={e => blurHandle(e)} onChange={e => handleEmailInput(e)}/>
                    {(emailFieldVisited && emailError) && <div className='error-message'>{emailError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">password:</label>
                    <input type="text" name="password" id="password" value={password} onBlur={e => blurHandle(e)} onChange={e => handlePasswordInput(e)}/>
                    {(passwordFieldVisited && passwordError) && <div className='error-message'>{passwordError}</div>}
                </div>
                <input type="submit" value="LOGIN" disabled={!isInputValid}/>
            </div>
        </form>
    );
}

export default LogInForm;