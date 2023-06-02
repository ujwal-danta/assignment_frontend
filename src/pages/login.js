import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { useRouter } from 'next/router'
const login = () => {
  const router = useRouter()
  const [user,setUser] = useState({
    email : "",
    password : ""
  })

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}


  const handleLogin = () => {
    const {email,password} = user
    const validEmail = ValidateEmail(email)
    if(validEmail && password){
      fetch('http://localhost:3001/login',{
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(res=>res.json())
      .then(data=>{
      if(data.message){
        alert(data.message)
      }
      else{
        router.push('/')
      }
      })
      .catch(err=>console.log(err))
    }
    else
    alert('Invalid input')
  }

  return (
    <div className={styles.container}>
     <div className={styles.form}>
        <h1>Login</h1>
        <div className={styles.input_container}>
        <input type="text" placeholder='Your Email' value={user.email} 
        onChange={(e)=>setUser({
          ...user,
          email: e.target.value
        })}/>
        <input type="password" placeholder='Your Password' value={user.password} 
        onChange={(e)=>setUser({
          ...user,
          password: e.target.value
        })}
        />
        </div>
        <div className={styles.btn_container}>
            <button onClick={handleLogin}>Login</button>
            <p>or</p>
            <button onClick={()=>router.push('/register')}>Register</button>
        </div>
     </div>
    </div>
  )
}

export default login