"use client"
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CidadeImagem from "./imgs/purpleCidade.webp"
import loadingIcon from "./imgs/icons/spinnerLoading.svg"
import eyeIcon from "./imgs/icons/olho.png"
import Logo from "./imgs/GymHubFont.png"
import {motion} from "framer-motion"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookies"
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const { push } = useRouter();
  const [loginErro, setLoginErro] = useState(false)
  const focusInputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  function revelarSenha() {
    const senha = document.getElementById("senha")
    if(senha.type == 'password') {
      senha.type = 'text'
    }
    else {
      senha.type = 'password'
    }
  }

  function login() {
    setLoading(true)
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
              setLoading(false)
              setLoginErro(true)
              focusInputRef.current.focus()
            }
          }
          else {
            setLoading(false)
            setLoginErro(true)
            focusInputRef.current.focus()
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
          <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder='Insira seu Email' ref={focusInputRef} />
          </div>
          <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
              <label htmlFor="senha">Senha:</label>
              <div className={styles.revelarIcon} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
              <Image onClick={revelarSenha}
                src={eyeIcon}
                width={1}
                height={1}
                alt='Revelar Senha'
              />
              </div>
            </div>
            <input type="password" spellCheck id="senha" placeholder='Insira sua senha' />
          </div>
          <button onClick={login}>
            <h2>Entrar</h2>
          
          </button>
          {
              loading && 
              <div className={styles.loading}>
              <Image
                src={loadingIcon}
                width={5}
                height={5}
                alt='Loading'
              />
              </div>
            }
          <Link href=""><p>Leio os <span>Termos de uso</span></p></Link>
        </div>
      </motion.div>
    </div>
  )
}
