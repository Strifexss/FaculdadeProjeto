import styles from "./page.module.css"

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
            </div>
        </div>
    )
}