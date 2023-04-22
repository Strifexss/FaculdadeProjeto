"use client"
import Image from "next/image"
import styles from "./layout.module.css"
import Icones from "./components/icones"
import LogoutIcon from "../imgs/icons/logoutIcon.png"
import UserIcon from "../imgs/icons/userIcon.png"
import ExercicioIcon from "../imgs/icons/ExerciciosIcon.png"
import ProfessorIcon from "../imgs/icons/ProfessorIcon.png"
import CalendarIcon from "../imgs/icons/Calendar.png"
import Logo from "../imgs/GymHubFont.png"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useState } from "react"

export default function Layout({ children }) {
  
  const {push} = useRouter()
  const [modal, openModal] = useState(false)


   async function deslogar() {
       Cookies.removeItem("email")
       Cookies.removeItem("id_usuario")
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
    
    function calendario() {
      push(`/Dashboards/calendario/${Cookies.getItem("email")}`)
    }
    function planos() {
      push(`/Dashboards/planos/${Cookies.getItem("email")}`)
    }
    return (   
      <div className={styles.main}>
        <div className={styles.barra}>
          <div className={styles.logo}>
            <Image
                src={Logo}
                width={300}
                height={300}
                alt="Logo"
              />
          </div>          
          <div className={styles.Links}>
          <div onClick={exercicios}>
            <Icones nome="Exercicios" imagem={ExercicioIcon}/>
          </div>
          <div onClick={calendario}>
            <Icones nome="Calendário" imagem={CalendarIcon}/>
          </div>
          <div onClick={professores}>
            <Icones nome="Professores" imagem={ProfessorIcon}/>
          </div>
          <div onClick={planos}>
            <Icones nome="Planos" imagem={ProfessorIcon}/>
          </div>
          <div onClick={clientes}>
            <Icones nome="Alunos" imagem={UserIcon}/>
          </div>
          <div onClick={aulas}>
          <Icones nome="Aulas" imagem={ExercicioIcon}/>
          </div>
          
          </div>
          <div className={styles.perfilFlex}>
            <div className={styles.perfil} onClick={() => {openModal(!modal)}}>
                <Image
                  src={UserIcon}
                  width={500}
                  height={500}
                  alt="Usuario"
                />
            </div>
            {
              modal &&
              <section>
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
              </section>
            }
            
          </div>
        </div>
        {children}
      </div>   
    )
  }