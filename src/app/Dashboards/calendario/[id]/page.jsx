"use client"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function Calendario() {

    const [data, setData] = useState([])
    
    const [aulasModal, setAulasModal] = useState(false)
    const [infos, setInfos] = useState([])

    const [segunda, setSegunda] = useState([])
    const [terça, setTerça] = useState([])
    const [quarta, setQuarta] = useState([])
    const [quinta, setQuinta] = useState([])
    const [sexta, setSexta] = useState([])
    const [sabado, setSabado] = useState([])
    const [domingo, setDomingo] = useState([])

    function handleHandleDias() {
        setSegunda(data.filter(x => {return x.dia_semana == "Segunda"}))
        setTerça(data.filter(x => {return x.dia_semana == "Terça"}))
        setQuarta(data.filter(x => {return x.dia_semana == "Quarta"}))
        setQuinta(data.filter(x => {return x.dia_semana == "Quinta"}))
        setSexta(data.filter(x => {return x.dia_semana == "Sexta"}))
        setSabado(data.filter(x => {return x.dia_semana == "Sabado"}))
        setDomingo(data.filter(x => {return x.dia_semana == "Domingo"}))
   }

  useEffect(() => {
    handleHandleDias()
  },[data])
    
  const { isLoading, error} =useQuery('buscarClientes', async () =>
    await axios.get("https://planet-scale-database-connect.vercel.app/buscarAulasSemanais")
   .then(async response => {
    console.log(response.data)
    setData(response.data)
     
   }),
   {
     retry: 5, 
     refetchOnWindowFocus: false, 
     staleTime: 1000 * 10   
   }
  ) 

   function handleInfosDias(id) {
        setInfos(data.filter(x => {return x.id == id}))
        setAulasModal(true)
   }

    return(
        <div className={styles.main}>
            <header>
                <h1>Calendário</h1>
                {isLoading &&
                    <h1>Carregando...</h1>
                }
            </header>
            <div className={styles.calendario}>
                <section onClick={handleHandleDias}>
                    <div className={styles.dias}>
                        <h1>Segunda</h1>
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
                    {
                     quarta.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                
                            </div>
                        )
                     })
                    }
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
                    {
                     sexta.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                
                            </div>
                        )
                     })
                    }
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
            {
                aulasModal &&     
                <div className={styles.aulasModal}>
                    <h1>{infos[0].nome}</h1>
                    <button onClick={() => {setAulasModal(false)}}>fechar</button>
                </div>
            }
        </div>
     )
}