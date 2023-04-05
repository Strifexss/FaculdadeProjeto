"use client"
import styles from "./layout.module.css"
import Icones from "./components/icones"
import LogoutIcon from "../imgs/icons/logoutIcon.png"
import UserIcon from "../imgs/icons/userIcon.png"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
export default function Layout({ children }) {
  
  const {push} = useRouter()

    async function deslogar() {
      await Cookies.removeItem("email")
      window.alert("Deslogado com sucesso")
      push("/")
    }

    function clientes() {
      push(`/Dashboards/clientes/${Cookies.getItem("email")}`)
    }

    return (   
      <div className={styles.main}>
        <div className={styles.barra}>
          <div onClick={clientes}>
            <Icones nome="Clientes" imagem={UserIcon}/>
          </div>
          <div onClick={deslogar}>
          <Icones nome="Logout" imagem={LogoutIcon}/>
          </div>
        </div>
        {children}
      </div>   
    )
  }