"use client"
import styles from "./page.module.css"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useState } from "react"

export default function Usuarios() {

    const [data, setData] = useState([])

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

    return(
        <div className={styles.main}>
            <div className={styles.rodape}>
                <h1>Alunos cadastrados</h1>
            </div>
            <div className={styles.campo}>
                <div className={styles.botoes}>
                    <button><h2>Cadastrar Aluno</h2> </button>
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
            </div>
        </div>
    )
}