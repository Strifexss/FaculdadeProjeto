"use client"
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CidadeImagem from "./imgs/purpleCidade.webp"
import {motion} from "framer-motion"
export default function Home() {
  
  return (
    <div className={styles.main}>
      <motion.div className={styles.container}
        initial={{x: -60, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{ duration: 0.2 }}
      > 
        <div>
          <Image
            src={CidadeImagem}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.logins}>
          <input type="text" id="email" placeholder='E-mail' />
          <input type="password" id="senha" placeholder='Senha' />
          <button>
            <h2>Entrar</h2>
          </button>
          <Link href="/registrar"><p>Não tem uma conta? <span>Registre-se</span></p></Link>
        </div>
      </motion.div>
    </div>
  )
}
