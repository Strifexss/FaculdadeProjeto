"use client"
import styles from "./page.module.css"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TesteImage from "../../../imgs/icons/userLandingIcon.png"
export default function Landing() {
    
    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    }, [])

    const { push } = useRouter();

    return(
        <div className={styles.main}>
            <header>
                <h2>Bem vindo de volta, {Cookies.getItem("nome")}!</h2>
            </header>
            <div className={styles.campo}>
                <div className={styles.edit}>
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
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#FFA800"}}>Professores</h3></Link>
                        </section>
                        <section className={styles.editCampos} style={{backgroundColor: "#FDDCDF",}}>
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#F64E60"}}>Aulas</h3></Link>
                        </section>
                        <section className={styles.editCampos} style={{backgroundColor: "#E7DCFE",}}>
                        <Link href={`./Dashboards/professores/${Cookies.getItem("email")}`}> <h3 style={{color: "#8950FC"}}>Calendario</h3></Link>
                        </section>
                    </div>
                </div>
                <div className={styles.toDo}>
                    <header><h2>Compromissos</h2></header>
                    <div className={styles.toDoCampo}>
                        <section>
                            <aside>
                                <div className={styles.toDoBola}>
                                </div>
                                <h3>Contact Sales</h3>
                            </aside>
                            <p>Proin sagittis nisl diam, in pretium velit congue et.</p>
                        </section>
                        <section>
                            <aside>
                                <div className={styles.toDoBola}>
                                </div>
                                <h3>Meet with new client</h3>
                            </aside>
                            <p>Donec sodales, tellus at facilisis commodo, lectus lectus pharetra neque, at condimentum augue diam vitae massa.</p>
                        </section>
                        <section>
                            <aside>
                                <div className={styles.toDoBola}>
                                </div>
                                <h3>Dinner with manager</h3>
                            </aside>
                            <p>Aenean facilisis mi ac vestibulum vestibulum.</p>
                        </section>
                        <section>
                            <aside>
                                <div className={styles.toDoBola}>
                                </div>
                                <h3>Meeting with the colegues</h3>
                            </aside>
                            <p>Aenean facilisis mi ac vestibulum vestibulum.</p>
                        </section>
                        <section>
                            <aside>
                                <div className={styles.toDoBola}>
                                </div>
                                <h3>Lunch with Wife</h3>
                            </aside>
                            <p>Aenean facilisis mi ac vestibulum vestibulum.</p>
                        </section>
                    </div>
                </div>
                <div className={styles.calendario}>
                    <header>
                        <h2>Calêndario</h2>
                    </header>
                    <input type="datetime-local" />
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
                        <h2>218</h2>
                        <h4>Sales Today</h4>
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
                             <h2>4.138</h2>
                             <h4>Visitors Today</h4>
                        </div>
                    </section>
                </div>
                <div className={styles.grafico}>

                </div>
            </div>
        </div>
    )
}