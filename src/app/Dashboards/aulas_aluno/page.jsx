"use client"

import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"
export default function AulasAluno() {

    const [adicionarModal, setAdicionarModal] = useState(false)
    const [dataAluno, setDataAluno] = useState([])
    const [dataAulas, setDataAulas] = useState([])
    const diasEdita = useRef()
    const exercicio1 = useRef()
    const exercicio2 = useRef()
    const exercicio3 = useRef()
    const exercicio4 = useRef()
    const exercicio5 = useRef()

    const aulas =useQuery('buscarDadosAulas', async () => 
    axios.post("https://planet-scale-database-connect.vercel.app/buscarAulasAluno", {
        id_aluno: Cookies.getItem("id_aluno")
    }).then(response => {
        console.log(response)
        setDataAulas(response.data)
    })
)

    const { isLoading, error} =useQuery('buscarDadosAluno', async () => 
    axios.post("https://planet-scale-database-connect.vercel.app/buscarAlunoEspecifico", {
        id_aluno: Cookies.getItem("id_aluno")
    }).then(response => {
    console.log(response)
    setDataAluno(response.data)
}) 
)

    function adicionar() {
        axios.post("https://planet-scale-database-connect.vercel.app/criarAulaAluno", {
            id_aluno: Cookies.getItem("id_aluno"),
            dia: diasEdita.current.value,
            exercicio_1: exercicio1.current.value,
            exercicio_2: exercicio2.current.value,
            exercicio_3: exercicio3.current.value,
            exercicio_4: exercicio4.current.value,
            exercicio_5: exercicio5.current.value
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return(
        <div className={styles.main}>
            <header>
            {
                dataAluno.map(x => {
                    return(
                        <div key={x.cliente_id}>
                            <h1>{x.nome}</h1>
                        </div>
                    )
                })
            }
            <button onClick={() => setAdicionarModal(!adicionarModal)}>Adicionar</button>
           
            </header>
            <div className={styles.campo} style={{marginLeft: "0"}}>
              
                {
                    dataAulas.map(x => {
                        return(
                            <div className={styles.card}>
                                <header>
                                <h1>{x.dia_semana}</h1>
                                </header>
                                <section>
                                <h2>{x.exercicio_1}</h2>
                                </section>
                            </div>
                        )
                    })
                }
                  {
                    adicionarModal && 
                    <div className={styles.adicionar} >
                        <button onClick={() => setAdicionarModal(false)}>Fechar</button>
                        <select name="Dias" id="diasSemana" ref={diasEdita}>
                            <option value="Segunda">Segunda</option>
                            <option value="Terça">Terça</option>
                            <option value="Quarta">Quarta</option>
                            <option value="Quinta">Quinta</option>
                            <option value="Sexta">Sexta</option>
                            <option value="Sábado">Sábado</option>
                            <option value="Domingo">Domingo</option>
                        </select>
                        <input type="text" placeholder="Exercicio 1" ref={exercicio1}/>
                        <input type="text" placeholder="Exercicio 2" ref={exercicio2}/>
                        <input type="text" placeholder="Exercicio 3" ref={exercicio3}/>
                        <input type="text" placeholder="Exercicio 4" ref={exercicio4}/>
                        <input type="text" placeholder="Exercicio 5" ref={exercicio5}/>
                        <button onClick={adicionar}>Enviar</button>
                    </div>
                }
            </div>
        </div>
    )
}