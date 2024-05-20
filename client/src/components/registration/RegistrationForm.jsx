import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { charObj } from '../data/data';
import { alphabetLtObj } from '../data/data';
import style from './RegistrationForm.module.css';
import logo from '../../assets/images/logo/imdb_logo.png';
import { TbUfo } from "react-icons/tb";

export function RegistrationForm() {
    const [messageErr, setMessageErr] = useState('');
    
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordErr, setRepeatPasswordErr] = useState('');
    

    const navigate = useNavigate();
    const mErr = messageErr.length === 0;
    const uError = usernameErr.length === 0;
    const eError = emailErr.length === 0;
    const pError = passwordErr.length === 0;
    const rpError = repeatPasswordErr.length === 0;

    const errorScreen = (
            <div className={style.errorMessage}>
                <p className={style.paragraphErr}><span className={style.ufo}><TbUfo /></span>Houston, we have a problem.</p>
                {mErr ? null : <li className={style.error}>{messageErr}</li>}
                {uError ? null : <li className={style.error}>{usernameErr}</li>}
                {eError ? null : <li className={style.error}>{emailErr}</li>}
                {pError ? null : <li className={style.error}>{passwordErr}</li>}
                {rpError ? null : <li className={style.error}>{repeatPasswordErr}</li>}
            </div>
    );

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleRepeatPasswordChange(e) {
        setRepeatPassword(e.target.value);
    }

    function isValidUsername(text) {

        if (text.length < 1) {
            return 'The name is too short.';
        }

        if (text.length > 20) {
            return 'The name is too long.';
        }

        const valid = true;
        let invalidSymbols = '';

        for (let i = 0; i < text.length; i++) {
            //a-z
            //ąčęėįšųūž
            const letterLt = alphabetLtObj[text[i]];
            const symbolAtCharCode = text.charCodeAt(i);

            if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
                valid;
            } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
                valid;
            } else if (letterLt) {
                valid;
            } else invalidSymbols += text[i];
        }

        if (invalidSymbols.length > 0) {
            return `This "${invalidSymbols}" symbol cannot be used.`;
        }

        return true;
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

        const usernameErrorValue = isValidUsername(username);
        const emailErrorValue = isValidEmail(email);
        const passwordErrorValue = isValidPassword(password)
        
        let isAllFormValid = true;

        if (usernameErrorValue !== true) {
            isAllFormValid = false;
            setUsernameErr(usernameErrorValue);
        } else {
            setUsernameErr('');
        }

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

        if (password !== repeatPassword) {
            isAllFormValid = false;
            setRepeatPasswordErr('Passwords do not match');
        } else {
            setRepeatPasswordErr('');
        }

        if (isAllFormValid) {
                    fetch('http://localhost:4840/user/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setMessageErr(data.message);
                    if (data.register === true) {
                        navigate('/login')
                    }
                })
                .catch(e => console.error(e));
                }
        }

    return (
    <div className={style.main}>
        <div className={style.logoBox}>
            <Link to="/"><img className={style.registrationLogo} src={logo} alt="Logo"/></Link>
        </div>
        {mErr && uError && eError && pError && rpError ? null : errorScreen}
        <div className={style.form}>
              <span className={style.title}>
                  <h1 className={style.title}>Create account</h1>
              </span>
              <form onSubmit={handleFormSubmit} className={style.context}>
                  <div className={style.formRow}>
                      <label className={style.label} htmlFor="">Your name</label>
                      <input value={username} onChange={handleUsernameChange} className={uError ? style.input : style.inputErr} type="text" placeholder="First and last name" />
                  </div>
                  <div className={style.formRow}>
                      <label className={style.label} htmlFor="">Email</label>
                      <input value={email} onChange={handleEmailChange} className={eError ? style.input : style.inputErr} type="email" placeholder="" />              
                  </div>
                  <div className={style.formRow}>
                      <label className={style.label} htmlFor="">Password</label>
                      <input value={password} onChange={handlePasswordChange} className={pError ? style.input : style.inputErr} type="password" placeholder="at least 8 charachters" />
                  </div>
                  <div className={style.formRow}>
                      <label className={style.label} htmlFor="">Re-enter password</label>
                      <input value={repeatPassword} onChange={handleRepeatPasswordChange} className={rpError ? style.input : style.inputErr} type="password" placeholder=" " />
                  </div>
                  <div className={style.formRow}>
                      <button className={`${style.button} ${style.textButton}`}  type="submit">Create your IMDb account</button>
                  </div>
                  <div className={style.haveAccount}>
                      <p>Already have an account?<span className={style.linkSignIn}><Link to={'/login'}>login</Link></span> </p>
                  </div>
              </form>
          </div>
    </div>
    );                                                 
}
    
