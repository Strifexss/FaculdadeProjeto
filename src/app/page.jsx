"use client"
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CidadeImagem from "./imgs/purpleCidade.webp"
import Logo from "./imgs/GymHubFont.png"
import {motion} from "framer-motion"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookies"
import { useEffect, useState } from 'react'

export default function Home() {

  const { push } = useRouter();
  const [loginErro, setLoginErro] = useState(false)
 
  function login() {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    axios.post("https://planet-scale-database-connect.vercel.app/login", {
            email: email,
            senha: senha
        }).then((response) => {
        
          console.log(response)
          if(response.data[0] !=  null) {
            if(response.data[0].email == email && response.data[0].senha == senha) {
              Cookies.setItem("email", email)
              Cookies.setItem("id_usuario", response.data[0].id)
              Cookies.setItem("nome", response.data[0].nome)
              console.log(Cookies.getItem("email"))
              console.log(Cookies.getItem("id_usuario"))
              console.log(Cookies.getItem("nome"))
              push(`/Dashboards/landing/${Cookies.getItem("email")}`)
            }
            else {
              setLoginErro(true)
            }
          }
         
        })
  }

  return (
    <div className={styles.main}>
      <motion.div className={styles.container}
        initial={{x: -60, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{ duration: 0.5 }}
      > 
        <div>
          <Image
            src={CidadeImagem}
            width={500}
            height={500}
            alt='Cidade'
          />
        </div>
        <div className={styles.logins}>
          <section>
          <Image
            src={Logo}
            alt='Logo'
            width={200}
            height={200}
          />
          </section>
          {
            loginErro &&
            <motion.p
              style={{color: "red", fontWeight: "bold", textAlign: "left"}}
              initial={{y: 10, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{ duration: 0.3 }}
            >
              Usuário ou senha incorretos
              </motion.p>
          }
          <input type="text" id="email" placeholder='E-mail' />
          <input type="password" id="senha" placeholder='Senha' />
          <button onClick={login}>
            <h2>Entrar</h2>
          </button>
          <Link href="/registrar"><p>Não tem uma conta? <span>Registre-se</span></p></Link>
        </div>
      </motion.div>
    </div>
  )
}
