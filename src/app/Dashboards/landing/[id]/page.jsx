"use client"
import styles from "./page.module.css"
import Cookies from "js-cookies"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

<<<<<<< HEAD:src/app/landing/page.jsx
export default function Landing() {

    const { push } = useRouter();

=======


export default function landing() {
    
>>>>>>> producao:src/app/Dashboards/landing/[id]/page.jsx
    useEffect(() => {
        if(Cookies.getItem("email") == null) {
            push("/invalido")
        }
    }, [])

    const { push } = useRouter();


       

    return(
        <div className={styles.main}>
            <h1>Logado!!!!! {Cookies.getItem("email")}</h1>
        </div>
    )
}