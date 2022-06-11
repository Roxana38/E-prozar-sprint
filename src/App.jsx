import productList from "./productList";
import { useState } from "react";
import "./index.css";
import Logo from "./images/cart logo.png";

const App = () => {
  const [randomProductOffer] = useState(
    productList[Math.floor(Math.random() * productList.length)]
  );

  const [totalBoughtProducts, setTotalBoughtProducts] = useState(0);

  const [filteredProducts, setFilteredProducts] = useState(productList);

  const [categoryFilter, setCategoryFilter] = useState("");

  const [nameFilter, setNameFilter] = useState("");

  const [priceFilter, setPriceFilter] = useState(0);

  const categories = [""];
  for (let i = 0; i < productList.length; i++) {
    if (!categories.includes(productList[i].category)) {
      categories.push(productList[i].category);
    }
  }

  const reset = (e) => {
    e.preventDefault();
    setFilteredProducts(productList);
    setCategoryFilter("");
    setNameFilter("");
    setPriceFilter(0);
  };

  const handelNameFilter = (e) => {
    let filtered = [];
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].name.toLowerCase().includes(e) &&
        productList[i].category.toLocaleLowerCase().includes(categoryFilter) &&
        parseInt(productList[i].price.substring(1)) > priceFilter
      ) {
        filtered.push(productList[i]);
      }
    }
    setFilteredProducts(filtered);
    setNameFilter(e);
  };
  const handleCategoryFilter = (e) => {
    let filtered = [];
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].name.toLocaleLowerCase().includes(nameFilter) &&
        productList[i].category.toLocaleLowerCase().includes(e) &&
        parseInt(productList[i].price.substring(1)) > priceFilter
      ) {
        filtered.push(productList[i]);
      }
    }
    setFilteredProducts(filtered);
    setCategoryFilter(e);
  };
  const handlePriceFilter = (e) => {
    let filtered = [];
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].name.toLocaleLowerCase().includes(nameFilter) &&
        productList[i].category.toLocaleLowerCase().includes(categoryFilter) &&
        parseInt(productList[i].price.substring(1)) > priceFilter
      ) {
        filtered.push(productList[i]);
      }
    }
    setFilteredProducts(filtered);
    setPriceFilter(e);
  };

  const toggleProductBoughtStatus = (product) => {
    if (product.isBought === true) {
      setTotalBoughtProducts(totalBoughtProducts - 1);
      product.isBought = false;
    } else {
      setTotalBoughtProducts(totalBoughtProducts + 1);
      product.isBought = true;
    }
    setFilteredProducts([...filteredProducts]);
  };

  randomProductOffer.newPrice = Math.round(
    parseInt(randomProductOffer.price.substring(1) / 2)
  );
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[today.getMonth()];
  const formattedDate = `${today.getDate()} ${monthName}`;

  return (
    <>
      <section className="filter">
        <div className="container">
          <input
            className="nameFilter"
            type="text"
            placeholder="Product name"
            value={nameFilter}
            onChange={(e) => {
              handelNameFilter(e.target.value.toLowerCase());
            }}
          />

          <select
            className="categoryFilter"
            value={categoryFilter}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            {categories.length
              ? categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              : null}
          </select>

          <input
            className="priceFilter"
            type="number"
            min="0"
            step="10"
            placeholder="Price under..."
            onChange={(e) => {
              handlePriceFilter(e.target.value);
            }}
            value={priceFilter}
          />

          <button className="btn" onClick={reset}>
            Reset all Filters
          </button>

          <div className="counter">
            {" "}
            <img className="logo" src={Logo} alt="Logo"></img>{" "}
            <span className="cartNumber">{totalBoughtProducts}</span>
          </div>
        </div>
      </section>

      <section className="promotion">
        <h2>Don't miss today's hot deal!</h2>

        <div className="randomCard">
          <div className="card-image">
            <img
              className="responsive"
              src={randomProductOffer.image}
              alt={randomProductOffer.name}
            />
          </div>
          <div className="hotDeal">Don't miss today's hot deal!</div>
          <div className="random_card-body">
            <h3>{randomProductOffer.name}</h3>
            <p>{randomProductOffer.shortDescription}</p>
            <p className="old-price">{randomProductOffer.price}</p>
            <p>
              <span className="newPrice">
                ${randomProductOffer.newPrice}
                <p></p>
              </span>
              <b>Only on {""}</b>
              <span className="date">{formattedDate}</span>
            </p>
            <button
              className="random_btn"
              onClick={() => toggleProductBoughtStatus(randomProductOffer)}
            >
              {randomProductOffer.isBought ? "Remove from cart" : "Buy now"}
            </button>
          </div>
        </div>
      </section>

      <section className="products">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="card-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <p className="price">{product.price}</p>
              <div className="btnContainer">
                <button
                  className="btn"
                  onClick={() => toggleProductBoughtStatus(product)}
                >
                  {product.isBought ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
        ;
      </section>
      <footer>
        <p>
          We bring you <strong>only the best products</strong> that can be
          randomly generated!
        </p>
        <p>
          Content from <a href="https://marak.github.io/faker.js/">faker.js</a>{" "}
          with images from <a href="https://picsum.photos/">Lorem Picsum</a>
        </p>
      </footer>
    </>
  );
};

export default App;
