"use client"
import styles from "./page.module.css"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useState } from "react"
import Image from "next/image"
import {motion} from "framer-motion"
import UserImage from "../../../imgs/icons/userIcon.png"
import { useEffect } from "react"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';

export default function Usuarios() {

    const [data, setData] = useState([])
    const [cadastro, setCadastro] = useState(false)
    const { push } = useRouter();
    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    }, [])


  const { isLoading, error} =useQuery('repoData', async () =>
    await axios.get("https://planet-scale-database-connect.vercel.app/buscarClientes")
   .then(response => {
    console.log(response.data)
    setData(response.data)
   }),
   {
     retry: 5, //Se a requisição falhar, ele vai tentar mais 5 vezes
     refetchOnWindowFocus: false, //Caso true, ele recarrega o fecth de dados toda vez que o usuario volta pra aba
     staleTime: 1000 * 10   
   }
  ) 

  function cadastrar() {
    const email = document.getElementById("email").value
    const peso = document.getElementById("peso").value
    const nome = document.getElementById("nome").value
    const telefone = document.getElementById("telefone").value
    const altura = document.getElementById("altura").value
    const objetivo = document.getElementById("objetivo").value
    axios.post("https://planet-scale-database-connect.vercel.app/registrarClientes", {
        email: email,
        nome: nome,
        peso: peso,
        altura: altura,
        objetivo: objetivo,
        telefone: telefone
    }).then((response) => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
   }

    return(
        <div className={styles.main}>
            <div className={styles.rodape}>
                <h1>Alunos cadastrados</h1>
            </div>
            <div className={styles.campo}>
                <div className={styles.botoes}>
                    <button onClick={() => setCadastro(!cadastro)}><h2>Cadastrar Aluno</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.cardsCampo}>
                    {data.map(x => {
                        return(
                            <div key={x.id} className={styles.cards}>
                        <section >
                        <Image 
                            src={UserImage}
                            width={500}
                            height={500}
                            alt="Cliente"
                        />
                        <h3 >{x.nome}</h3>
                        </section>
                        <h4 >Email: {x.email}</h4>
                        <h4 >Telefone: {x.telefone}</h4>
                        <h4 >Altura: {x.altura}</h4>
                        <h4>Peso: {x.peso}kg</h4>
                    </div>
                        )
                    })}        
                </div>
                {
                    cadastro && 
                        <motion.div className={styles.cadastro}
                            initial={{x: 60}}
                            animate={{x: 0}}
                            transition={{ duration: 0.3 }}
                        >
                            <button onClick={() => setCadastro(false)}><h2>Fechar</h2></button>
                            <input type="text" placeholder="Nome" id="nome"/>
                            <input type="text" placeholder="Email" id="email"/>
                            <input type="text" placeholder="Telefone" id="telefone"/>
                            <input type="text" placeholder="Altura" id="altura"/>
                            <input type="text" placeholder="Peso" id="peso"/>
                            <input type="text" placeholder="Objetivo" id="objetivo"/>
                            <button onClick={cadastrar}><h2>Cadastrar</h2></button>
                        </motion.div>    
                    
                }
            </div>
        </div>
    )
}