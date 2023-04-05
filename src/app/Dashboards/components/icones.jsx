import styles from "./icones.module.css"
import Image from "next/image"
export default function Icones(props) {
    return(
        <div className={styles.main}>
            <Image
                src={props.imagem}
                width={500}
                height={500}
                alt="icone"
            />
            <h3>{props.nome}</h3>
        </div>
    )
}