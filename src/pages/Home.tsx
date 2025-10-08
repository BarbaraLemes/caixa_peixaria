import React from 'react';
import GestaoProdutos from "../components/GestaoProdutos";
import Header from "../components/Header";
import Produtos from "../components/Produtos";
import SecaoPagamento from "../components/SecaoPagamento";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.produtos}>
          <Produtos />
          <GestaoProdutos />
        </div>
        <div className={styles.pagamento}>
          <SecaoPagamento total={0} />
        </div>
      </div>
    </>
  );
};

export default Home;
