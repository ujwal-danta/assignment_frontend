import React from "react";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";
const register = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Register</h1>
        <div className={styles.input_container}>
        <div className={styles.select_container}>
          <label for="cars">  You are a : &nbsp;  &nbsp; </label>
          <select name="cars" id="cars">
            <option value="manufacturer">Manufacturer</option>
            <option value="transporter">Transporter</option>
          </select>
        </div>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Email" />
          <input type="text" placeholder="Your Password" />
          <input type="text" placeholder="Re-enter Password" />
        </div>
        <div className={styles.btn_container}>
          <button onClick={() => router.push("/login")}>Login</button>
          <p>or</p>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
};

export default register;
