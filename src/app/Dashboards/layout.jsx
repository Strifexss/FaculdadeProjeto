"use client"
import styles from "./layout.module.css"
import Icones from "./components/icones"
import LogoutIcon from "../imgs/icons/logoutIcon.png"
import UserIcon from "../imgs/icons/userIcon.png"
import ExercicioIcon from "../imgs/icons/ExerciciosIcon.png"
import ProfessorIcon from "../imgs/icons/ProfessorIcon.png"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
export default function Layout({ children }) {
  
  const {push} = useRouter()

   async function deslogar() {
       Cookies.removeItem("email")
      window.alert("Deslogado com sucesso")
      await push("/")
    }

    function clientes() {
      push(`/Dashboards/clientes/${Cookies.getItem("email")}`)
    }

    function exercicios() {
      push("/Dashboards/exercicios")
    }

    function aulas() {
      push(`/Dashboards/aulas/${Cookies.getItem("email")}`)
    }
    function professores() {
      push(`/Dashboards/professores/${Cookies.getItem("email")}`)
    }
    return (   
      <div className={styles.main}>
        <div className={styles.barra}>
          <div onClick={exercicios}>
            <Icones nome="Exercicios" imagem={ExercicioIcon}/>
          </div>
          <div onClick={professores}>
            <Icones nome="Professores" imagem={ProfessorIcon}/>
          </div>
          <div onClick={clientes}>
            <Icones nome="Clientes" imagem={UserIcon}/>
          </div>
          <div onClick={aulas}>
          <Icones nome="Aulas" imagem={ExercicioIcon}/>
          </div>
          <div onClick={deslogar}>
          <Icones nome="Logout" imagem={LogoutIcon}/>
          </div>
        </div>
        {children}
      </div>   
    )
  }