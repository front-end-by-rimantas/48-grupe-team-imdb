import { useState } from 'react';
import { TiInfoLarge } from 'react-icons/ti';
import { BiError } from "react-icons/bi";
import style from './RegistrationForm.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function RegistrationForm() {
    const href = "/"
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


    function isValidUsername() {
        if (!username.trim()) {
            return 'Username is required.'
        }
        if (username.length > 25) {
            return 'The text is too long, please write shorter.';
        }
        if(typeof username === 'number'){
            return 'Username cannot contain numbers.'
        }
        if(username.toUpperCase()){
            return 'Username cannot contain uppercase letter.'
        }
        const symbol = [',', ':', '*', '&', '^', '%', '$', '#', '@', '!'];
        if (symbol.some(n => username.includes(n))) {
            return 'Username cannot contain special characters , : * & ^ % $ # @ !';
        }
           
        return true;
    }

    function isValidEmail() {
        if (!email.trim()) {
            return 'Enter a valid email address.'         
        }
        if (email.length < 6) {
            return 'The email is too shorter.'
        }
        if (email.length > 30) {
            return 'The email is too long.'
        }
        if (!email.includes('@')) {
            return 'The email must contain @.'
        }
       
        const atCount = email.split('@').length - 1;
        if (atCount > 2) {
            return "Email cannot contain more than two @ symbols."
        }
        if (email.indexOf('.') === -1) {
            return "The email must contain a character dot." 
        }
        return true;
    }

    function isValidPassword() {
    }

    function isValidRepeatPassword() {
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
            
            navigate('/');
        } 
    }

    return (
        <div className={style.main}>
            <div className={style.logo}>
                <img src="../src/assets/images/logo/imdb_logo.png" alt="Logo" />
            </div>
            {/* ERROR*/}
            {emailErr || usernameErr || passwordErr || repeatPasswordErr ?
            <div className={style.error}>
                    <div>
                        <i className={style.red}><BiError size="2rem" /> </i>
                    </div>
                    <div>
                        <h4 className={style.redTittle}>There was a problem</h4>
                        <ul>
                           
                            {emailErr.length === 0 ? null : <li className={style.errorLi}>{emailErr}</li>}
                            {usernameErr.length === 0 ? null : <li className={style.errorLi}>{usernameErr}</li>}
                            {passwordErr.length === 0 ? null : <li className={style.errorLi}>{passwordErr}</li>}
                            {repeatPasswordErr.length === 0 ? null : <li className={style.errorLi}>{repeatPasswordErr}</li>}
                      
                        </ul>
                    </div>
            </div> : null } 
           
{/* 
            Important Message!
You indicated you're a new customer, 
but an account already exists with the 
email address vintiukviktoria@gmail.com. */}
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
                  <p>Already have an account?<span className={style.linkSignIn}><Link to={'/sign-in/' + href}>Sign in</Link></span> </p>
              </div>
          </form>
      </div>
  </div>
);                                                 
}
    
