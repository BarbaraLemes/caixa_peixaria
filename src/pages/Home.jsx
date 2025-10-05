import GestaoProdutos from "../components/GestaoProdutos";
import Header from "../components/Header";
import Produtos from "../components/Produtos";
import SecaoPagamento from "../components/SecaoPagamento";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.produtos}>
          <Produtos />
          <GestaoProdutos />
        </div>
        <div className={styles.pagamento}>
          <SecaoPagamento />
        </div>
      </div>
    </>
  );
}
