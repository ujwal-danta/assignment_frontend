import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/place_order.module.css";
import { AiOutlineInbox, AiOutlinePlus } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function place_order() {
  const router = useRouter();

  const [order,setOrder] = useState({
    to: "",
    from: "",
    quantity: 1,
    Address: "",
    transporter : "transporter 1"
  })
 console.log(order)
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
              <div className={styles.logout_btn}>Logout</div>
            </div>
          </div>
          <div className={styles.form_container}>
            <form className={styles.form}>
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
                    <select name="" id="" onChange={(e)=>setOrder({
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
                    <input type="text" value={"Sakhipara"}/>
                </div>
                <div className={styles.form_element_container}>
                    <label>Transporter &nbsp; </label>
                    <select name="" id="">
                        <option value="transporter 1">Transporter 1</option>
                    </select>
                </div>
                <div className={styles.btn_container}>
                <button className={styles.form_btn}>Place Order</button>
                </div>

            </form>
          </div>






        </div>
      </div>
    </>
  );
}
