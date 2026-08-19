import { useState } from "react";
import "./App.css";
import { product } from "./objectToBuy";

function App() {
  function ItensShop({ item }) {
    return (
      <div className="shop-item">
        <h2>{item.name}</h2>
        <p>R$ {item.price.toFixed(2)}</p>
        <p>Desconto de 10% acima de R$ 250,00</p>
        <button
          onClick={() => adicionarAoCarrinho(item)}
          className="botao-customizado"
        >
          Comprar
        </button>
      </div>
    );
  }

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (product) => {
    const novoItem = {
      id: product.id,
      nome: product.name,
      preco: product.price, // Garante que é um número
      quantidade: product.quantidade + 1, // Incrementa a quantidade
    };

    setCarrinho([...carrinho, novoItem]);
  };
  const calcularTotal = () => {
    return carrinho.reduce((acumulador, item) => {
      // O operador || 0 garante que se o valor for indefinido, ele usa o número 0
      const preco = Number(item.preco || 0);
      const quantidade = item.quantidade || 0;

      return acumulador + preco * quantidade;
    }, 0); // O 0 aqui no final define que a soma começa em zero
  };
  // Para exibir na tela:

  const totalFormatado = calcularTotal().toFixed(2);
  const totalDesconto = () => {
    if (totalFormatado > 250.0) {
      return totalFormatado * 0.9; // Aplica o desconto de 10%
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero"></div>
      </section>
      <main>
        <main className="shop">
          {product.map((item) => (
            <ItensShop
              key={item.id}
              item={item}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          ))}
        </main>
        <section className="dadCar">
          <div id="carrinho">
            <h1>CARRINHO</h1>

            {carrinho.length === 0 ? (
              <p>Carrinho vazio</p>
            ) : (
              carrinho.map((item) => (
                <div key={item.id}>
                  <span>
                    {item.nome} ({item.quantidade}x) - R${" "}
                    {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))
            )}
            <h3>Total: R$ {totalFormatado}</h3>
            {totalDesconto() && (
              <h3>Total com Desconto: R$ {totalDesconto().toFixed(2)}</h3>
            )}
          </div>
        </section>
      </main>
      <section id="spacer"></section>
    </>
  );
}

export default App;
