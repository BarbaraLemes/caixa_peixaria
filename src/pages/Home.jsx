import Produtos from "../components/Produtos";
import SecaoPagamento from "../components/SecaoPagamento";
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.produtos}>
                <Produtos />
            </div>
            <div className={styles.pagamento}>
                <SecaoPagamento />
            </div>
        </div>
    )
}