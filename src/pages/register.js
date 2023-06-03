import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";
const register = () => {
  const [user, setUser] = useState({
    type: "manufacturer",
    name: "",
    email: "",
    password: "",
    re_enterPassword: "",
    address: ""
  });

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const handleRegister = () => {
    const { name, email, password, re_enterPassword, type, address } = user;
    const validEmail = ValidateEmail(email);
    if (validEmail && name && address && password && password === re_enterPassword) {
      fetch("http://localhost:3001/register", {
        method: "POST",
        body: JSON.stringify({
          role: type,
          name,
          email,
          password,
          address
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          if (data.data) {
            router.push("/login");
          }
        })
        .catch((err) => console.log(err));
    } else if (password != re_enterPassword) alert("Passwords do not match");
    else alert("Invalid input");
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Register</h1>
        <div className={styles.input_container}>
          <div className={styles.select_container}>
            <label htmlFor="cars"> You are a : &nbsp; &nbsp; </label>
            <select
              name="cars"
              id="cars"
              onClick={(e) =>
                setUser({
                  ...user,
                  type: e.target.value,
                })
              }
            >
              <option value="manufacturer">Manufacturer</option>
              <option value="transporter">Transporter</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Your Email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Your Address"
            value={user.address}
            onChange={(e) =>
              setUser({
                ...user,
                address: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Your Password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={user.re_enterPassword}
            onChange={(e) =>
              setUser({
                ...user,
                re_enterPassword: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.btn_container}>
          <button onClick={handleRegister}>Register</button>
          <p>or</p>
          <button onClick={() => router.push("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default register;
