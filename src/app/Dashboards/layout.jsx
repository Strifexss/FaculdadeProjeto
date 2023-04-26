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
  const [mobileModal, setMobileModal] = useState(false)


   async function deslogar() {
     Cookies.removeItem("email")
     Cookies.removeItem("id_usuario")
      window.alert("Deslogado com sucesso")
      push("/")
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
   
    function inicio() {
      push(`/Dashboards/landing/${Cookies.getItem("email")}`)
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
          <div onClick={inicio}>
          <Icones nome="Início" imagem={ExercicioIcon}/>
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
               
              </section>
            }     
          </div>
          <div className={styles.mobileBar} onClick={() => setMobileModal(!mobileModal)}>

          </div>
        </div>
        {
          mobileModal && 
          <div className={styles.mobileMenu}>
            <header>
                <Image 
                src={Logo}
                width={200}
                height={100}
                alt="Logo"
              />
              <button onClick={() => setMobileModal(!mobileModal)}>Fechar</button>
            </header>
                <p style={{color: "#8d8d8d", fontWeight: "bold"}}>Overview</p>
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
          <div onClick={inicio}>
          <Icones nome="Início" imagem={ExercicioIcon}/>
          </div>
            <footer>
                <Image
                  src={UserIcon}
                  width={70}
                  height={60}
                  alt="Usuario"
                />
                <div className={styles.mobileMenuFooter}>
                  <h3>Matheus Henrique</h3>
                  <p>matheushlm2@gmail.com</p>
                </div>
            </footer>     
          </div>
        }
        {children}
      </div>   
    )
  }