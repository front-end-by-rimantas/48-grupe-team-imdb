/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import style from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { charObj } from '../data/data';
import { GlobalContext } from '../../context/GlobalContext';

export function SignIn() {
    const { updateLoginStatus } = useContext(GlobalContext);

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function isValidEmail(text) {
        const emailMinLength = 6;
        const emailMaxLength = 50;
        const domainMinLength = 2;
        const domainMaxLength = 6;


        if (text.length < emailMinLength) {
            return 'Too short';
        }

        if (text.length > emailMaxLength) {
            return 'Too long';
        }

        let countAtTheRate = 0;
        let parts = null;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === '@') {
                countAtTheRate++;
            }
        }

        if (countAtTheRate === 1) {
            parts = text.split('@');
        } else {
            return 'The part after the @ should not contain the @ character';
        }

        const recipientName = parts[0];
        const domainNameParts = parts[1].split('.');
        const domain = domainNameParts[domainNameParts.length -1];
        const domainName = parts[1].slice(0, -(domain.length +1));
     
        const firstCharacter = recipientName[0];
        const lastCharacter = recipientName[recipientName.length -1];
        
        let recipientNameStr = '';
        let invalidCharacters = '';

        for (let i = 0; i < recipientName.length; i++) {
            //a-z
            //0-9
            //!# $ % & '* + - /.=?_
            const symbolAtCharCode = recipientName.charCodeAt(i);

            if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
                recipientNameStr += recipientName[i];
            } else if (recipientName[i] >= '0' && recipientName[i] <= '9') {
                recipientNameStr += recipientName[i];
            } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
                if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                    recipientNameStr += recipientName[i];
                } else invalidCharacters += recipientName[i];
            } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
                recipientNameStr += recipientName[i];
            } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
                if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                    recipientNameStr += recipientName[i];
                } else invalidCharacters += recipientName[i];
            } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
                if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                    recipientNameStr += recipientName[i];
                } else invalidCharacters += recipientName[i];
            } else invalidCharacters += recipientName[i];

        }

        let domainNameStr = '';
        let invalidDomainCharacters = '';
        let isIpAddress = '';

        for (let i = 0; i < domainName.length; i++) {
            //a-z
            //0-9
            //-.
            const symbolAtCharCode = domainName.charCodeAt(i);

            if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
                domainNameStr += domainName[i];
            } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
                domainNameStr += domainName[i];
            } else if (domainName[i] >= '0' && domainName[i] <= '9') {
                domainNameStr += domainName[i];
                isIpAddress += domainName[i];
            } else if (symbolAtCharCode === charObj.minus || symbolAtCharCode === charObj.dot) {
                if (firstCharacter !== domainName[i] && domainName[i] !== lastCharacter && domainName[i] !== domainName[i + 1]) {
                    domainNameStr += domainName[i];
                    if (symbolAtCharCode === charObj.dot) {
                        isIpAddress += domainName[i];
                    }
                } else invalidDomainCharacters += recipientName[i];
            } else invalidDomainCharacters += domainName[i];        
        }


        if (recipientName.length !== recipientNameStr.length) {
            return `"${invalidCharacters[0]}" Used in the wrong "${recipientName}" place`;
        }

        if (domainName.length !== domainNameStr.length) {
            return `"${invalidDomainCharacters[0]}" Used in the wrong "${domainName}" place`;
        }

        if (domain.length < domainMinLength) {
            return `Domain too short: ${domain}`;
        }

        if (domain.length > domainMaxLength) {
            return `Domain too long: ${domain}`;
        }

        if (domainName.length === isIpAddress.length) {
            return `"${isIpAddress}" Invalid format`;
        }

        return true;
    }

    function isValidPassword(text) {
        const passwordMinLength = 8;
        const passwordMaxLength = 50;
        const minimumLimit = 1;
        const valid = true;

        if (text.length < passwordMinLength) {
            return 'Too short';
        }

        if (text.length > passwordMaxLength) {
            return 'Too long';
        }

        let countLowerCaseLetters = 0;
        let countUpperCaseLetters = 0;
        let countNumbers = 0;

        let invalidPasswordStr = '';

        for (let i = 0; i < text.length; i++) {
            //a-z
            //0-9
            //!# $ % & '* + - /.=?_
            const symbolAtCharCode = text.charCodeAt(i);

            if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
                valid;
                countLowerCaseLetters++
            } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
                valid;
                countUpperCaseLetters++
            } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
                valid;
            } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
                valid;
            } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
                valid;
            } else if (text[i] >= '0' && text[i] <= '9') {
                valid;
                countNumbers++
            } else invalidPasswordStr += text[i];
        }
       
        if (invalidPasswordStr.length > 0) {
            return `This "${invalidPasswordStr}" symbol cannot be used`;
        }

        if (countLowerCaseLetters < minimumLimit) {
            return 'There must be at least one lowercase letter';
        }

        if (countUpperCaseLetters < minimumLimit) {
            return 'There must be at least one uppercase letter';
        }

        if (countNumbers < minimumLimit) {
            return 'There must be at least one number';
        }

        return true;
    }


    function handleFormSubmit(e) {
        e.preventDefault();

        const emailErrorValue = isValidEmail(email);
        const passwordErrorValue = isValidPassword(password);

        let isAllFormValid = true;

        if (emailErrorValue !== true) {
            isAllFormValid = false;
           setEmailErr(emailErrorValue);
        } else {
            setEmailErr('');
        }

        if (passwordErrorValue !== true) {
            isAllFormValid = false;
            setPasswordErr(passwordErrorValue);
        } else {
            setPasswordErr('');
        }

        if (isAllFormValid) {
            fetch('http://localhost:4840/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.loggedIn === true) {
                        updateLoginStatus(true);
                        navigate('/');
                    }
                })
                .catch(e => console.error(e));
            }
        }

    return (
        <div className={style.container}>
                <div className={style.leftColumn}>
                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <h1 className={style.title}>Sign in</h1>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Email</label>
                            <input value={email} onChange={handleEmailChange} className={style.input} type="email"/>
                            {emailErr.length === 0 ? null : <p className={style.error}>{emailErr}</p>}
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Password</label>
                            <input value={password} onChange={handlePasswordChange} className={style.input} type="password"/>
                            {passwordErr.length === 0 ? null : <p className={style.error}>{passwordErr}</p>}
                        </div>
                        <div className={style.formBtn}>
                            <button className={style.signInBtn} >Sign In for more access</button>
                        </div>
                    </form>
                    <div className={style.or}>or</div>
                    <div>
                        <Link className={style.signInBtn + ' ' + style.newAccountBtn} to="/sign-in/registration">Create a New Account</Link>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <h1 className={style.title} >Benefits of your free IMDb account</h1>
                    <p className={style.pTitle} >Personalized Recommendations</p>
                        <p className={style.paragraph} >Discover shows you'll love.</p>
                    <p className={style.pTitle} >Your Watchlist</p>
                        <p className={style.paragraph} >Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                    <p className={style.pTitle} >Your Ratings</p>
                        <p className={style.paragraph} >Rate and remember everything you've seen.</p>
                    <p className={style.pTitle} >Contribute to IMDb</p>
                        <p className={style.paragraph} >Add data that will be seen by millions of people and get cool badges.</p>
                </div>
        </div>
    )
}