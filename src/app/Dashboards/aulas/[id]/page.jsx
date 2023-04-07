"use client"
import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function Aulas() {

    const [data, setData] = useState([])

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
  

    return(
        <div className={styles.main}>
            <header>
                <h1>Aulas</h1>
            </header>
            <div className={styles.botoes}>
                    <button><h2>Adicionar Aula</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.campo}>
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
                   
                </div>
        </div>
    )
}