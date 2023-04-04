"use client"
import styles from "./page.module.css"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function landing() {

    const { push } = useRouter();

    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    },[])



    return(
        <div className={styles.main}>
            <h1>Logado!!!!!</h1>
        </div>
    )
}