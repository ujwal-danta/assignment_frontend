import React from 'react'
import styles from '../styles/login.module.css'
import { useRouter } from 'next/router'
const login = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
     <div className={styles.form}>
        <h1>Login</h1>
        <div className={styles.input_container}>
        <input type="text" placeholder='Your Email'/>
        <input type="text" placeholder='Your Password' />
        </div>
        <div className={styles.btn_container}>
            <button>Login</button>
            <p>or</p>
            <button onClick={()=>router.push('/register')}>Register</button>
        </div>
     </div>
    </div>
  )
}

export default login