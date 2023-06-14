"use client"
import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation';
import Cookies from "js-cookies"
export default function Aulas() {

    const [modificar, setModificar] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState([])
    const [deletarModal, setDeletarModal] = useState(false)
    const [aulaInfo, setAulaInfo] = useState()
    const [data, setData] = useState([])
    const [openCadastro, setOpenCadastro] = useState(false)
    const nomeEdit = useRef()
    const descricaoEdit = useRef()
    const nivelEdit = useRef()
    const duracaoEdit = useRef()
    const { push } = useRouter(null);
    
    useEffect(() => {
        console.log(Cookies.getItem("email"))
        if(Cookies.hasItem("email") == false) {
            push("/invalido")
        }
    }, [])

    const { isLoading, error} =useQuery('buscarAulas', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarAulas", {
        id_usuario: Cookies.getItem("id_usuario")
    })
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
        id_usuario: Cookies.getItem("id_usuario")
    }).then((response) => {
        console.log(response)
        axios.post("https://planet-scale-database-connect.vercel.app/buscarAulas", {
            id_usuario: Cookies.getItem("id_usuario")
        })
       .then(response => {
        console.log(response.data)
        setData(response.data)
       })
    }).catch(err => {
        console.log(err)
    })
    setOpenCadastro(false)
   }

   function handleAulaInfo(id) {
        setAulaInfo(id)
        console.log(aulaInfo)
   }

   function deletar() {
        axios.post("https://planet-scale-database-connect.vercel.app/deletarAulas", {
            id_aula: aulaInfo,
            id_usuario: Cookies.getItem("id_usuario")
        }).then(response => {
            console.log(response)
            setDeletarModal(false)
            setOpenModal(false)
            axios.post("https://planet-scale-database-connect.vercel.app/buscarAulas", {
                id_usuario: Cookies.getItem("id_usuario")
            })
           .then(response => {
            console.log(response.data)
            setData(response.data)
           })
        }).catch(err => {
            console.log(err)
        })
   }

   function handleDataModal(id) {
    setModalData(data.filter(x => {return x.id == id}))
    console.log(modalData)
   }

   function editar(id) {
    console.log(nomeEdit.current.textContent)

    axios.post("https://planet-scale-database-connect.vercel.app/modificarAulas", {
        nome: nomeEdit.current.textContent,
        descricao: descricaoEdit.current.textContent,
        nivel: nivelEdit.current.textContent,
        duracao: duracaoEdit.current.textContent,
        id: id
    }).then(response => {
        console.log(response)

        axios.post("https://planet-scale-database-connect.vercel.app/buscarAulas", {
            id_usuario: Cookies.getItem("id_usuario")
        })
       .then(response => {
        console.log(response.data)
        setData(response.data)
       })

    }).catch(error => {
        console.log(error)
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
                    {data.map(x => {
                        return(
                            <div className={styles.flexar} key={x.id} onClick={() => {handleDataModal(x.id), setOpenModal(!openModal)}}>
                            <motion.div className={styles.container} 
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{ duration: 0.5 }}
                            >
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
                                   Duração: {<div>{x.duracao}</div>}hr
                                </h4>
                                <h4>
                                    Nivel: {<div> {x.nivel} </div>}
                                </h4>
                            </section>
                        </motion.div>
                        </div>
                        )
                    })}
                        
                        { isLoading &&
                            <>
                          <div className={styles.containerLoading}>
                            <div className={styles.containerHeaderLoading}>
                            </div>
                            <div className={styles.textBoxLoading}>
                                <h3>
                                </h3>
                            </div>
                            <section>
                                <h4>
                                </h4>
                                <h4>
                                </h4>
                            </section>
                        </div>
                          <div className={styles.containerLoading}>
                            <div className={styles.containerHeaderLoading}>
                            </div>
                            <div className={styles.textBoxLoading}>
                                <h3>
                                </h3>
                            </div>
                            <section>
                                <h4>
                                </h4>
                                <h4>
                                </h4>
                            </section>
                        </div>
                          <div className={styles.containerLoading}>
                            <div className={styles.containerHeaderLoading}>
                            </div>
                            <div className={styles.textBoxLoading}>
                                <h3>
                                </h3>
                            </div>
                            <section>
                                <h4>
                                </h4>
                                <h4>
                                </h4>
                            </section>
                        </div>
                        </>
}
                  
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
                {
                    openModal &&
                    <div className={styles.openAula}>
                    <section>
                        <button onClick={() => setOpenModal(false)}>Fechar</button>
                        <button onClick={() => setModificar(true)}>Editar</button>
                        <button onClick={() => { setDeletarModal(true), handleAulaInfo(modalData[0].id) }}>Deletar</button>
                    </section>
                        <div className={styles.openAulaInfos}>
                        <h2>Nome:</h2>
                        <h3 ref={nomeEdit} contentEditable>{modalData[0].nome}</h3>
                        </div>
                        <div className={styles.openAulaInfosDesc}>
                        <h2>Descrição:</h2>
                        <h3 ref={descricaoEdit} contentEditable>{modalData[0].descricao}</h3>
                        </div>
                        <div style={{width:'80%', display: "flex", justifyContent: "space-around"}}>
                                <div className={styles.openAulaInfosDesc} style={{height: "6rem"}}>
                                <h2>Duração:</h2>
                                <div style={{display: "flex"}}>
                                <h3 ref={duracaoEdit} contentEditable>{modalData[0].duracao}</h3>
                                <h3>hrs</h3>
                                </div>
                                </div>
                                <div className={styles.openAulaInfosDesc}>
                                <h2>Nivel:</h2>
                                <h3 ref={nivelEdit} contentEditable> {modalData[0].nivel}</h3>
                                </div>
                        </div>
                    </div>
                }
                  {
                        deletarModal && 
                        <div className={styles.deletar}>
                            <h2>Deseja Deletar?</h2>
                            <section>
                            <button onClick={() => setDeletarModal(false)}>Não</button>
                            <button onClick={deletar}>Sim</button>
                            </section>
                        </div>
                    }
                 {
                    modificar &&
                    <div className={styles.deletar}>
                    <h2>Deseja salvar a modificação?</h2>
                    <section>
                    <button onClick={() => setModificar(false)}>Não</button>
                    <button onClick={() => {editar(modalData[0].id), setModificar(false)}}>Sim</button>
                    </section>
                </div>
                 }
                </div>
               
        </div>
    )
}