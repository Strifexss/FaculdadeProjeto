"use client"
import styles from "./page.module.css"
import ExercicioImagem from "../../imgs/Bodybuilder.jpg"
import Image from "next/image"
export default function Exercicios() {
    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Exercicios</h1>
            </div>
            <Image
                src={ExercicioImagem}
                width={500}
                height={500}
                alt="BodyBuilder"
            />
            <div className={styles.destaques}>
                <>
                <h2>Destaques</h2>
                </>
                <section>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/fG_03xSzT2s" title="Como Fazer Supino Reto Corretamente!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/Ufh39C5cMfU" title="COMO FAZER AGACHAMENTO? Guia Passo a Passo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/cQW4YaRPfrg" title="Tenha o MÁXIMO DE INTENSIDADE na sua ROSCA DIRETA com a TÉCNICA PERFEITA! (+ um segredo de atleta)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/c7zMmbWkUPw" title="Como Fazer ELEVAÇÃO LATERAL! O Melhor Exercícios Para OMBRO" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </section>
            </div>
            <div className={styles.aviso}>

            </div>
        </div>
    )
}