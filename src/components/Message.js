import React from 'react'
import styles from "@/styles/Message.module.css";
import {MdOutlinePending} from 'react-icons/md'
import { useRouter } from 'next/router';


const Message = ({data}) => {

  const router = useRouter();
  const {orderID,createdAt} = data
  return (
    <div className={styles.container} onClick={()=>router.push(`/orders/${orderID}`)}>
        <div className={styles.orderid_container}>
            <p className={styles.date}>{createdAt} &nbsp; &nbsp; &nbsp;</p>
            <p className={styles.order}><span className={styles.text}>Order Id : </span><span className={styles.order_id}>&nbsp; {orderID}</span></p>
        </div>
        <div className={styles.pending}>
            <MdOutlinePending/> <p>&nbsp; Pending.....</p>
        </div>
    </div>
  )
}

export default Message