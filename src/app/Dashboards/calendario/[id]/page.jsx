"use client"
import styles from "./page.module.css"
import { useState } from "react"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function Calendario() {

    const [data, setData] = useState([])

   const { isLoading, error} =useQuery('buscarClientes', async () =>
    await axios.get("http://localhost:3001/buscarAulasSemanais")
   .then(response => {
    console.log(response.data)
    setData(response.data)
   }),
   {
     retry: 5, 
     refetchOnWindowFocus: false, 
     staleTime: 1000 * 10   
   }
  ) 


    return(
        <div className={styles.main}>
            <header>
                <h1>Calendário</h1>
            </header>
            <div className={styles.calendario}>
                <section>
                    <div className={styles.dias}>
                        <h1>Segunda</h1>
                    </div>
                    <div className={styles.aula}>

                    </div>
                    <div className={styles.aula}>

                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Terça</h1>
                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Quarta</h1>
                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Quinta</h1>
                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Sexta</h1>
                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Sábado</h1>
                    </div>
                </section>
                <section>
                    <div className={styles.dias}>
                        <h1>Domingo</h1>
                    </div>
                </section>
            </div>
        </div>
     )
}