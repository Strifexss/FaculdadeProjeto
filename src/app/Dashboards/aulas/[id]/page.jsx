"use client"
import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation';
import Cookies from "js-cookies"
export default function Aulas() {

    const [data, setData] = useState([])
    const [openCadastro, setOpenCadastro] = useState(false)

    const { push } = useRouter();
    useEffect(() => {
        console.log(Cookies.getItem("email"))
        if(Cookies.hasItem("email") == false) {
            push("/invalido")
        }
    }, [])

    const { isLoading, error} =useQuery('repoData', async () =>
    await axios.get("https://planet-scale-database-connect.vercel.app/buscarAulas")
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
  
  function adicionar() {
    const nome = document.getElementById("Nome").value
    const descricao = document.getElementById("Descricao").value
    const duracao = document.getElementById("Duracao").value
    const nivel = document.getElementById("Nivel").value
    axios.post("https://planet-scale-database-connect.vercel.app/adicionarAulas", {
        nome: nome,
        descricao: descricao,
        nivel: nivel,
        duracao: duracao,
     
    }).then((response) => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
   }

    return(
        <div  className={styles.main}>
            <header>
                <h1>Aulas</h1>
            </header>
            <div className={styles.botoes}>
                    <button onClick={(() => {
                        setOpenCadastro(!openCadastro)
                    })}><h2>Adicionar Aula</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.campo}>
                    {
                        isLoading && 
                        <h1>Carregando...</h1>
                    }
                    {data.map(x => {
                        return(
                            <div className={styles.container} key={x.id}>
                            <div className={styles.containerHeader}>
                                <h2>{x.nome}</h2>
                            </div>
                            <div className={styles.textBox}>
                                <h3>
                                {x.descricao}
                                </h3>
                            </div>
                            <section>
                                <h4>
                                   Duração: {x.duracao}hr
                                </h4>
                                <h4>
                                    Nivel: {x.nivel}
                                </h4>
                            </section>
                        </div>
                        )
                    })}
                     {
                    openCadastro && 
                    <motion.div className={styles.cadastroModal}
                    initial={{x: 60}}
                    animate={{x: 0}}
                    transition={{ duration: 0.3 }}
                >
                        <button onClick={() => {
                            setOpenCadastro(!openCadastro)
                        }}><h2>Fechar</h2></button>
                        <input type="text" placeholder="Nome" id="Nome"/>
                        <input type="text"  placeholder="Descrição" id="Descricao"/>
                        <input type="text"  placeholder="Nivel" id="Nivel"/>
                        <input type="number"  placeholder="Duração em Horas" id="Duracao"/>
                        <button onClick={adicionar}><h2>Adicionar Aula</h2></button>
                    </motion.div>
                }
                </div>
               
        </div>
    )
}