"use client"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import NextIcon from "../../../imgs/icons/NextIcon.png"
import Image from "next/image"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Cookies from "js-cookies"

export default function Planos() {

    const [info, setInfo] = useState([])
    const [modalInfo, setModalInfo] = useState(false)
    const [cadastro, setCadastro] = useState(false)
    const [data, setData] = useState([])

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
        axios.post("http://localhost:3001/deletarPlanos", {
            id: id
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
   }

  function adicionar() {

    const nome = document.getElementById("nome").value
    const descricao = document.getElementById("descricao").value
    const dias = document.getElementById("dias").value
    const valor = document.getElementById("valor").value

    axios.post("http://localhost:3001/adicionarPlanos", {
        nome: nome,
        descricao: descricao,
        preco: valor,
        dias: dias,
        id_usuario: Cookies.getItem("id_usuario")
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
  }

  function handleInfoData(id) {
    setInfo(data.filter(x => { return x.id == id}))
    setModalInfo(true)
  }

    return(
        <div className={styles.main}>
            <header>
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
                        <section>
                            <button onClick={() => setModalInfo(false)}>Fechar</button>
                            <button onClick={() => deletar(info[0].id)}>Deletar</button>
                        </section>
                        <h1>Plano: {info[0].nomePlanos}</h1>
                    </div>
                 }
            </div>
        </div>
    )
}