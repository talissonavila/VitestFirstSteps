import { FormEvent } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        navigate("/dashboard");
    }
    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <input type="text" placeholder="insira seu e-mail" />
                <input type="text" placeholder="insira sua senha" />
                <button>login</button>
                <Link to="/sign-up">Não possui cadastro? Clique aqui!</Link>
            </form>
        </div>
    )
}