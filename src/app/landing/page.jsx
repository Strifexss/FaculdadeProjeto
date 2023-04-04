"use client"
import styles from "./page.module.css"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Landing() {

    const { push } = useRouter();

    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    },[])

    function deslogar() {
        Cookies.removeItem("email")
        window.alert("Deslogado")
        push("/")
    }

    return(
        <div className={styles.main}>
            <h1>Logado!!!!!</h1>
            <button onClick={deslogar}>Deslogar</button>
        </div>
    )
}