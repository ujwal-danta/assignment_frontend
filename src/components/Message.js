import React from 'react'
import styles from "@/styles/Message.module.css";
import {MdOutlinePending} from 'react-icons/md'
import { useRouter } from 'next/router';


const Message = () => {

  const router = useRouter();
  return (
    <div className={styles.container} onClick={()=>router.push('/orders/1234')}>
        <div className={styles.orderid_container}>
            <p className={styles.date}>12/5/21 &nbsp; &nbsp; &nbsp;</p>
            <p className={styles.order}><span className={styles.text}>Order Id : </span><span className={styles.order_id}>&nbsp; #gh56123</span></p>
        </div>
        <div className={styles.pending}>
            <MdOutlinePending/> <p>&nbsp; Pending.....</p>
        </div>
    </div>
  )
}

export default Message