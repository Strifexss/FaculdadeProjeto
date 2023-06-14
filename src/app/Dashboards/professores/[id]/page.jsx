"use client"
import styles from "./page.module.css"
import Image from "next/image"
import UserImage from "../../../imgs/icons/userIcon.png"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';

export default function Professores() {
    
    const router = useRouter()
    const [data, setData] = useState([])
    const [modalCadastro, setModalCadastro] = useState(false)
    const [deletarConfirm, modalDeletarConfirm] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [editarModal, setEditarModal] = useState(false)
    const nomeEdit = useRef()
    const emailEdit = useRef()
    const telefoneEdit = useRef()
    const salarioEdit = useRef()
    const senhaEdit = useRef()
   
    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    },[]) 

    const { isLoading, error} =useQuery('buscarProfessores', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarProfessores", {
        id_usuario: Cookies.getItem("id_usuario")
    })
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

   function deletar() {
    axios.post(`https://planet-scale-database-connect.vercel.app/deletarProfessores`, {
        id: filterData[0].id
    }).then(result => {
        console.log(result)
        window.alert("Professor deletado com sucesso")
        location.reload()
    }).catch(err => {
        console.log(err)
    })
   }

   function handleInfos(id) {
    setFilterData(data.filter(x => x.id == id))
    console.log(filterData[0])
   }

   function cadastrarProfessor() {
        const nome = document.getElementById("nome").value
        const telefone = document.getElementById("telefone").value
        const email = document.getElementById("email").value
        const senha = document.getElementById('senha').value
        axios.post("http://localhost:3001/registrarProfessores", {
            nome: nome,
            telefone: telefone,
            email: email,
            senha: senha,
            id_usuario: Cookies.getItem("id_usuario")
        }).then((response) => {
            console.log(response)
            window.alert("Professor Cadastrado com Sucesso")
            location.reload()
        }).catch(err => {
            console.log(err)
        })
   }

   function editar() {

    axios.post("https://planet-scale-database-connect.vercel.app/editarProfessores", {
        nome: nomeEdit.current.textContent,
        email: emailEdit.current.textContent,
        telefone: telefoneEdit.current.textContent,
        id: filterData[0].id,
        senha: senhaEdit.current.textContent
    }).then(response => {
        console.log(response)
        setEditarModal(false)
        axios.post("https://planet-scale-database-connect.vercel.app/buscarProfessores", {
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
            <div className={styles.header}>
                <h1>Professores</h1>
            </div>
            <div className={styles.campo}>
                <div className={styles.botoes}>
                    <button onClick={() => {setModalCadastro(!modalCadastro)}}><h2>Adicionar Professor</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.professorArea}>
                    {isLoading && 
                        <h1>Carregando</h1>
                    }
                    {
                        data.map(x => {
                            return(
                             <div key={x.id} className={styles.professor} onClick={() => {setOpenModal(true), handleInfos(x.id)}}>
                                <section>
                                    <Image
                                        src={UserImage}
                                        alt="Professor"
                                        width={500}
                                        height={500}
                                    />
                                </section>
                                <h3>{x.nomeProfessor}</h3>
                                <div className={styles.infoProfessor}>
                                    <p>Telefone: {x.telefone}</p>
                                    <p>E-mail: {x.email}</p>
                                    <p>Senha: {x.senha}</p>
                                    <p>Contratação: {x.data_contratacao}</p>                                
                                </div>
                            </div>
                            )
                        })
                    }
               
                </div>
                {
                    modalCadastro &&
                    <div className={styles.cadastro}>
                        <button onClick={() => setModalCadastro(false)}>Fechar</button>
                        <input type="text"  id="nome" placeholder="Nome" />
                        <input type="text"  id="email" placeholder="E-mail" />
                        <input type="text"  id="senha" placeholder="Senha" />
                        <input type="text"  id="telefone" placeholder="Telefone" />
                        <button onClick={cadastrarProfessor}>Cadastrar</button>
                    </div>
                }
                {
                    openModal && 
                    <div className={styles.Modal}>
                        <div className={styles.ModalButtons}>
                            <button onClick={() => setOpenModal(false)}>Fechar</button>
                            <button onClick={ () => modalDeletarConfirm(!deletarConfirm)}>Excluir</button>
                            <button onClick={() => setEditarModal(true)}>Editar</button>
                        </div>
                        {
                        deletarConfirm && 
                                <div className={styles.deletar}>
                                    <h2>Deseja deletar o Professor?</h2>
                                    <section>
                                        <button onClick={() => {modalDeletarConfirm(!deletarConfirm)}}><h2>Não</h2></button>
                                        <button onClick={() => (deletar(), modalDeletarConfirm(!deletarConfirm))}><h2>Sim</h2></button>
                                    </section>
                                </div>                                
                        }
                        {
                            editarModal && 
                            <div className={styles.deletar}>
                            <h2>Deseja confirmar a Edição?</h2>
                            <section>
                                <button onClick={() => setEditarModal(false)}><h2>Não</h2></button>
                                <button onClick={() => editar()}><h2>Sim</h2></button>
                            </section>
                        </div>     
                        }
                        <section>
                            <h1>Nome:</h1>
                            <h1 contentEditable ref={nomeEdit}>{filterData[0].nomeProfessor}</h1>
                        </section>
                        <section>
                            <h1>Email:</h1>
                            <h1 contentEditable ref={emailEdit}>{filterData[0].email}</h1>
                        </section>
                        <section>
                            <h1>Senha:</h1>
                            <h1 contentEditable ref={senhaEdit}>{filterData[0].senha}</h1>
                        </section>
                        <section>
                            <h1>Telefone:</h1>
                            <h1  contentEditable ref={telefoneEdit}>{filterData[0].telefone}</h1>
                        </section>
                    </div>
                    
                }
            </div>
        </div>
    )
}