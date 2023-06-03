import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {AiOutlineInbox,AiOutlinePlus} from 'react-icons/ai'
import {FcAcceptDatabase} from 'react-icons/fc'
import Message from "@/components/Message";
import { userDataContext } from "@/context/context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const router = useRouter()
  const {userData,setUserData} = useContext(userDataContext)
  const [orderIDSearch,setOrderIDSearch] = useState("")
  useEffect(() => {
    if(localStorage.length === 0||!localStorage.getItem("user"))
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
        console.log(data)
       setUserData(data.data)
      })
      .catch(err=>console.log(err))
    }
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem("user")
    router.push('/login')
  }
  
  const handleSearchOrderID = ()=>{
  if(orderIDSearch==="")
  alert("Please enter a valid orderID")
  else{
    fetch("http://localhost:3001/api/getMessage", {
      method: "POST",
      body: JSON.stringify({
        search : orderIDSearch
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
    //  setUserData(data.data)
    })
    .catch(err=>console.log(err))
  }
  }

  return (
    <>
    <Head>
      
    </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {
            localStorage.getItem("user") === "transporter1@gmail.com" ? 
            <></> 
            : 
            <div className={styles.order_btn} onClick={()=>router.push('/place_order')}>
            <AiOutlinePlus className={styles.icon}/>
              <p>New Order</p>
            </div>
          }
          <div className={styles.nav_container}>
            <ul className={styles.nav}>
              <li className={styles.nav_items}  onClick={()=>router.push(`/`)} > <AiOutlineInbox/> &nbsp;  Inbox</li>
              <li className={styles.nav_items}> <FcAcceptDatabase/> &nbsp;  Accepted</li>
            </ul>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.top_bar}>
            <div className={styles.search_container}>
              <div>
            <input type="text" placeholder=" &#128269; Enter OrderID" 
            className={styles.search} 
            value={orderIDSearch}
            onChange={(e)=>setOrderIDSearch(e.target.value)}
            />
            <button className={styles.go}
            onClick={handleSearchOrderID}
            >Go!</button>
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
          <div className={styles.messages_container}>
            {
              userData  && userData.messages.map(data=>{
                return (
                  <Message data={data}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
