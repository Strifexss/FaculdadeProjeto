"use client"
import styles from "./page.module.css"
import { useEffect, useState, useRef } from "react"
import NextIcon from "../../../imgs/icons/NextIcon.png"
import Image from "next/image"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';

export default function Planos() {


    const {push} = useRouter()

    const [deletarModal, setDeletarModal] = useState(false)
    const [info, setInfo] = useState([])
    const [modalInfo, setModalInfo] = useState(false)
    const [cadastro, setCadastro] = useState(false)
    const [data, setData] = useState([])
    const nomeEdit = useRef()
    const descricaoEdit = useRef()
    const valorEdit = useRef()
    const duracaoEdit = useRef()
    const [editarInfo, setEditarInfo] = useState(false)
    const [fecharEdit, setFecharEdit] = useState(false)

    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    },[])

    function confirmarFechar() {
        if(fecharEdit == true) {
            setEditarInfo(true)
            setFecharEdit(false)
        }
        else {
            setModalInfo(false)
        }
    }


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

   function deletar(id) {
        axios.post("https://planet-scale-database-connect.vercel.app/deletarPlanos", {
            id: id
        }).then(response => {
            console.log(response)

             axios.post("https://planet-scale-database-connect.vercel.app/buscarPlanos", {
                id_usuario: Cookies.getItem("id_usuario")
            })
           .then(response => {
            console.log(response.data)
            setData(response.data)
            setModalInfo(false)
           })

        }).catch(err => {
            console.log(err)
        })
   }

  function adicionar() {

    const nome = document.getElementById("nome").value
    const descricao = document.getElementById("descricao").value
    const dias = document.getElementById("dias").value
    const valor = document.getElementById("valor").value

    axios.post("https://planet-scale-database-connect.vercel.app/adicionarPlanos", {
        nome: nome,
        descricao: descricao,
        preco: valor,
        dias: dias,
        id_usuario: Cookies.getItem("id_usuario")
    }).then(response => {
        console.log(response)
        setCadastro(false)
        axios.post("https://planet-scale-database-connect.vercel.app/buscarPlanos", {
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

  function handleInfoData(id) {
    setInfo(data.filter(x => { return x.id == id}))
    setModalInfo(true)
  }

  function editar() {
    axios.post("https://planet-scale-database-connect.vercel.app/editarPlanos", {
        nome: nomeEdit.current.textContent,
        duracao: duracaoEdit.current.textContent,
        valor: valorEdit.current.textContent,
        descricao: descricaoEdit.current.textContent,
        id: info[0].id
    }).then(response => {
        console.log(response)

        axios.post("https://planet-scale-database-connect.vercel.app/buscarPlanos", {
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
        <div className={styles.main}>
            <header>
                <h1 onClick={() => push(`/Dashboards/landing/${Cookies.getItem("email")}`)}>Início</h1>
                <h1>-</h1>
                <h1>Planos</h1>
            </header>
            <div className={styles.botoes}>
                    <button onClick={() => setCadastro(!cadastro)}><h2>Adicionar Plano</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
            <div className={styles.campo}>
                {
                    data.map(x => {
                        return(
                            <div className={styles.card} key={x.id} onClick={() => handleInfoData(x.id)}>
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
                { isLoading &&
                        <>
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                         <div className={styles.card}>
                                <section>
                                </section>  
                        </div>        
                    </>   
                }
                 {
                    cadastro && 
                    <div className={styles.cadastro}>
                        <button onClick={() => setCadastro(false)}>Fechar</button>
                        <input type="text" placeholder="Insira o nome do Plano" id="nome" />
                        <input type="text" placeholder="Insira uma descrição para o Plano" id="descricao" />
                        <input type="number" placeholder="Insira uma duração em dias" id="dias" />
                        <input type="number" placeholder="Insira o valor do Plano" id="valor" />
                        <button onClick={adicionar}>Adicionar</button>
                    </div>
                 }
                 { 
                    modalInfo &&
                    <div className={styles.info}>
                        <div className={styles.infoButtons}>
                            <button onClick={() => confirmarFechar()}>Fechar</button>
                            <button onClick={() => setDeletarModal(true)}>Deletar</button>
                            <button onClick={() => {setEditarInfo(!editarInfo)}}>Editar</button>
                        </div>
                        {
                    deletarModal && 
                    <div>
                          <div className={styles.deletar}>
                            <h1>Deseja deletar o plano?</h1>
                         <section>
                            <button onClick={() => {setDeletarModal(false)}}><h2>Não</h2></button>
                             <button onClick={() => (deletar(info[0].id), setDeletarModal(false))}><h2>Sim</h2></button>
                         </section>
                           </div>
                    </div>
                     }          
                        <section>
                            <h1>Plano:</h1>
                            <h1 contentEditable onClick={() => setFecharEdit(true)} ref={nomeEdit}>{info[0].nomePlanos}</h1>
                        </section>
                        {
                            editarInfo &&
                            <div>
                          <div className={styles.deletar}>
                            <h1>Deseja salvar as alterações?</h1>
                         <section>
                            <button onClick={() => {setEditarInfo(false)}}><h2>Não</h2></button>
                             <button onClick={() => (editar(), setEditarInfo(false))}><h2>Sim</h2></button>
                         </section>
                           </div>
                    </div>
                        }
                        <section>
                            <h1>Descricao:</h1>
                            <p contentEditable onClick={() => setFecharEdit(true)} ref={descricaoEdit}>{info[0].descricao}</p>
                        </section>
                        <section>
                            <h1>Duração:</h1>
                            <h1 contentEditable onClick={() => setFecharEdit(true)} ref={duracaoEdit}>{info[0].duracao_dias}</h1>
                            <h1>Dias</h1>
                        </section>
                        <section>
                            <h1>Valor:</h1>
                            <h1 contentEditable onClick={() => setFecharEdit(true)} ref={valorEdit}>{info[0].preco}</h1>
                            <h1>R$</h1>
                        </section>
                
                    </div>
                 }
             
            </div>
  
        </div>
    )
}