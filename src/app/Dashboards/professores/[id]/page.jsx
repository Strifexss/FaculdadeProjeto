import styles from "./page.module.css"
import Image from "next/image"
import UserImage from "../../../imgs/icons/userIcon.png"
export default function Professores() {
    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Professores</h1>
            </div>
            <div className={styles.campo}>
                <div className={styles.botoes}>
                    <button><h2>Adicionar Professor</h2> </button>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className={styles.professorArea}>
                    <div className={styles.professor}>
                        <section>
                            <Image
                                src={UserImage}
                                alt="Professor"
                                width={500}
                                height={500}
                            />
                        </section>
                        <h3>Matheus Henrique</h3>
                        <button>Deletar</button>
                        <div className={styles.infoProfessor}>
                            <p>Telefone: 988003516</p>
                            <p>E-mail: matheushlm2@gmail.com</p>
                            <p>Salario: R$2000,00</p>
                            <p>Contratação: 15/04/2023</p>                                
                        </div>
                    </div>
                    <div className={styles.professor}>
                        <section>
                            <Image
                                src={UserImage}
                                alt="Professor"
                                width={500}
                                height={500}
                            />
                        </section>
                        <h3>Matheus Henrique</h3>
                        <button>Deletar</button>
                        <div className={styles.infoProfessor}>
                            <p>Telefone: 988003516</p>
                            <p>E-mail: matheushlm2@gmail.com</p>
                            <p>Salario: R$2000,00</p>
                            <p>Contratação: 15/04/2023</p>                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}