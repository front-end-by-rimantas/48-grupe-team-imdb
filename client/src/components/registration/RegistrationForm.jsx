import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiInfoLarge } from 'react-icons/ti';
import { BiError } from "react-icons/bi";
import style from './RegistrationForm.module.css';
import logo from '../../assets/images/logo/imdb_logo.png';

export function RegistrationForm() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    
    const [usernameErr, setUsernameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [repeatPasswordErr, setRepeatPasswordErr] = useState('');

    const navigate = useNavigate();

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

    function CapsLock(username) {
        return username === username.toUpperCase();
    }

    function isValidUsername(username) {
        if (!username.trim()) {
            return 'Username is required.';
        }
        if (username.length > 25) {
            return 'The text is too long, please write shorter!';
        }
        if(typeof username === 'number'){
            return 'Username cannot contain numbers.';
        }
        if(CapsLock(username)){
            return 'Username cannot contain uppercase letter.';
        }
        const symbol = [',', ':', '*', '&', '^', '%', '$', '#', '@', '!'];
        if (symbol.some(n => username.includes(n))) {
            return 'Username cannot contain special characters , : * & ^ % $ # @ !';
        }
           
        return true;
    }

    function isValidEmail() {
        if (!email.trim()) {
            return 'Email is required.';         
        }
        if (email.length < 6) {
            return 'Email is too shorter.';
        }
        if (email.length > 30) {
            return 'Email is too long.';
        }
        const atCount = email.split('@').length - 1;
        if (atCount === 0) {
            return 'Email must contain @.';
        }
        if (atCount !== 1) {
            return "Email cannot contain more than one @ symbols.";
        }
        if (email.indexOf('.') === -1) {
            return "The email must contain a character dot."; 
        }
        return true;
    }
    
    const minPasswordLength = 8;
  
    function isValidPassword() {
        if (!password.trim()) {
            return "Password is required.";         
        }
        if (password.length < minPasswordLength) {
            return "The passwords must be at least 8 characters.";
        }
        
        return true;
    }

    function isValidRepeatPassword() {
        if (password !== repeatPassword) {
            return 'The passwords do not match.';
         }
         return true;
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const usernameErrorValue = isValidUsername(username);
        const emailErrorValue = isValidEmail(email);
        const passwordErrorValue = isValidPassword(password);
        const repeatPasswordErrorValue = isValidRepeatPassword(repeatPassword);

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

        if (repeatPasswordErrorValue !== true) {
            isAllFormValid = false;
            setRepeatPasswordErr(repeatPasswordErrorValue);
        } else {
            setRepeatPasswordErr('');
        }

        if (isAllFormValid) {
                    fetch('http://localhost:4840/api/register', {
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
                .then(data => data.result)
                .catch(e => console.error(e));
                }
        }

    


    return (
        <div className={style.main}>
            <div className={style.logo}>
                <img src={logo} alt="Logo" />
            </div>
            {/* ERROR*/}
            {emailErr || usernameErr || passwordErr || repeatPasswordErr ?
            <div className={style.error}>
                    <div>
                        <i className={style.red}><BiError size="2rem" /> </i>
                    </div>
                    <div>
                        <h4 className={style.redTitle}>There was a problem</h4>
                        <ul>
                            {emailErr.length === 0 ? null : <li className={style.errorLi}>{emailErr}</li>}
                            {usernameErr.length === 0 ? null : <li className={style.errorLi}>{usernameErr}</li>}
                            {passwordErr.length === 0 ? null : <li className={style.errorLi}>{passwordErr}</li>}
                            {repeatPasswordErr.length === 0 ? null : <li className={style.errorLi}>{repeatPasswordErr}</li>}
                        </ul>
                    </div>
            </div> : null } 
    <div className={style.form}>
          
          <span className={style.tittle}>
              <h1>Create account</h1>
          </span>
          <form onSubmit={handleFormSubmit} className={style.context}>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Your name</label>
                  <input value={username} onChange={handleUsernameChange} className={style.input} type="text" placeholder="First and last name" />
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Email</label>
                  <input value={email} onChange={handleEmailChange} className={style.input} type="email" placeholder="" />                  
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Password</label>
                  <input value={password} onChange={handlePasswordChange} className={style.input} type="password" placeholder="at least 8 charachters" />
                  <div className={style.minPassword}>
                      <i className={style.blue}><TiInfoLarge size="1.5rem" /> </i>
                      <p>Passwords must be at least 8 characters.</p>
                  </div>
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Re-enter password</label>
                  <input value={repeatPassword} onChange={handleRepeatPasswordChange} className={style.input} type="password" placeholder=" " />
              </div>
              <div className={style.formRow}>
                  <button className={`${style.button} ${style.textButton}`}  type="submit">Create your IMDb account</button>
              </div>
              <div className={style.haveAccount}>
                  <p>Already have an account?<span className={style.linkSignIn}><Link to={'/sign-in/'}>Sign in</Link></span> </p>
              </div>
          </form>
      </div>
  </div>
    );                                                 
}
    
