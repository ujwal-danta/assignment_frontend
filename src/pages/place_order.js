import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/place_order.module.css";
import { AiOutlineInbox, AiOutlinePlus } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "@/context/context";

const inter = Inter({ subsets: ["latin"] });

export default function place_order() {
  const router = useRouter();
  const {userData,setUserData} = useContext(userDataContext)
  const [order,setOrder] = useState({
    to: "",
    from: "",
    quantity: 1,
    address: "",
    transporter : "transporter 1"
  })

  


  useEffect(() => {
    if(!localStorage.getItem("user"))
    router.push('/register')
    else
    {
      fetch("http://localhost:3001/api/getUser", {
        method: "POST",
        body: JSON.stringify({
          email : localStorage.getItem("user")
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(res=>res.json())
      .then(data=>{
       setUserData(data.data)
       setOrder({
        ...order,
        address: data.data.address
       })
      })
      .catch(err=>console.log(err))
    }

  }, [])



  const handleLogout = ()=>{
    localStorage.removeItem("user")
    router.push('/login')
  }

  const handleSubmit = ()=> {
    fetch("http://localhost:3001/api/placeOrder",{
      method: "PATCH",
      body: JSON.stringify({
        order,
        email: localStorage.getItem("user")
      }),
      headers : {
        'Content-Type': 'application/json'
      },
    })
    .then(res=>res.json())
    .then((data)=>{
      alert("Order has been sent to the transporter")
      router.push('/')
    })
    .catch(err=>console.log(err))
  }


 
  return (
    <>
      <Head></Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.order_btn}>
            <AiOutlinePlus className={styles.icon} />
            <p>New Order</p>
          </div>

          <div className={styles.nav_container}>
            <ul className={styles.nav}>
              <li className={styles.nav_items} onClick={() => router.push(`/`)}>
                {" "}
                <AiOutlineInbox /> &nbsp; Inbox
              </li>
              <li className={styles.nav_items}>
                {" "}
                <FcAcceptDatabase /> &nbsp; Accepted
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.top_bar}>
            <div className={styles.search_container}>
            <div>
            <input type="text" placeholder=" &#128269; Enter OrderID" className={styles.search} />
            <button className={styles.go}>Go!</button>
              </div>
            <div className={styles.vertical}></div>
            <div className={styles.to_from_container}>
              <div className={styles.to_from_search}>
              <input type="text" placeholder=" &#128269; Enter To" className={styles.tofrom} />
              <input type="text" placeholder=" &#128269; Enter From" className={styles.tofrom} />
              </div>
              <button className={styles.go}>Go!</button>
            </div>
            </div>
            <div className={styles.logout_container}>
              <div className={styles.logout_btn} onClick={handleLogout}>Logout</div>
            </div>
          </div>
          <div className={styles.form_container}>
            <div className={styles.form}>
                <div className={styles.form_heading}>
                    <h3>Details</h3>
                    <hr />
                </div>
                <div className={styles.form_to_from}>
                <div className={styles.form_element_container}>
                    <label>To</label>
                    <br />
                    <input type="text" 
                    value={order.to}
                    onChange={(e)=>setOrder({
                      ...order,
                      to : e.target.value
                    })}
                    />
                </div>
                <div className={styles.form_element_container}>
                    <label>From</label>
                    <br />
                    <input type="text"
                    value={order.from}
                    onChange={(e)=>setOrder({
                      ...order,
                      from: e.target.value
                    })}
                    />
                </div>
                </div>
                <div className={styles.form_element_container}>
                    <label>Quantity  &nbsp; </label>
                    <select name="" id="" value={order.quantity} onChange={(e)=>setOrder({
                      ...order,
                      quantity: e.target.value
                    }) }>
                        <option value={1}>1 Tone</option>
                        <option value={2}>2 Tones</option>
                        <option value={3}>3 Tones</option>
                    </select>
                </div>
                <div className={styles.form_element_container}>
                    <label>Address</label>
                    <br />
                    <input type="text" value={order.address}
                    onChange={(e)=>setOrder({
                      ...order,
                      address : e.target.value
                    })}
                    />
                </div>
                <div className={styles.form_element_container}>
                    <label>Transporter &nbsp; </label>
                    <select name="" id="">
                        <option value="transporter 1">Transporter 1</option>
                    </select>
                </div>
                <div className={styles.btn_container} onClick={handleSubmit}>
                <button className={styles.form_btn}>Place Order</button>
                </div>

            </div>
          </div>






        </div>
      </div>
    </>
  );
}
