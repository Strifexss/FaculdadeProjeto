import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}> 
        <div></div>
        <div className={styles.logins}>
          <input type="text" id="email" placeholder='E-mail' />
          <input type="password" id="senha" placeholder='Senha' />
          <button>
            <h2>Entrar</h2>
          </button>
        </div>
      </div>
    </div>
  )
}
