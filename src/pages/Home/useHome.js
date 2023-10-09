import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Toast from "../../components/Toast";
import useLoader from "../../hooks/useLoader";
import { products } from "../../mocks/Products";

export default function useHome() {
  const { setIsLoading, isLoading } = useLoader();
  const [searchTerm, setSearchTerm] = useState("");
  const [productCod, setProductCod] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productCart, setProductCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToBeRemoved, setProductToBeRemoved] = useState("");
  const printRef = useRef(null);
  const print = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => {
      setProductCart([]);
      handleResetOrdersField();
      setIsLoading(false);
    },
  });
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.nome.toUpperCase().includes(deferredSearchTerm.toUpperCase())
      ),
    [products, deferredSearchTerm]
  );
  const orderTotalPrice = productCart.reduce((acc, { valor }) => {
    return (acc += valor);
  }, 0);

  function handleEnter(e) {
    const productQtyFormatted = +productQty.slice(0, -2);
    const hasNecessaryInfo = productCod && productQtyFormatted;

    const product = getProduct();

    if (e.key === "Enter" && hasNecessaryInfo) {
      setProductCart((prevState) => [
        ...prevState,
        {
          id: product.id,
          nome: product.nome,
          quantidade: productQtyFormatted,
          valor: product.preco * productQtyFormatted,
        },
      ]);
      handleResetOrdersField();
      Toast("Produto inserido no carrinho com sucesso!");
      document.getElementById("CodigoProduto").focus();
    }
  }
  function handleResetOrdersField() {
    setProductCod("");
    setProductQty("");
    setSelectedProduct({});
  }
  function getProduct() {
    const product = products.find((product) => product.id === +productCod);

    if (!product) {
      handleResetOrdersField();
      return Toast("Produto não encontrado.", "error");
    }

    setSelectedProduct(product);
    return product;
  }
  function handleCloseModal() {
    setProductToBeRemoved("");
    setIsModalVisible(false);
  }
  function handleRemoveProduct() {
    const product = products.find(
      (product) => product.id === +productToBeRemoved
    );
    if (!product) {
      setProductToBeRemoved("");
      return Toast("Produto não encontrado.", "error");
    }

    const isProductOnCart = productCart.find(
      (product) => product.id === +productToBeRemoved
    );
    if (!isProductOnCart) {
      setProductToBeRemoved("");
      return Toast("Produto não está no carrinho.", "error");
    }

    const arrayIds = productCart.map((product) => {
      return product.id;
    });

    let newProductCart = [...productCart];
    const indexProductToBeRemoved = arrayIds.lastIndexOf(+productToBeRemoved);
    newProductCart.splice(indexProductToBeRemoved, 1);
    setProductCart(newProductCart);
    handleCloseModal();
    Toast("Produto removido do carrinho.", "error");
  }
  function handleCleanCart() {
    setProductCart([]);
    Toast("Carrinho esvaziado.", "error");
  }
  function handlePrint() {
    setIsLoading(true);
    print();
  }

  useEffect(() => {
    setProductQty("");
  }, [productCod]);

  return {
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
  };
}
