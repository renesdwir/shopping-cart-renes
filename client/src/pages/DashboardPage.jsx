import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  let [products, setProducts] = useState([]);
  let [quantity, setQuantity] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        let { data } = await axios.get("http://localhost:4000/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  function updateQuantity(id, total) {
    setQuantity({ ...quantity, [id]: total });
  }
  function totalItem() {
    let total = 0;
    for (let key in quantity) {
      total += quantity[key];
    }
    return total;
  }
  function totalPrice() {
    let total = 0;
    for (let key in quantity) {
      total += quantity[key] * products[key - 1].price;
    }
    return total;
  }
  function handleSubmit() {
    let price = totalPrice();
    let item = totalItem();
    console.log(quantity, price, item);
  }
  return (
    <>
      <div className="flex flex-row gap-4 flex-wrap justify-center mt-10">
        {products.map((el) => {
          return (
            <div
              key={el.id}
              className="shadow-md p-5 border-t-8 border-blue-500 rounded-t-md"
            >
              <h1>{el.name}</h1>
              <p>{el.description}</p>
              <p>{el.price}</p>
              <div className="flex flex-row justify-evenly mt-5">
                <button
                  className="bg-green-400 px-2 font-bold my-auto"
                  onClick={() => {
                    updateQuantity(
                      el.id,
                      quantity[el.id] ? quantity[el.id] + 1 : 1
                    );
                  }}
                >
                  +
                </button>
                <h1>{quantity[el.id] ? quantity[el.id] : 0}</h1>
                <button
                  className="bg-red-400 px-2 font-bold my-auto"
                  onClick={() => {
                    updateQuantity(
                      el.id,
                      quantity[el.id] > 0 ? quantity[el.id] - 1 : 0
                    );
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="border-2 shadow-md border-blue-600 rounded-md inline-block p-5 mt-10 ">
          <h1 className="font-bold mb-5">Order Summary</h1>
          <div>
            <h1>Total Price: {totalPrice()}</h1>
            <h1>Total Item: {totalItem()}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </>
  );
}
