/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import style from './SignIn.module.css';
import { Link } from 'react-router-dom';


export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault();

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
                .then(data => data.result)
                .catch(e => console.error(e));
            }

    return (
        <div className={style.container}>
                <div className={style.leftColumn}>
                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <h1>Sign in</h1>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Email</label>
                            <input value={email} onChange={handleEmailChange} className={style.input} type="email"/>
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="">Password</label>
                            <input value={password} onChange={handlePasswordChange} className={style.input} type="password"/>
                        </div>
                        <div className={style.formBtn}>
                            <Link className={style.signInBtn} to="/sign-in/login">Sign In for more access</Link>
                        </div>
                        <button>form</button>
                    </form>
                        <div className={style.or}>or</div>
                        <div>
                            <Link className={style.signInBtn + ' ' + style.newAccountBtn} to="/sign-in/registration">Create a New Account</Link>
                        </div>
                </div>
                <div className={style.rightColumn}>
                    <h1>Benefits of your free IMDb account</h1>
                    <p className={style.pTitle}>Personalized Recommendations</p>
                        <p className={style.paragraph}>Discover shows you'll love.</p>
                    <p className={style.pTitle}>Your Watchlist</p>
                        <p className={style.paragraph}>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                    <p className={style.pTitle}>Your Ratings</p>
                        <p className={style.paragraph}>Rate and remember everything you've seen.</p>
                    <p className={style.pTitle}>Contribute to IMDb</p>
                        <p className={style.paragraph}>Add data that will be seen by millions of people and get cool badges.</p>
                </div>
        </div>
    )
}