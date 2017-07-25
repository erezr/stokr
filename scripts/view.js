/**
 * Created by erezr on 23/07/2017.
 */

(function(){
  `use strict`;

  window.stokr = window.stokr || {};

  function renderFirstStockList(changeStocksViewMode){
    const ulElm = renderStockList();
    ulElm.addEventListener('click', stocksListButtonClicked.bind(null, changeStocksViewMode));
  }

  function renderStockList() {
    const ulElm = getStockListContainer();
    const stocks = window.stokr.controler.getStocksList();
    ulElm.innerHTML = generateStocks(stocks);

    return ulElm;
    // const changeButtonElm = document.querySelector(".change");
    // changeButtonElm.addEventListener("click",switchChangeState);
  }

  function generateStockRow(stock, index, changeState){
    // const state = window.stokr.
    const changeValue = changeState ? stock.PercentChange : roundTo2DigitsAfterDot(stock.Change);
    const changeClass = parseFloat(stock.Change) >= 0 ? "gain" : "lose";

    const liElm = `
      <li class="stock">
        <span class="stock-full-name">${stock.Symbol} (${stock.Name})</span>
        <span class="stock-details">
          <span class="last-trade-price-only">${roundTo2DigitsAfterDot(stock.LastTradePriceOnly)}</span>
          <button class="change ${changeClass}" data-type="changeState">${changeValue}</button>
          <span class="move-stock-buttons" data-id="${stock.Symbol}" data-index="${index}">
            <button class="moveUp icon-arrow" data-type="moveUp"></button>
            <button class="moveDown icon-arrow" data-type="moveDown"></button>
          </span>
        </span>
      </li>
    `;

    return liElm;
  }

  // function generateFilterPanel(){
  //   const asideElm = `
  //
  //   `;
  //
  //   return asideElm;
  // }


  function roundTo2DigitsAfterDot(floatNum){
    return (Math.round(floatNum*100)/100).toFixed(2)
  }

  function generateStocks(stocksList){
    const changeState = window.stokr.controler.getChangeState();
    return stocksList.map((stock, index) => {
      return generateStockRow(stock, index, changeState)
    }).join('');
  }

  function getStockListContainer() {
    return document.querySelector("#stock-list");
  }

  function stocksListButtonClicked(changeStocksViewMode, event) {
    const buttonType = event.target.dataset.type;
    const clickedIndex = parseInt(event.target.parentNode.getAttribute("data-index"));
    // const clickedIndex = event.target.closest('li').dataset.index;
    changeStocksViewMode(buttonType, clickedIndex);
  }

  window.stokr.view = {
    renderStockList,
    getStockListContainer,
    renderFirstStockList
  }

}())
