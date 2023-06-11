"use client"

import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useRef, useState, useCallback } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"
import Image from "next/image"
import userIcon from "../../imgs/icons/userIconBig.png"
import alterIcon from "../../imgs/icons/alterIcon.png"
import quadradoIcon from "../../imgs/icons/quadradoIcon.png"
import pesoIcon from "../../imgs/icons/pesoIcon.png"
import heightIcon from "../../imgs/icons/heightIcon.png"
import { useRouter } from 'next/navigation';
export default function AulasAluno() {

    const {push} = useRouter()
    function linkarAlunos() {
        push(`/Dashboards/clientes/${Cookies.getItem("email")}`)
    }


    const [infosModal, setInfosModal] = useState(false)
    const [excluirModal, setExcluirModal] = useState(false)
    const [infos, setInfos] = useState([])
    const [adicionarModal, setAdicionarModal] = useState(false)
    const [dataAluno, setDataAluno] = useState([])
    const [dataAulas, setDataAulas] = useState([])
    
    /**Adicionar */
    const diasEdita = useRef()
    const exercicio1 = useRef()
    const exercicio2 = useRef()
    const exercicio3 = useRef()
    const exercicio4 = useRef()
    const exercicio5 = useRef()
    const nomeExercicio1 = useRef()
    const nomeExercicio2 = useRef()
    const nomeExercicio3 = useRef()
    const nomeExercicio4 = useRef()
    const nomeExercicio5 = useRef()
    /**Editar */
    const dias_Edita = useRef()
    const exercicio_1 = useRef()
    const exercicio_2 = useRef()
    const exercicio_3 = useRef()
    const exercicio_4 = useRef()
    const exercicio_5 = useRef()
    const nomeExercicio_1 = useRef()
    const nomeExercicio_2 = useRef()
    const nomeExercicio_3 = useRef()
    const nomeExercicio_4 = useRef()
    const nomeExercicio_5 = useRef()


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
            nomeExercicio1: nomeExercicio1.current.value,
            nomeExercicio2: nomeExercicio2.current.value,
            nomeExercicio3: nomeExercicio3.current.value,
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
            nomeExercicio_1: nomeExercicio_1.current.textContent,
            nomeExercicio_2: nomeExercicio_2.current.textContent,
            nomeExercicio_3: nomeExercicio_3.current.textContent,
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

    }

    function excluirAulas() {
        axios.post("https://planet-scale-database-connect.vercel.app/excluirAulasAluno", {
            id: infos[0].id
        }).then(response =>{ 
            console.log(response)
            axios.post("https://planet-scale-database-connect.vercel.app/buscarAlunoEspecifico", {
                id_aluno: Cookies.getItem("id_aluno")
            }).then(response => {
            console.log(response)
            setDataAluno(response.data)
            setInfosModal(false)
            })
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.main}>
            <header>
            
            </header>
            <div className={styles.divisoria}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center'}}>
                    <header>
                        <h3 onClick={linkarAlunos}>Alunos</h3>
                        <h3>-</h3>
                        <h3>Exercicios: {dataAluno[0] && dataAluno[0].nome}</h3>
                    </header>
                    <button onClick={() => setAdicionarModal(!adicionarModal)}>Adicionar</button>
                <div className={styles.campo} style={{marginLeft: "0"}}>
                {
                    dataAulas.map(x => {
                        return(
                            <div className={styles.card} key={x.id} onClick={() => handleInfos(x.id)}>
                                <section>
                                    <p>Dia:</p>
                                    <h2>{x.dia_semana}</h2>
                                </section>
                                <Image 
                                    src={quadradoIcon}
                                    width={50}
                                    height={50}
                                    alt="Menu"
                                />
                            </div>
                        )
                    })
                }
                  {
                    adicionarModal && 
                    <div className={styles.adicionar} >
                        <div style={{display: "flex", flexDirection: "row", width: '100%', justifyContent: "space-around", margin: '0.5rem'}}>
                            <h3>Adicionar Novos Exercicios:</h3>
                            <h3 style={{cursor: "pointer"}} onClick={() => setAdicionarModal(false)}>X</h3>
                        </div>
                        <section>
                            <select name="Dias" id="diasSemana" ref={diasEdita}>
                                <option value="Segunda">Segunda</option>
                                <option value="Terça">Terça</option>
                                <option value="Quarta">Quarta</option>
                                <option value="Quinta">Quinta</option>
                                <option value="Sexta">Sexta</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </section>
                        <section>
                            <h3>Exercicio 1:</h3>
                            <input type="text" placeholder="Nome do Exercicio 1" ref={nomeExercicio1}/>
                            <input type="text" placeholder="Exercicio 1" ref={exercicio1}/>
                        </section>
                        <section>
                            <h3>Exercicio 2:</h3>
                            <input type="text" placeholder="Nome do Exercicio 2" ref={nomeExercicio2}/>
                            <input type="text" placeholder="Exercicio 2" ref={exercicio2}/>
                        </section>
                        <section>
                            <h3>Exercicio 3:</h3>
                            <input type="text" placeholder="Nome do Exercicio 3" ref={nomeExercicio3}/>
                            <input type="text" placeholder="Exercicio 3" ref={exercicio3}/>
                        </section>
                        <div className={styles.adicionarButtons}>
                            <button style={{width: '7rem', height: '3rem', backgroundColor: 'transparent', fontWeight: 'bold'}} 
                            onClick={() => setAdicionarModal(false)}>Fechar</button>
                            <button style={{width: '7rem', height: '3rem', fontWeight: 'bold'}} 
                            onClick={adicionar}>Adicionar</button>
                        </div>
                       
                    </div>
                }
                {
                    infosModal && 
                    <div className={styles.infosModal}>
                        <header style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{display: "flex", flexDirection: 'row'}}>
                                <Image style={{marginRight: '1rem'}}
                                    src={alterIcon}
                                    width={50}
                                    height={50}
                                />
                                <div>
                                    <h2 contentEditable ref={dias_Edita}>{infos[0].dia_semana}</h2>
                                    <p>Visualize e gerencie <br /> os exercicios</p>
                                </div>
                            </div>
                            <button onClick={() => setInfosModal(false)}>Fechar</button>
                        </header>
                        {
                            excluirModal && 
                            <div className={styles.excluirModal}>
                                <h3>Deseja mesmo excluir a aula?</h3>
                                <section>
                                    <button onClick={() => setExcluirModal(false)}>Não</button>
                                    <button onClick={() => excluirAulas()}>Sim</button>
                                </section>
                            </div>
                        }
                            
                        <div className={styles.infosCampo}>
                            <h2 ref={nomeExercicio_1} contentEditable>{infos[0].nomeExercicio1}</h2>
                            <section>
                            <h3 contentEditable ref={exercicio_1}>{infos[0].exercicio_1}</h3>
                            </section>
                            <h2 ref={nomeExercicio_2 } contentEditable>{infos[0].nomeExercicio2}</h2>
                            <section>
                            <h3 ref={exercicio_2} contentEditable>{infos[0].exercicio_2}</h3>
                            </section>
                            <h2 ref={nomeExercicio_3} contentEditable>{infos[0].nomeExercicio3}</h2>
                            <section>
                            <h3 ref={exercicio_3} contentEditable>{infos[0].exercicio_3}</h3>
                            </section>
                       </div>
                       <div style={{margin: '1rem', display: "flex", flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                            <button onClick={editar} 
                            style={{backgroundColor: 'white', color: 'black', width: '8rem'}}
                            >Editar
                            </button>
                            <button onClick={() => setExcluirModal(true)} 
                            style={{backgroundColor: '#8257E5', color: 'white', width: '8rem', border: 'none'}}
                            >Excluir 
                            </button>
                       </div>
                    </div>
                }
                </div>
                </div>
                <div className={styles.alunoInformacoes}>
                    <div className={styles.userIcon}>
                    <Image
                        src={userIcon}
                        alt="Usuario"
                        width={210}
                        height={210}
                    />
                    { dataAluno[0] &&
                        <h2>{dataAluno[0].nome}</h2>
                    }
                    </div>
                    <section>
                    <h3>Objetivo:</h3>
                    <div className={styles.alunoInformacoesObjetivo}>
                        { dataAluno[0] &&
                            <h3>
                                {dataAluno[0].objetivo}
                            </h3>
                        }
                    </div>
                    </section>
                    <div className={styles.alturaPeso}>
                        <section>
                            <Image
                                src={pesoIcon}
                                width={50}
                                height={50}
                                alt="pesoIcon"
                            />
                            <div className={styles.flexarAlturaPeso}>
                            { dataAluno[0] &&
                                <h3>
                                    {dataAluno[0].peso}kg
                                </h3>
                            }
                            <p>Peso</p>
                            </div>
                        </section>
                        <section>
                            <Image
                                src={heightIcon}
                                width={50}
                                height={50}
                                alt="pesoIcon"
                            />
                            <div className={styles.flexarAlturaPeso}>
                                { dataAluno[0] &&
                                    <h3>
                                        {dataAluno[0].altura}m
                                    </h3>
                                }
                                <p>Altura</p>
                            </div>
                        </section>
                    </div>
                    <div className={styles.alunoInformacoesEmail}>
                        <h3>Email:</h3>
                        <section>
                        { dataAluno[0] &&
                                    <h3>
                                        {dataAluno[0].email}
                                    </h3>
                                }
                        </section>
                    </div>
                    <div className={styles.alunoInformacoesEmail}>
                        <h3>Telefone:</h3>
                        <section>
                        { dataAluno[0] &&
                                    <h3>
                                        {dataAluno[0].telefone}
                                    </h3>
                                }
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}