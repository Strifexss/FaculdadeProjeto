import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CidadeImagem from "./imgs/purpleCidade.webp"

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}> 
        <div>
          <Image
            src={CidadeImagem}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.logins}>
          <input type="text" id="email" placeholder='E-mail' />
          <input type="password" id="senha" placeholder='Senha' />
          <button>
            <h2>Entrar</h2>
          </button>
          <Link href="/registrar"><p>Não tem uma conta? <span>Registre-se</span></p></Link>
        </div>
      </div>
    </div>
  )
}
