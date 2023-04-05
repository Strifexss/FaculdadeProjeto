"use client"
import styles from "./page.module.css"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useState } from "react"
import {motion} from "framer-motion"
export default function Usuarios() {

    const [data, setData] = useState([])
    const [cadastro, setCadastro] = useState(false)
  
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
                    <button onClick={() => setCadastro(true)}><h2>Cadastrar Aluno</h2> </button>
                    <button><h2>Deletar Aluno</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.container}>
                    <div className={styles.containerCampos}>
                        <h2>Nome</h2>
                        <div className={styles.infos}>
                            {data.map(x => {
                                return(
                                    <h3 key={x.id}>{x.nome}</h3>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.containerCampos}>
                        <h2>Email</h2>
                        <div className={styles.infos}>
                        {data.map(x => {
                                return(
                                    <h3 key={x.id}>{x.email}</h3>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.containerCampos}>
                        <h2>Telefone</h2>
                        <div className={styles.infos}>
                        {data.map(x => {
                                return(
                                    <h3 key={x.id}>{x.telefone}</h3>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.containerCampos}>
                        <h2>Peso</h2>
                        <div className={styles.infos}>
                        {data.map(x => {
                                return(
                                    <h3 key={x.id}>{x.peso}</h3>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.containerCampos}>
                        <h2>Altura</h2>
                        <div className={styles.infos}>
                        {data.map(x => {
                                return(
                                    <h3 key={x.id}>{x.altura}</h3>
                                )
                            })}
                        </div>
                    </div>
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