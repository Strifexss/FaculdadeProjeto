"use client"
import styles from "./page.module.css"
import Link from "next/link"
import Image from "next/image"
import CidadeImagem from "../imgs/purpleCidade.webp"
import {motion} from "framer-motion"


export default function registrar() {
    return(
        <motion.div className={styles.main}>
            <motion.div className={styles.container}
                initial={{x: 60, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.registrar}>
                    <h1>Crie sua conta</h1>
                    <input type="text" placeholder="Seu E-mail"/>
                    <input type="text" placeholder="Seu Nome"/>
                    <input type="password" placeholder="Sua Senha"/>
                    <input type="password" placeholder="Repita sua Senha"/>
                    <p>Ao se registrar, você aceita nossos <span>termos de uso</span> e a nossa <span>política de privacidade</span>.</p>
                    <button><h2>Cadastrar</h2></button>
                </div>
                <div className={styles.infos}>
                    <Image
                        src={CidadeImagem}
                        width={500}
                        height={500}
                    />
                    <h1>Gerencie a sua acadêmia com a melhor ferramenta do mercado</h1>
                    <p>Junte-se a milhares de devs e acelere na direção dos seus objetivos</p>
                    <Link href="/"><p>voltar para login</p></Link>
                </div>
            </motion.div>
        </motion.div>    
    )
}