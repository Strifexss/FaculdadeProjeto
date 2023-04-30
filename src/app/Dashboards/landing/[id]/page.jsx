"use client"
import styles from "./page.module.css"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import {motion} from "framer-motion"
import Image from "next/image";
import Link from "next/link";
import TesteImage from "../../../imgs/icons/userLandingIcon.png"
import CapelloIcon from "../../../imgs/icons/CapelloIcon.png"
import ExerciciosIcon from "../../../imgs/icons/IconExercicios.png"
import CalendarioIcon from "../../../imgs/icons/CalendarioIcon.png"
import AddIcon from "../../../imgs/icons/IconAdd.png"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Chart } from "chart.js/auto";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
export default function Landing() {
    
    const [alunosData, setAlunosData] = useState(1)
    const [professoresData, setProfessoresData] = useState(1)
    const [compromissos, setCompromissos] = useState([])
    const [compromissosModal, setCompromissosModal] = useState(false)
    const [compromissosInfos, setCompromissosInfos] = useState([])
    const [value, onChange] = useState(new Date());
    const { push } = useRouter();

    useEffect(() => {
        
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
       
      
        axios.post("https://planet-scale-database-connect.vercel.app/buscarCompromissos", {
            id: Cookies.getItem("id_usuario")
        }).then(response => {
            console.log(response.data)
            setCompromissos(response.data)
        }).catch(err => {
            console.log(err)
        })

    
       
     let ctx = document.getElementById('grafico')
     
     if (window.ctx) {
        // Se sim, destruir o gráfico anterior
        window.ctx.destroy();
    } 

    window.ctx = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
            datasets: [{
              label: 'Aulas Semanais',
              data: [12, 19, 3, 5, 2, 3, 10],
              borderWidth: 3,
              backgroundColor: ["#8257E5", "#55BCC9"]
            }]
        },
        options: {
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
              }
            },
            layout: {
                padding: 0
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
          }
    })
    
    const ctx2 = document.getElementById('grafico3')

    if (window.ctx2) {
        // Se sim, destruir o gráfico anterior
        window.ctx2.destroy();
    } 


    window.ctx2 = new Chart(ctx2, {
        type: "pie",
        data: {
            labels: ['Professor', 'Alunos'],
            datasets: [{
              label: 'Relação Aluno/Professor',
              data: [professoresData.length, alunosData.length],
              borderWidth: 3,
              backgroundColor: ["#8257E5", "#55BCC9"]
            }]
        },
        options: {
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
              }
            },
            layout: {
                padding: 0
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
          }
    })
   


    }, [alunosData, professoresData])

    const { isLoading, error} =useQuery('buscarClientes', async () =>
    await axios.post("https://planet-scale-database-connect.vercel.app/buscarClientes", {
        id_usuario: Cookies.getItem("id_usuario")
    })
   .then(response => {
    console.log(response.data)
    setAlunosData(response.data)
}),
   {
     retry: 5, 
     refetchOnWindowFocus: false, 
     staleTime: 1000 * 10   
   }
  ) 
  
  const buscarProfessores = useQuery('buscarProfessores', async () =>
   axios.post("https://planet-scale-database-connect.vercel.app/buscarProfessores", {
       id_usuario: Cookies.getItem("id_usuario")
   })
  .then(response => {
   console.log(response.data)
   setProfessoresData(response.data)
  }),
  {
    retry: 5, 
    refetchOnWindowFocus: false, 
    staleTime: 1000 * 10   
  }
  )

    function adicionarCompromissos() {
        
        const nome = document.getElementById("nomeCompromissos").value
        const descricao = document.getElementById("descricaoCompromissos").value

        axios.post("https://planet-scale-database-connect.vercel.app/adicionarCompromissos", {
            id_usuario: Cookies.getItem("id_usuario"),
            nome: nome,
            descricao: descricao
        }).then(result => {
            console.log(result)
            window.alert("Compromisso Adicionado com Sucesso!")

            axios.post("https://planet-scale-database-connect.vercel.app/buscarCompromissos", {
                id: Cookies.getItem("id_usuario")
            }).then(response => {
                console.log(response.data)
                setCompromissos(response.data)
            }).catch(err => {
                console.log(err)
            })

            setCompromissosModal(false)

        }).catch(err => {
            console.log(err)
        })
    }
    
    function deletarCompromissos(id) {
        axios.post("https://planet-scale-database-connect.vercel.app/deletarCompromissos", {
            id: id
        }).then(response => {
            console.log(response)

            axios.post("https://planet-scale-database-connect.vercel.app/buscarCompromissos", {
                id: Cookies.getItem("id_usuario")
            }).then(response => {
                console.log(response.data)
                setCompromissos(response.data)
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
        
    }


    return(
        <motion.div className={styles.main}
           
        >
            <header>
                <h2>Bem vindo de volta, {Cookies.getItem("nome")}!</h2>
            </header>
            <motion.div className={styles.campo}
            >
                <motion.div className={styles.edit}
        
                >
                    <header>
                        <h1>Gerencie Agora</h1>
                    </header>
                    <div className={styles.editCampos}>
                        <section>
                            <Image
                                src={TesteImage}
                                width={35}
                                height={35}
                                alt="Imagem"
                            />
                            <Link href={`./Dashboards/calendario/${Cookies.getItem("email")}`}><h3>Alunos</h3></Link>
                        </section>
                        <section className={styles.editCampos} style={{backgroundColor: "#FFEECC",}}>
                            <Image
                                src={CapelloIcon}
                                width={35}
                                height={35}
                                alt="Imagem"
                            />
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#FFA800"}}>Professores</h3></Link>
                        </section>
                        <section className={styles.editCampos} style={{backgroundColor: "#FDDCDF",}}>
                        <Image
                                src={ExerciciosIcon}
                                width={35}
                                height={35}
                                alt="Imagem"
                            />
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#F64E60"}}>Aulas</h3></Link>
                        </section>
                        <section className={styles.editCampos} style={{backgroundColor: "#E7DCFE",}}>
                            <Image
                                src={CalendarioIcon}
                                width={35}
                                height={35}
                                alt="Imagem"
                            />
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#8950FC"}}>Calendario</h3></Link>
                        </section>
                    </div>
                </motion.div>
                <motion.div className={styles.toDo}
                  
                >
                    <header>
                        <h2>Compromissos</h2>
                        <motion.div 
                             whileTap={{scale: 0.80}}   
                        >
                        <Image onClick={() => setCompromissosModal(!compromissosModal)}
                            src={AddIcon}
                            width={40}
                            height={40}
                            alt="Adicionar"
                        />
                        </motion.div>
                    </header>
                    <div className={styles.toDoCampo}>
                        {
                        compromissos.map(x => {
                            return(  
                            <section  key={x.id} onClick={() => deletarCompromissos(x.id)}>
                                <aside>
                                    <div className={styles.toDoBola}>
                                    </div>
                                    <h3>{x.nome}</h3>
                                </aside>
                                <p>{x.descricao}</p>
                            </section>)
                        }   
                            )                   
                        }
                    </div>
                </motion.div>
                <div className={styles.calendario}>
                    <header>
                        <h2>Calêndario</h2>
                    </header>
                    <Calendar onChange={onChange} value={value} 
                        className={styles.calendar}
                        locale="pt-BR"
                        tileClassName="Calêndario"
                    />
                </div>
                <div className={styles.totais}>
                    <section>
                    <Image
                            src={TesteImage}
                            width={50}
                            height={50}
                            alt="Icone"
                        />
                    <div className={styles.totaisInfos}>
                        <h2>{alunosData.length}</h2>
                        <h4>Alunos Cadastrados</h4>
                    </div>
                    </section>
                    <section>
                        <Image
                            src={TesteImage}
                            width={50}
                            height={50}
                            alt="Icone"
                        />
                        <div className={styles.totaisInfos}>
                             <h2>{professoresData.length}</h2>
                             <h4>Professores Adicionados</h4>
                        </div>
                    </section>
                </div>
                <div className={styles.grafico}>
                    <canvas id="grafico">

                    </canvas>                    
                    <canvas id="grafico3">
                    
                    </canvas>
                </div>
                {
                    compromissosModal && 
                    <div className={styles.compromissosModal}>
                        <button onClick={() => setCompromissosModal(false)}>Fechar</button>
                        <input type="text" placeholder="Nome" id="nomeCompromissos" />
                        <input type="text" placeholder="Descrição" id="descricaoCompromissos"/>
                        <button onClick={adicionarCompromissos}>Adicionar</button>
                    </div>
                }
            </motion.div>
        </motion.div>
    )
}