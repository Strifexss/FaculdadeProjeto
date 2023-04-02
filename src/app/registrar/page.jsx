"use client"
import styles from "./page.module.css"
import Link from "next/link"
import Image from "next/image"
import CidadeImagem from "../imgs/purpleCidade.webp"
import {motion} from "framer-motion"
import axios from "axios"
import { useRouter } from 'next/navigation';

export default function registrar() {

    const { push } = useRouter();

    function  Registrar() {
        const email = document.getElementById("email").value
        const nome = document.getElementById("nome").value
        const senha = document.getElementById("senha").value

        console.log(email)
        
       axios.post("https://planet-scale-database-connect.vercel.app/registrar", {
            email: email,
            nome: nome,
            senha: senha
        }).then((response) => {
         if(response.data.errno === 1062) {
                 window.alert("Email já cadastrado")
            }
        else {
            window.alert("Cadastrado com sucesso")
            push("/")
        }
        })
    }

    return(
        <motion.div className={styles.main}>
            <motion.div className={styles.container}
                initial={{x: 60, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.registrar}>
                    <h1>Crie sua conta</h1>
                    <input type="text" placeholder="Seu E-mail" id="email"/>
                    <input type="text" placeholder="Seu Nome" id="nome"/>
                    <input type="password" placeholder="Sua Senha" id="senha"/>
                    <p>Ao se registrar, você aceita nossos <span>termos de uso</span> e a nossa <span>política de privacidade</span>.</p>
                    <button onClick={Registrar}><h2>Cadastrar</h2></button>
                </div>
                <div className={styles.infos}>
                    <Image
                        src={CidadeImagem}
                        width={500}
                        height={500}
                        alt="Cidade"
                    />
                    <h1>Gerencie a sua academia com a melhor ferramenta do mercado</h1>
                    <p>Junte-se a milhares de devs e acelere na direção dos seus objetivos</p>
                    <Link href="/"><p>voltar para login</p></Link>
                </div>
            </motion.div>
        </motion.div>    
    )
}