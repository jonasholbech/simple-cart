import "./style.css";
import { products } from "./products.js";

let basket = [];

function render() {
  showProducts(products);
  showBasket(basket);
}
render();

function showProducts(products) {
  document.querySelector("#productlist").innerHTML = "";
  products.forEach(showProduct);
}

function getValue(id) {
  const item = basket.find((item) => item.id === id);
  if (!item) {
    return 0;
  }
  return item.amount;
}
function showProduct(product) {
  const template = document.querySelector("#product").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = product.name;
  copy.querySelector("h2").textContent = product.price;
  copy.querySelector("input").value = getValue(product.id);
  copy.querySelector(".minus").addEventListener("click", () => {
    subtractOne(product.id);
  });
  copy.querySelector("input").addEventListener("blur", (e) => {
    addOne(product.id, e.target.valueAsNumber);
  });
  copy.querySelector(".plus").addEventListener("click", () => {
    addOne(product.id);
  });
  document.querySelector("#productlist").appendChild(copy);
}

function subtractOne(id) {
  const tempBasket = basket.map((item) => {
    if (item.id === id) {
      item.amount--;
    }
    return item;
  });
  basket = tempBasket.filter((item) => item.amount > 0);
  render();
}
function addOne(id, amount = 1) {
  const exists = basket.findIndex((item) => item.id === id);
  console.log(exists);
  if (exists === -1) {
    basket.push({ ...products.find((item) => item.id === id), amount: amount });
  } else {
    basket = basket.map((item) => {
      if (item.id === id) {
        item.amount = item.amount + amount;
      }
      return item;
    });
  }
  basket = basket.filter((item) => item.amount > 0);
  render();
}
function showBasket(basket) {
  document.querySelector("#basket").innerHTML = "";
  const inBasket = basket.filter((item) => item.amount);
  if (inBasket.length === 0) {
    document.querySelector("#basket").innerHTML = "Empty";
  }
  inBasket.forEach(showBasketItem);
}

function showBasketItem(item) {
  const template = document.querySelector("#basketitem").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = item.name;
  copy.querySelector("input").value = item.amount;
  document.querySelector("#basket").appendChild(copy);
}
