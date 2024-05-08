import { useState, useEffect, useCallback, useMemo } from "react";
import Child from "./child";
import Products from "./products";
import CustomHook from "./custom-hooks";

export default function HooksPage() {
  const [number, setNumber] = useState<number>(0);
  const [like, setLike] = useState<number>(0);
  const listProduct = [
    { name: "iPhone", price: 1000 },
    { name: "Samsung", price: 2000 },
  ];

  const listProductMemo = useMemo(() => listProduct, []);

  // const [state, setState] = useState({
  //   firstName: "Van",
  //   lastName: "Luong",
  //   age: 20,
  // })

  useEffect(() => {
    console.log("useEffect - tương đương componentDidMount bên class");
  }, []);

  useEffect(() => {
    console.log("useEffect - tương đương componentDidUpdate bên class");
  }, [number]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Hello");
    }, 1000);

    return () => {
      console.log("useEffect - tương đương componentWillUnmount bên class");
      clearInterval(interval);
    };
  }, []);

  const renderLikeNumber = () => {
    return `Số like: ${like}`;
  };

  const renderLikeNumberCallback = useCallback(renderLikeNumber, [like]);

  return (
    <div>
      HooksPage
      <h4>Number: {number}</h4>
      <button
        className="btn btn-success"
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Increase Number
      </button>
      <h4>Like: {like}</h4>
      <button
        className="btn btn-primary"
        onClick={() => {
          setLike(like + 1);
        }}
      >
        Like
      </button>
      <br />
      <Child renderLike={renderLikeNumberCallback} />
      <Products listProduct={listProductMemo} />
      <br/>
      <CustomHook/>
    </div>
  );
}
