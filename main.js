import "./style.css";
import { products } from "./products.js";
let myProducts = products.map((p) => {
  p.amount = 0;
  return p;
});

function render() {
  showProducts(myProducts);
  showBasket(myProducts);
}
render();
function showProducts(products2) {
  document.querySelector("#productlist").innerHTML = "";
  products2.forEach(showProduct);
}

function showProduct(product) {
  const template = document.querySelector("#product").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = product.name;
  copy.querySelector("h2").textContent = product.price;
  copy.querySelector("input").value = product.amount;
  copy.querySelector("input").addEventListener("blur", (e) => {
    setAmount(product.id, e.target.valueAsNumber);
  });
  copy.querySelector(".minus").addEventListener("click", () => {
    subtractOne(product.id);
  });
  copy.querySelector(".plus").addEventListener("click", () => {
    addOne(product.id);
  });
  document.querySelector("#productlist").appendChild(copy);
}

function setAmount(id, amount) {
  if (amount < 0) {
    amount = 0;
  }
  myProducts = myProducts.map((item) => {
    if (item.id === id) {
      item.amount = amount;
    }
    return item;
  });
  render();
}
function subtractOne(id) {
  myProducts = myProducts.map((item) => {
    if (item.id === id) {
      if (item.amount > 0) {
        item.amount--;
      }
    }
    return item;
  });
  render();
}
function addOne(id) {
  myProducts = myProducts.map((item) => {
    if (item.id === id) {
      item.amount++;
    }
    return item;
  });
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
