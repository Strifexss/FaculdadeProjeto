"use client"
import styles from "./page.module.css"
import Image from "next/image"
import UserImage from "../../../imgs/icons/userIcon.png"
import { useState } from "react"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function Professores() {

    const [data, setData] = useState([])
    const [modalCadastro, setModalCadastro] = useState(false)

    const { isLoading, error} =useQuery('buscarClientes', async () =>
    await axios.get("https://planet-scale-database-connect.vercel.app/buscarProfessores")
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

   function cadastrarProfessor() {
        const nome = document.getElementById("nome").value
        const telefone = document.getElementById("telefone").value
        const email = document.getElementById("email").value
        const salario = document.getElementById("salario").value

        axios.post("https://planet-scale-database-connect.vercel.app/registrarProfessores", {
            nome: nome,
            telefone: telefone,
            salario: salario,
            email: email
        }).then((response) => {
            console.log(response)
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
                                <button>Deletar</button>
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