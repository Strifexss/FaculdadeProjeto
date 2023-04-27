"use client"
import styles from "./page.module.css"
import Image from "next/image"
import UserImage from "../../../imgs/icons/userIcon.png"
import { useState } from "react"
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

   function deletar(id) {
    axios.post(`http://localhost:3001/deletarProfessores`, {
        id: id
    }).then(result => {
        console.log(result)
        window.alert("Professor deletado com sucesso")
        location.reload()
    }).catch(err => {
        console.log(err)
    })
   }

   function handleDelete(id) {
        setFilterData(data.filter(x => x.id == id))
        modalDeletarConfirm(!deletarConfirm)
   }

   function cadastrarProfessor() {
        const nome = document.getElementById("nome").value
        const telefone = document.getElementById("telefone").value
        const email = document.getElementById("email").value
        const salario = document.getElementById("salario").value

        axios.post("https://planet-scale-database-connect.vercel.app/registrarProfessores", {
            nome: nome,
            telefone: telefone,
            salario: salario,
            email: email,
            id_usuario: Cookies.getItem("id_usuario")
        }).then((response) => {
            console.log(response)
            window.alert("Professor Cadastrado com Sucesso")
            location.reload()
        }).catch(err => {
            console.log(err)
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
                             <div key={x.id} className={styles.professor}>
                                <section>
                                    <Image
                                        src={UserImage}
                                        alt="Professor"
                                        width={500}
                                        height={500}
                                    />
                                </section>
                                <h3>{x.nome}</h3>
                                <button onClick={() => handleDelete(x.id)}>Deletar</button>
                                <div className={styles.infoProfessor}>
                                    <p>Telefone: {x.telefone}</p>
                                    <p>E-mail: {x.email}</p>
                                    <p>Salario: R${x.salario}</p>
                                    <p>Contratação: {x.data_contratacao}</p>                                
                                </div>
                            </div>
                            )
                        })
                    }
                    {
                        deletarConfirm && 
                                <div className={styles.deletar}>
                                    <h2>Deseja deletar o Professor?</h2>
                                    <section>
                                        <button onClick={() => {modalDeletarConfirm(!deletarConfirm)}}><h2>Não</h2></button>
                                        <button onClick={() => (deletar(filterData[0].id), modalDeletarConfirm(!deletarConfirm))}><h2>Sim</h2></button>
                                    </section>
                                </div>                                
                    }
                </div>
                {
                    modalCadastro &&
                    <div className={styles.cadastro}>
                        <button onClick={() => setModalCadastro(false)}>Fechar</button>
                        <input type="text"  id="nome" placeholder="Nome" />
                        <input type="text"  id="email" placeholder="E-mail" />
                        <input type="text"  id="telefone" placeholder="Telefone" />
                        <input type="number"  id="salario" placeholder="Salario" />
                        <button onClick={cadastrarProfessor}>Cadastrar</button>
                    </div>
                }
            </div>
        </div>
    )
}