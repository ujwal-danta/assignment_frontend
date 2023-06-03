import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/order.module.css";
import { AiOutlineInbox, AiOutlinePlus } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Order() {
  const router = useRouter();
  const {id} = router.query
  const [orderDetails,setOrderDetails] = useState({})
  const [price,setPrice] = useState(null)
  const [status,setStatus] = useState("")
 useEffect(() => {
  if(id)
  fetch(`http://localhost:3001/api/orders/${id}`)
  .then(res=>res.json())
  .then(data=>{
  //  console.log(data)
   setOrderDetails(data)
  })
  .catch(err=>console.log(err))
 }, [id])
 


  const handleLogout = ()=>{
    localStorage.removeItem("user")
    router.push('/login')
  }
  
  const handleSubmitTransporter = ()=>{
    if(parseInt(price)<0 || price==null)
    alert('Enter a valid price')
    else{
      fetch("http://localhost:3001/api/sendPrice",{
        method: "PATCH",
        body: JSON.stringify({
          orderDetails,
          cost : parseInt(price) 
        }),
        headers : {
          'Content-Type': 'application/json'
        },
      })
      .then(res=>res.json())
      .then((data)=>{
        alert('Price sent to the manufacturer')
        router.push('/')
      })
      .catch(err=>console.log(err))
    }
  }

  const handleSubmitManufacAccept = ()=>{
    fetch("http://localhost:3001/api/updateStatus",{
        method: "PATCH",
        body: JSON.stringify({
          orderDetails,
          status :  "Accepted"
        }),
        headers : {
          'Content-Type': 'application/json'
        },
      })
      .then(res=>res.json())
      .then((data)=>{
       router.push('/')
      })
      .catch(err=>console.log(err))
    }
    const handleSubmitManufacReject = ()=>{
      fetch("http://localhost:3001/api/updateStatus",{
          method: "PATCH",
          body: JSON.stringify({
            orderDetails,
            status :  "Rejected"
          }),
          headers : {
            'Content-Type': 'application/json'
          },
        })
        .then(res=>res.json())
        .then((data)=>{
         router.push('/')
        })
        .catch(err=>console.log(err))
      }
  


  return (
    <>
      <Head></Head>
      {console.log(status)}
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
            <div className={styles.logout_container} onClick={handleLogout}>
              <div className={styles.logout_btn}>Logout</div>
            </div>
          </div>
          <div className={styles.order_container}>
            <div className={styles.orderDetails_container}>
              <div className={styles.header}>
                <h1>Order Details</h1>
                <hr className={styles.line} />
              </div>
              <div className={styles.order_details}>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>To :</h3>
                    <div className={styles.value}>{orderDetails.to}</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>From :</h3>
                    <div className={styles.value}>{orderDetails.from}</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Quantity :</h3>
                    <div className={styles.value}>{orderDetails.quantity}</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Address :</h3>
                    <div className={styles.value}>{orderDetails.address}</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Transporter:</h3>
                    <div className={styles.value}>
                      {orderDetails.transporter} 
                      </div>
                </div>
              </div>
            </div>
            <div className={styles.cost_container}>
            <div className={styles.field_container}>
                    <h2 className={styles.data}>OrderID :</h2>
                    <div className={styles.value}>{id}</div>
                </div>
                <div className={styles.field_container}>
                    <h2 className={styles.data}>Cost ( in dollars ) :</h2>
                    <div className={styles.value}>
                    {
                      localStorage.getItem("user") === "transporter1@gmail.com" ? 
                      <input type="text" placeholder="Your Price" 
                      className={styles.price}
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                      /> 
                      : 
                      <p>{orderDetails.price}</p>
                    }
                    </div>
                </div>

                <div className={styles.button_container}>
                    {
                      localStorage.getItem("user") === "transporter1@gmail.com" ? 
                      <>
                       <button 
                       className={styles.btn_green}
                       onClick={handleSubmitTransporter}
                       >
                        SEND
                        </button>
                      </> 
                      :
                      <>
                      <button className={styles.btn_green} onClick={handleSubmitManufacAccept} value={"accept"}>Accept</button>
                      <button className={styles.btn_red} value={"reject"} onClick={handleSubmitManufacReject}>Reject</button>
                      </>
                    }
                </div>
                <div>
                  {
                     localStorage.getItem("user") === "transporter1@gmail.com" ? 
                     <> <strong>Note :</strong> <em>On Clicking </em> SEND , <em> a message will be sent to the respective manufacturer quoting the delivery charges</em> </> 
                     : 
                     <> <strong>Note :</strong> <em>On Clicking </em> Accept or Reject , <em> a message will be sent to the transporter confirming or rejecting the delivery charges</em> </>
                  }
                  
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
