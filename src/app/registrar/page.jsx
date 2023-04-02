import styles from "./page.module.css"
import Link from "next/link"
export default function registrar() {
    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.registrar}>
                    <h1>Crie sua conta</h1>
                    <input type="text" placeholder="Seu E-mail"/>
                    <input type="text" placeholder="Seu Nome"/>
                    <input type="password" placeholder="Sua Senha"/>
                    <input type="password" placeholder="Repita sua Senha"/>
                    <p>Ao se registrar, você aceita nossos <span>termos de uso</span> e a nossa <span>política de privacidade</span>.</p>
                    <button><h2>Cadastrar</h2></button>
                </div>
                <div className={styles.infos}>
                    <h1>Mais de 200mil booster já estão conectados</h1>
                    <p>Junte-se a milhares de devs e acelere na direção dos seus objetivos</p>
                    <Link href="/"><p>voltar para login</p></Link>
                </div>
            </div>
        </div>    
    )
}