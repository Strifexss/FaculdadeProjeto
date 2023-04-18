"use client"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function Calendario() {

    const [data, setData] = useState([])
    
    const [professor, setProfessor] = useState([])
    const [aulas, setAulas] = useState([])

    const [aulasModal, setAulasModal] = useState(false)
    const [infos, setInfos] = useState([])

    const [modalAdicionar, setModalAdicionar] = useState(false)

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

  const carregarProfessor =useQuery('carregarProfessor', async () =>
  await axios.get("https://planet-scale-database-connect.vercel.app/buscarProfessores")
 .then(async response => {
  console.log(response.data)
  setProfessor(response.data)
   
 }),
 {
   retry: 5, 
   refetchOnWindowFocus: false, 
   staleTime: 1000 * 10   
 }
) 
  
const carregarAulas =useQuery('carregarAulas', async () =>
  await axios.get("https://planet-scale-database-connect.vercel.app/buscarAulas")
 .then(async response => {
  console.log(response.data)
  setAulas(response.data)
   
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

   function adicionar() {

    const professor = document.getElementById("professor").value
    const dia = document.getElementById("dia").value
    const aula = document.getElementById("aula").value
    const fim = document.getElementById("fim").value
    const inicio = document.getElementById("inicio").value


    axios.post("https://planet-scale-database-connect.vercel.app/adicionarSemana", {
        professor: professor,
        dia: dia,
        aula: aula,
        fim: fim,
        inicio: inicio

    }).then((response) => {
        console.log(response)
        if(response.status == 200) {
            window.alert("Adicionado com Sucesso")
        }
    }).catch(err => {
        console.log(err)
    })
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
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Segunda</h1>
                    </div>
                    {
                     segunda.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Terça</h1>
                    </div>
                    {
                     terça.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Quarta</h1>
                    </div>
                    {
                     quarta.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Quinta</h1>
                    </div>
                    {
                     quinta.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Sexta</h1>
                    </div>
                    {
                     sexta.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                               <h1>{x.nome}</h1> 
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Sábado</h1>
                    </div>
                    {
                     sabado.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                                <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
                <section>
                    <div className={styles.dias} onClick={() => {setModalAdicionar(!modalAdicionar)}}>
                        <h1>Domingo</h1>
                    </div>
                    {
                     domingo.map(x => {
                        return(
                            <div key={x.id} className={styles.aula} onClick={() => {handleInfosDias(x.id)}}>
                               <h1>{x.nome}</h1>
                            </div>
                        )
                     })
                    }
                </section>
            </div>
            {
                aulasModal &&     
                <div className={styles.aulasModal}>
                    <h1>{infos[0].nome}</h1>
                    <button onClick={() => {setAulasModal(false)}}>fechar</button>
                </div>
            }
            {
                modalAdicionar && 
                <div className={styles.adicionar}>
                    <button onClick={() => setModalAdicionar(false)}>Fechar </button>
                    <h2>Professor:</h2>
                    <select name="Planos" id="professor">
                                    {  
                                        professor.map(x => {
                                            return(
                                            <option key={x.nome} value={x.id}>{x.nome}</option>
                                            )
                                        })
                                    }
                                    
                            </select>
                    <h2>Aulas:</h2>
                    <select name="Planos" id="aula">
                                    {  
                                        aulas.map(x => {
                                            return(
                                            <option key={x.nome} value={x.id}>{x.nome}</option>
                                            )
                                        })
                                    }      
                            </select>
                    <h2>Dia:</h2>
                    <select name="Planos" id="dia">
                        <option  value={"Segunda"}>{"Segunda"}</option>
                        <option  value={"Terça"}>{"Terça"}</option>
                        <option  value={"Quarta"}>{"Quarta"}</option>
                        <option  value={"Quinta"}>{"Quinta"}</option>
                        <option  value={"Sexta"}>{"Sexta"}</option>
                        <option  value={"Sabado"}>{"Sábado"}</option>
                        <option  value={"Domingo"}>{"Domingo"}</option>
                    </select>
                    <input type="number" placeholder="Hora de Inicio" id="inicio" />
                    <input type="number" placeholder="Hora do Fim" id="fim"/>
                    <button onClick={adicionar}>Adicionar</button>
                </div>
            }
        </div>
     )
}