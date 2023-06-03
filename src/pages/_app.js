import '@/styles/globals.css'
import { userDataContext } from '@/context/context'
import Context from '@/context/context'
export default function App({ Component, pageProps }) {
  return(
    <>
    <Context>
    <Component {...pageProps} />
    </Context>
    </> 
  )
}
