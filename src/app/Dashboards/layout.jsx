"use client"
import Image from "next/image"
import styles from "./layout.module.css"
import Icones from "./components/icones"
import LogoutIcon from "../imgs/icons/logoutIcon.png"
import UserIcon from "../imgs/icons/userIcon.png"
import ExercicioIcon from "../imgs/icons/ExerciciosIcon.png"
import ProfessorIcon from "../imgs/icons/ProfessorIcon.png"
import CalendarIcon from "../imgs/icons/Calendar.png"
import MenuIcon from "../imgs/icons/IconMenu.png"
import CloseIcon from "../imgs/icons/CloseIcon.png"
import GymHubAjuda from "../imgs/GymHubAjuda.png"
import GymHubAjuda2 from "../imgs/GymHubAjuda2.png"
import Logo from "../imgs/GymHubFont.png"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useState } from "react"
import {motion} from "framer-motion"
export default function Layout({ children }) {
  
  const {push} = useRouter()
  const [modal, openModal] = useState(false)
  const [mobileModal, setMobileModal] = useState(false)
  const [ajuda, setAjuda] = useState(false)
  const [ajudaImagem, setAjudaImagem] = useState(GymHubAjuda)
  
  function trocarImagemAjuda() {
    if(ajudaImagem == GymHubAjuda) {
      setAjudaImagem(GymHubAjuda2)
    }
    else {
      setAjudaImagem(GymHubAjuda)
    }
  }

  async function deslogar() {
     Cookies.removeItem("email")
     Cookies.removeItem("id_usuario")
      window.alert("Deslogado com sucesso")
      push("/")
    }

    function clientes() {
      push(`/Dashboards/clientes/${Cookies.getItem("email")}`)
      setMobileModal(false)
    }

    function exercicios() {
      push("/Dashboards/exercicios")
      setMobileModal(false)
    }

    function aulas() {
      push(`/Dashboards/aulas/${Cookies.getItem("email")}`)
      setMobileModal(false)
    }
    
    function professores() {
      push(`/Dashboards/professores/${Cookies.getItem("email")}`)
      setMobileModal(false)
    }
    
    function calendario() {
      push(`/Dashboards/calendario/${Cookies.getItem("email")}`)
      setMobileModal(false)
    }
    function planos() {
      push(`/Dashboards/planos/${Cookies.getItem("email")}`)
      setMobileModal(false)
    }
   
    function inicio() {
      push(`/Dashboards/landing/${Cookies.getItem("email")}`)
      setMobileModal(false)
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
          <div className={styles.ajuda} onClick={() => setAjuda(true)}>
            <h3>Ajuda</h3>
          </div>
          </div>
          <div className={styles.perfilFlex}>
            <motion.div className={styles.perfil} onClick={() => {openModal(!modal)}}
              whileTap={{ scale: 0.80 }}
            >
                <Image
                  src={UserIcon}
                  width={500}
                  height={500}
                  alt="Usuario"
                />
            </motion.div>
            {
              modal &&
              <motion.section 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{type: "spring", stiffness: 300, damping: 24}}
              
              >
                <div className={styles.modalOpcoes} onClick={deslogar}>
                    <h3>Deslogar</h3>
                </div>
               
              </motion.section>
            }     
          </div>
          <motion.div
            whileTap={{scale: 0.80}}
          >
          <Image onClick={() => setMobileModal(true)}
          style={{marginRight: "1rem"}}
            src={MenuIcon}
            width={35}
            height={35}
            alt="Menu"
          />
          </motion.div>
        </div>
        {
          mobileModal && 
          <motion.div className={styles.mobileMenu} 
          initial={{y: "-100vh"}}
          animate={{y: "0"}}
          transition={{ duration: 0.4 }}
          >
            <header>
                <Image 
                src={Logo}
                width={200}
                height={100}
                alt="Logo"
              />
              <motion.div
                whileTap={{scale: 0.80}}
              >
              <Image onClick={() => setMobileModal(false)} style={{marginTop: "2rem"}}
                src={CloseIcon}
                width={35}
                height={35}
                alt="Fechar"
              />
              </motion.div>
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
          </motion.div>
        
        }
        {
          ajuda && 
          <div className={styles.ajudaArea}>
            <header>
              <h2 onClick={() => setAjuda(false)}>Fechar</h2>
            </header>
            <section>
            <h1 onClick={() => trocarImagemAjuda()}>Anterior</h1>
            <Image 
              src={ajudaImagem}
              width={1000}
              height={1000}
              alt="Ajuda"
            />
            <h1 onClick={() => trocarImagemAjuda()}>Proximo</h1>
            </section>
          </div>
        }
        {children}
      </div>   
    )
  }