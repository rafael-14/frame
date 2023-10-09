import { NumericFormat } from "react-number-format";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import useLoader from "../../hooks/useLoader";
import formatCurrency from "../../utils/formatCurrency";
import handleMeasures from "../../utils/handleMeasures";
import {
  CardContainer,
  CardContent,
  Container,
  FooterContainer,
  GridDiv,
  ImgDiv,
  Item,
  MainContainer,
  Receipt,
  SummaryContainer,
} from "./styles";
import useHome from "./useHome";

export default function Home() {
  const {
    productQty,
    setProductQty,
    handleEnter,
    productCart,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    setProductCod,
    productCod,
    selectedProduct,
    getProduct,
    orderTotalPrice,
    isModalVisible,
    setIsModalVisible,
    productToBeRemoved,
    setProductToBeRemoved,
    handleCloseModal,
    handleRemoveProduct,
    handleCleanCart,
    printRef,
    handlePrint,
    isLoading,
  } = useHome();
  const { Loader } = useLoader();

  return (
    <MainContainer>
      <Modal
        danger
        title={`Qual item será removido?`}
        visible={isModalVisible}
        confirmLabel="Deletar"
        onCancel={handleCloseModal}
        onConfirm={handleRemoveProduct}
      >
        <p style={{ marginBottom: "16px" }}>
          Está ação não poderá ser desfeita!
        </p>
        <Input
          danger
          placeholder="Código do Produto"
          value={productToBeRemoved}
          onChange={(e) => setProductToBeRemoved(e.target.value)}
        />
      </Modal>
      <Container>
        <Input
          placeholder="Pesquisar Produto"
          width={100}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <GridDiv>
          {filteredProducts.map((product) => (
            <CardContainer
              key={product.id}
              onClick={() => {
                setProductCod(product.id);
                setSearchTerm("");
                document.getElementById("Quantidade").focus();
              }}
            >
              <ImgDiv>
                <img src={product.imgPath} alt={product.nome} />
              </ImgDiv>

              <CardContent>
                <div>
                  <h3>{product.nome}</h3>
                  <h4>
                    Preço: {formatCurrency(product.preco)}&nbsp;
                    {product.unidadeMedida}
                  </h4>
                  <h4>
                    Estoque:{" "}
                    {handleMeasures(product.estoque, product.unidadeMedida)}{" "}
                    {product.unidadeMedida}
                  </h4>
                  <h4>Código: {product.id}</h4>
                </div>
              </CardContent>
            </CardContainer>
          ))}
        </GridDiv>
      </Container>
      <Container>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            gap: "8px",
          }}
        >
          <Input
            id="CodigoProduto"
            placeholder="Código do Produto"
            value={productCod}
            onChange={(e) => setProductCod(e.target.value)}
            onBlur={() => productCod && getProduct()}
          />
          <NumericFormat
            id="Quantidade"
            customInput={Input}
            placeholder="Quantidade"
            value={productQty}
            onChange={(e) => setProductQty(e.target.value)}
            onKeyDown={handleEnter}
            decimalScale={selectedProduct?.unidadeMedida === "un." ? 0 : 3}
            fixedDecimalScale={selectedProduct.unidadeMedida !== "un."}
            decimalSeparator="."
            allowNegative={false}
            suffix={selectedProduct.unidadeMedida}
            //disabled={!selectedProduct.id}
          />
        </div>
        <Receipt>
          {!!productCart.length && <p onClick={handleCleanCart}>x</p>}
          <div ref={printRef}>
            <Item>
              <span>DESCRIÇÃO</span>
              <span>QUANTIDADE</span>
              <span>VALOR</span>
            </Item>
            {productCart.map((product, index) => (
              <Item key={`${index}-${product.id}`}>
                <span>{product.nome}</span>
                <span>{product.quantidade}</span>
                <span>{formatCurrency(product.valor)}</span>
              </Item>
            ))}

            {!!productCart.length && (
              <SummaryContainer>
                Valor Total: {formatCurrency(orderTotalPrice)}
              </SummaryContainer>
            )}
          </div>

          <FooterContainer>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                padding: "16px",
              }}
            >
              <Button
                danger
                disabled={!productCart.length}
                onClick={() => setIsModalVisible(true)}
              >
                Remover Item
              </Button>
              {isLoading ? (
                <Loader isLoading={isLoading} />
              ) : (
                <Button
                  disabled={!productCart.length || isLoading}
                  onClick={handlePrint}
                >
                  Concluir
                </Button>
              )}
            </div>
          </FooterContainer>
        </Receipt>
      </Container>
    </MainContainer>
  );
}
