import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/order.module.css";
import { AiOutlineInbox, AiOutlinePlus } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Order() {
  const router = useRouter();



  return (
    <>
      <Head></Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.order_btn} onClick={router.push('/place_order')}>
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
          <div className={styles.order_container}>
            <div className={styles.orderDetails_container}>
              <div className={styles.header}>
                <h1>Order Details</h1>
                <hr className={styles.line} />
              </div>
              <div className={styles.order_details}>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>To :</h3>
                    <div className={styles.value}>Ujwal kumar Danta</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>From :</h3>
                    <div className={styles.value}>Ujwal kumar Danta</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Quantity :</h3>
                    <div className={styles.value}>Ujwal kumar Danta</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Address :</h3>
                    <div className={styles.value}>Ujwal kumar Danta</div>
                </div>
                <div className={styles.field_container}>
                    <h3 className={styles.data}>Transporter:</h3>
                    <div className={styles.value}>
                        Ujwal kumar Danta Ujwal kumar Danta Ujwal mar Dantaaaaaaaaaaaaaa
                        Ujwal kumar Danta Ujwal kumar Danta Ujwal mar Dantaaaaaaaaaaaaaa
                        </div>
                </div>
              </div>
            </div>
            <div className={styles.cost_container}>
            <div className={styles.field_container}>
                    <h2 className={styles.data}>OrderID :</h2>
                    <div className={styles.value}>Ujwal kumar Danta</div>
                </div>
                <div className={styles.field_container}>
                    <h2 className={styles.data}>Cost ( in dollars ) :</h2>
                    <div className={styles.value}>1234</div>
                </div>

                <div className={styles.button_container}>
                    <button className={styles.btn_green}>Accept</button>
                    <button className={styles.btn_red}>Reject</button>
                </div>
                <div>
                   <strong>Note :</strong> <em>On Clicking </em> Accept or Reject , <em> a message will be sent to the transporter confirming or rejecting the delivery charges</em> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
