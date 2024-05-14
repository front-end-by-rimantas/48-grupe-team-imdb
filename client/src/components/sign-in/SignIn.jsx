/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import style from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { charObj } from '../data/data';
import { GlobalContext } from '../../context/GlobalContext';
import { TbUfo } from "react-icons/tb";

export function SignIn() {
    const { updateLoginStatus, updateUserId } = useContext(GlobalContext);

    const [messageErr, setMessageErr] = useState('');

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    
    const navigate = useNavigate();
    const mErr = messageErr.length === 0;
    const eError = emailErr.length === 0;
    const pError = passwordErr.length === 0;


    const errorScreen = (
            <div className={style.errorMessage}>
                <p className={style.paragraphErr}><span className={style.ufo}><TbUfo /></span>Houston, we have a problem.</p>
                {mErr ? null : <li className={style.error}>{messageErr}</li>}
                {eError ? null : <li className={style.error}>{emailErr}</li>}
                {pError ? null : <li className={style.error}>{passwordErr}</li>}
            </div>
    );

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
        const domainPartsMinLength = 2;
       
        if (text.length < emailMinLength) {
            return 'Email is too short.';
        }
    
        if (text.length > emailMaxLength) {
            return 'Email is too long.';
        }
    
        let countAtTheRate = 0;
        let parts = null;
    
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '@') {
                countAtTheRate++;
            }
        }
    
        
        if (countAtTheRate > 1) {
            return 'The part after the @ should not contain the @ character.';
        }else if (countAtTheRate < 1) {
            return 'The @ symbol is missing.'
        }else {
            parts = text.split('@');
        }
    
        const recipientName = parts[0].length < domainPartsMinLength ? '' : parts[0];
        const domainNameParts = parts[1] < domainPartsMinLength ? '' : parts[1].split('.');
        const domain = domainNameParts.length < domainPartsMinLength ? '' : domainNameParts[domainNameParts.length -1];
        const domainName = parts[1].slice(0, -(domain.length +1)).length < 1 ? '' : parts[1].slice(0, -(domain.length +1));
    
        if (domainNameParts.length === 0) {
            return 'Incomplete email mail adress.'
        }
    
        if (recipientName.length === 0) {
            return 'Missing recipient name.'
        }
    
        if (domainName.length === 0) {
            return 'Missing domain name.'
        }
    
        if (!isNaN(+ domain)) {
            return `${domain} Invalid domain format.`
        }
     
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
    
        const firstCharacterDomainN = domainName[0];
        const lastCharacterDomainN = domainName[domainName.length -1];
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
                if (firstCharacterDomainN !== domainName[i] && domainName[i] !== lastCharacterDomainN && domainName[i] !== domainName[i + 1]) {
                    domainNameStr += domainName[i];
                    if (symbolAtCharCode === charObj.dot) {
                        isIpAddress += domainName[i];
                    }
                } else invalidDomainCharacters += domainName[i];
            } else invalidDomainCharacters += domainName[i];        
        }
    
    
        if (recipientName.length !== recipientNameStr.length) {
            return `"${invalidCharacters[0]}" Used in the wrong "${recipientName}" place`;
        }
    
        if (domainName.length !== domainNameStr.length) {
            return `"${invalidDomainCharacters[0]}" Used in the wrong ${domainName} place`;
        }
    
        if (domain.length === 0) {
            return `The domain is missing.`;
        }
    
        if (domain.length < domainMinLength) {
            return `Domain too short: ${domain}.`;
        }
    
        if (domain.length > domainMaxLength) {
            return `Domain too long: ${domain}.`;
        }
    
        const ipArr = isIpAddress.split('.');
        const isIpArr = ipArr[ipArr.length -1] === '' ? ipArr.slice(0, -1) : ipArr;
        const isIpStr = isIpArr.join('.');
        let isIp = true;
        if (isIpArr.length === 4) {
            const numArr = [];
            for (let i = 0; i < isIpArr.length; i++) {
                const num = (+ isIpArr[i]);
                if (num >= 0 && num <= 255) {
                    numArr.push('' + num);
                }
            }
        
            isIp = numArr.join('.') === isIpStr;
            if (isIp === true) {
                 return `"${isIpStr}" Nice Ip ;)`;
            }
        }
        
        return true;
    }
    

    function isValidPassword(text) {
        const passwordMinLength = 8;
        const passwordMaxLength = 50;
        const minimumLimit = 1;
        const valid = true;

        if (text.length < passwordMinLength) {
            return 'Passwords must be at least 8 characters.';
        }

        if (text.length > passwordMaxLength) {
            return 'Password is too long.';
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
            fetch('http://localhost:4840/user/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setMessageErr(data.message);
                    if (data.loggedIn === true) {
                        updateLoginStatus(true);
                        updateUserId(data.userId)
                        navigate('/');
                    }
                })
                .catch(e => console.error(e));
            }
        }

    return (
        <div className={style.container}>
                <div className={style.leftColumn}>
                {mErr  && eError && pError ? null : errorScreen}
                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <h1 className={style.title}>Login</h1>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Email</label>
                            <input value={email} onChange={handleEmailChange} className={eError ? style.input : style.inputErr} type="email"/>
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Password</label>
                            <input value={password} onChange={handlePasswordChange} className={pError ? style.input : style.inputErr} type="password"/>
                        </div>
                        <div className={style.formBtn}>
                            <button className={style.signInBtn} >Login for more access</button>
                        </div>
                    </form>
                    <div className={style.or}>or</div>
                    <div>
                        <Link className={style.signInBtn + ' ' + style.newAccountBtn} to="/registration">Create a New Account</Link>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <h2 className={style.title} >Benefits of your free IMDb account</h2>
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