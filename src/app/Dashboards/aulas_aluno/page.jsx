"use client"

import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useRef, useState, useCallback } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"
export default function AulasAluno() {

    const [infosModal, setInfosModal] = useState(false)
    const [infos, setInfos] = useState([])
    const [adicionarModal, setAdicionarModal] = useState(false)
    const [dataAluno, setDataAluno] = useState([])
    const [dataAulas, setDataAulas] = useState([])
    const diasEdita = useRef()
    const exercicio1 = useRef()
    const exercicio2 = useRef()
    const exercicio3 = useRef()
    const exercicio4 = useRef()
    const exercicio5 = useRef()
    const dias_Edita = useRef()
    const exercicio_1 = useRef()
    const exercicio_2 = useRef()
    const exercicio_3 = useRef()
    const exercicio_4 = useRef()
    const exercicio_5 = useRef()



  useEffect(() => {
    buscarAluno
    buscarAulas
  },[]) 

  const buscarAulas = useQuery('buscarAulas', async () => 
await  axios.post("https://planet-scale-database-connect.vercel.app/buscarAulasAluno", {
    id_aluno: Cookies.getItem("id_aluno")
}).then(response => {
    console.log(response)
    setDataAulas(response.data)
}))

const buscarAluno = useQuery('buscarAluno', async () => 
await axios.post("https://planet-scale-database-connect.vercel.app/buscarAlunoEspecifico", {
    id_aluno: Cookies.getItem("id_aluno")
}).then(response => {
console.log(response)
setDataAluno(response.data)
}))
   

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

    function handleInfos(id) {
        console.log(id)
        setInfos(dataAulas.filter(x => {return x.id == id}))
        console.log(infos)
        setInfosModal(!infosModal)
    }

    function editar() {
        console.log(exercicio_1.current.textContent)
        axios.post("https://planet-scale-database-connect.vercel.app/ModificarAulasAluno", {
            id: infos[0].id,
            dia_semana: dias_Edita.current.textContent,
            exercicio_1: exercicio_1.current.textContent,
            exercicio_2: exercicio_2.current.textContent,
            exercicio_3: exercicio_3.current.textContent,
            exercicio_4: exercicio_4.current.textContent,
            exercicio_5: exercicio_5.current.textContent
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
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
                            <div className={styles.card} key={x.id} onClick={() => handleInfos(x.id)}>
                                <h1>{x.dia_semana}</h1>
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
                {
                    infosModal && 
                    <div className={styles.infosModal}>
                        <header>
                            <button onClick={() => setInfosModal(false)}>Fechar</button>
                            <button onClick={editar}>Editar </button>
                        </header>
                        <h1 contentEditable ref={dias_Edita}>{infos[0].dia_semana}</h1>
                        <div className={styles.infosCampo}>
                            <section>
                            <h2 contentEditable ref={exercicio_1}>{infos[0].exercicio_1}</h2>
                            </section>
                            <section>
                            <h2 ref={exercicio_2} contentEditable>{infos[0].exercicio_2}</h2>
                            </section>
                            <section>
                            <h2 ref={exercicio_3} contentEditable>{infos[0].exercicio_3}</h2>
                            </section>
                            <section>
                            <h2 ref={exercicio_4} contentEditable>{infos[0].exercicio_4}</h2>
                            </section>
                            <section>
                            <h2 ref={exercicio_5} contentEditable>{infos[0].exercicio_5}</h2>
                            </section>
                       </div>
                    </div>
                }
            </div>
        </div>
    )
}