"use client"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import NextIcon from "../../../imgs/icons/NextIcon.png"
import Image from "next/image"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"

export default function Planos() {

    const [data, setData] = useState([])

    const { isLoading, error} =useQuery('buscarPlanos', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarPlanos", {
        id_usuario: Cookies.getItem("id_usuario")
    })
   .then(response => {
    console.log(response.data)
    setData(response.data)
   }),
   {
     refetchOnWindowFocus: false, 
     staleTime: 1000 * 10   
   }
  ) 


    return(
        <div className={styles.main}>
            <header>
                <h1>Planos</h1>
            </header>
            <div className={styles.botoes}>
                    <button><h2>Adicionar Plano</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
            <div className={styles.campo}>
                {
                    data.map(x => {
                        return(
                            <div className={styles.card} key={x.id}>
                                <section>
                                </section>  
                                <h2>Plano: {x.nomePlanos}</h2>  
                                <Image
                                    src={NextIcon}
                                    width={40}
                                    height={40}
                                    alt="Next"
                                />    
                        </div>        
                        )
                    })
                }
                 
            </div>
        </div>
    )
}