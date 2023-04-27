"use client"
import styles from "./page.module.css"
import axios from "axios"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { use, useState } from "react"
import Image from "next/image"
import {motion} from "framer-motion"
import UserImage from "../../../imgs/icons/userIcon.png"
import { useEffect } from "react"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';

export default function Usuarios() {

    const [id_usuario, setId_usuario] = useState()
    const [data, setData] = useState([])
    const [cadastro, setCadastro] = useState(false)
    const [planos, setPlanos] = useState([])
    const [openCliente, setOpenCliente] = useState(false)
    const [dadosClientes, setDadosClientes] = useState({})
    const [deletarConfirm, modalDeletarConfirm] = useState(false)
    const { push } = useRouter();
    //Função para validar o acesso a pagina
    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    }, [])


    //Query para buscar os dados do Cliente, utiliza o useState "Data" para guardar os dados
  const { isLoading, error} =useQuery('buscarClientes', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarClientes", {
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

  //Query para buscar os planos, guarda os dados no useState "planos"
  const buscarPlanos =useQuery('buscarPlanos', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarPlanos",{
    id_usuario: Cookies.getItem("id_usuario")
}
    )
   .then(response => {
    setPlanos(response.data)
   }),
   {
     retry: 5, 
     refetchOnWindowFocus: false, 
     staleTime: 1000 * 10   
   }
  ) 


   //Funcao que cadastra so alunos/Clientes
  function cadastrar() {
    const email = document.getElementById("email").value
    const peso = document.getElementById("peso").value
    const nome = document.getElementById("nome").value
    const telefone = document.getElementById("telefone").value
    const altura = document.getElementById("altura").value
    const objetivo = document.getElementById("objetivo").value
    const planosId = document.getElementById("planosId").value
    axios.post("https://planet-scale-database-connect.vercel.app/registrarClientes", {
        email: email,
        nome: nome,
        peso: peso,
        altura: altura,
        objetivo: objetivo,
        telefone: telefone,
        planosId: planosId,
        id_usuario: Cookies.getItem("id_usuario") 
    }).then((response) => {
        console.log(response)
        if(response.status == 200) {
            window.alert("Cliente Cadastrado com Sucesso")
            location.reload()
        }
    }).catch(err => {
        console.log(err)
    })
   }

   /*Funcao que pega o id do cliente clicado e filtra o array Data, passando o resultado para useState "dadosClientes"
    sendo utilizado depois no modal com as informacoes do Cliente
   */
   function handleFilterData(email) {
        setDadosClientes(data.filter(x => {return x.email == email}))
   }

   function handleDeleteCliente(email) {
        axios.post("https://planet-scale-database-connect.vercel.app/deletarCliente", {
            email: email
        }).then((response) => {
            console.log(response)
            if(response.status == 200) {
                window.alert("Cliente Deletado com Sucesso")
                location.reload()
            }
        }).catch(err => {
            console.log(err)
        })
   }

    return(
        <div className={styles.main}>
            <div className={styles.rodape}>
                <h1>Alunos cadastrados</h1>
            </div>
            <div className={styles.campo}>
                <div className={styles.botoes}>
                    <button onClick={() => setCadastro(!cadastro)}><h2>Cadastrar Aluno</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.cardsCampo}>
                    {isLoading && 
                    <>
                            <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                        <div className={styles.cardsLoading}>
                            <section>
                                <div className={styles.cardsLoadingUser}></div>                        
                                <div className={styles.cardsLoadingInfos}></div>
                            </section>
                            <div className={styles.cardsLoadingInfos2}></div>
                        </div>
                    </>
                    }
                    {data.map(x => {
                        return(
                            <motion.div
                               initial={{opacity: 0}}
                               animate={{opacity: 1}}
                               transition={{ duration: 0.5 }}
                            key={x.email} className={styles.cards} onClick={() => {setOpenCliente(true), handleFilterData(x.email)}}>
                        <section >
                        <Image 
                            src={UserImage}
                            width={500}
                            height={500}
                            alt="Cliente"
                        />
                        <h3 >{x.nome}</h3>
                        </section>
                        <h4 >Email: {x.email}</h4>
                        <h4 >Telefone: {x.telefone}</h4>
                        <h4>{x.nomePlanos}</h4>
                    </motion.div>
                        )
                    })}        
                </div>
                {
                    cadastro && 
                        <motion.div className={styles.cadastro}
                            initial={{x: 60}}
                            animate={{x: 0}}
                            transition={{ duration: 0.3 }}
                        >
                            <button onClick={() => setCadastro(false)}><h2>Fechar</h2></button>
                            <section>
                                <input type="text" placeholder="Nome" id="nome"/>
                                <input type="text" placeholder="Email" id="email"/>
                                <input type="text" placeholder="Telefone" id="telefone"/>
                                <input type="text" placeholder="Altura" id="altura"/>
                                <input type="text" placeholder="Peso" id="peso"/>
                                <input type="text" placeholder="Objetivo" id="objetivo"/>
                                <select name="Planos" id="planosId">
                                    {  
                                        planos.map(x => {
                                            return(
                                            <option key={x.id} value={x.id}>{x.nomePlanos}</option>
                                            )
                                        })
                                    }
                                    
                            </select>
                            </section>
                            <button onClick={cadastrar}><h2>Cadastrar</h2></button>
                        </motion.div>    
                    
                }
                {
                    openCliente &&
                    <div className={styles.OpenCliente}>
                        <div className={styles.flexarButtons}>
                            <button onClick={() => {setOpenCliente(false)}}>Fechar</button>
                            <button onClick={() => {modalDeletarConfirm(!deletarConfirm)}}>Excluir</button>
                        </div>
                        <section>
                            <div className={styles.principalContainer}>
                                {
                                    deletarConfirm && 
                                        <div className={styles.deletar}>
                                            <h1>Deseja deletar o aluno?</h1>
                                            <section>
                                                <button onClick={() => {modalDeletarConfirm(!deletarConfirm)}}><h2>Não</h2></button>
                                                <button onClick={() => (handleDeleteCliente(dadosClientes[0].email), modalDeletarConfirm(!deletarConfirm))}><h2>Sim</h2></button>
                                            </section>
                                        </div>
                                        
                                }
                                 <div className={styles.userName}>
                                    <Image
                                        src={UserImage}
                                        width={500}
                                        height={500}
                                        alt="Cliente"
                                    />
                                    <h1>{dadosClientes[0].nome}</h1>
                                    
                                 </div>
                                 <section>
                                 <div className={styles.Objetivo}>
                                    <h1>Objetivo:</h1>
                                    <h3>{dadosClientes[0].objetivo}</h3>
                                 </div>
                                 <div className={styles.Objetivo}>
                                    <h1>{dadosClientes[0].nomePlanos}</h1>
                                    <h3>{dadosClientes[0].descricao}</h3>
                                 </div>
                                 </section>
                                 <section>
                                 <div className={styles.dadosPrincipais}>
                                    <h1>Email:</h1>
                                    <h3>{dadosClientes[0].email}</h3>
                                 </div>
                                 <div className={styles.dadosPrincipais}>
                                    <h1>Telefone:</h1>
                                    <h3>{dadosClientes[0].telefone}</h3>
                                 </div>
                                 </section>
                                 <div className={styles.infoCorpo}>
                                    <section>
                                        <h1>
                                            Peso:
                                        </h1>
                                        <h3>
                                            {dadosClientes[0].peso}Kg
                                        </h3>
                                    </section>
                                    <section>
                                        <h1>
                                            Altura:
                                        </h1>
                                        <h3>
                                            {dadosClientes[0].altura}
                                        </h3>
                                    </section>
                                 </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
        </div>
    )
}