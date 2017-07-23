(function IIFE(){
  'use strict';

  // window.stokr = window.stokr || {};


  const state = {
    // ui{
    //
    // },
   stocks: [
      {
        "Symbol": "WIX",
        "Name": "Wix.com Ltd.",
        "Change": "0.750000",
        "PercentChange": "+1.51%",
        "LastTradePriceOnly": "76.099998"
      },
      {
        "Symbol": "MSFT",
        "Name": "Microsoft Corporation",
        "PercentChange": "-2.09%",
        "Change": "-0.850006",
        "LastTradePriceOnly": "69.620003"
      },
      {
        "Symbol": "YHOO",
        "Name": "Yahoo! Inc.",
        "Change": "0.279999",
        "PercentChange": "+1.11%",
        "LastTradePriceOnly": "50.599998"
      }
    ],

    changeStatePercent: true
  };


  function generateStockRow(stock, index){
    const changeValue = state.changeStatePercent ? stock.PercentChange : stock.Change;
    const changeColorClass = parseFloat(stock.Change) >= 0 ? "gain" : "lose";

    const liElm =  `
      <li class="stock">
        <span class="stock-full-name">${stock.Symbol} (${stock.Name})</span>
        <span class="stock-details">
          <span class="last-trade-price-only">${(Math.round(stock.LastTradePriceOnly*100)/100).toFixed(2)}</span>
          <button class="change ${changeColorClass}" data-button-type="changeState">${changeValue}</button>
          <span class="move-stock-buttons" data-id="${stock.Symbol}" data-index="${index}">
            <button class="moveUp icon-arrow" data-button-type="moveUp"></button>
            <button class="moveDown icon-arrow" data-button-type="moveDown"></button>
          </span>
        </span>
      </li>
    `;

    return liElm;
  }

  function generateStocks(stocksList){
    return stocksList.map(generateStockRow).join('');
  }

  function switchChangeState() {
    state.changeStatePercent = !state.changeStatePercent;
  }

  function swap(index1,index2,array){
    if(index1 >=0 && index1 < array.length && index2 >=0 && index2 < array.length) {
      const temp = array.splice(index1,1)[0];
      array.splice(index2,0,temp);
    }
  }


  function stocksListButtonClicked(event){
    const buttonType = event.target.getAttribute("data-button-type");
    // const buttonType = event.target.dataset.button-type;

    if(buttonType === "changeState"){
      switchChangeState();
    }else {

      const clickedIndex = parseInt(event.target.parentNode.getAttribute("data-index"));
      // const clickedIndex = target.closest('li').dataset.index;

      if (buttonType === "moveUp") {
        swap(clickedIndex-1, clickedIndex,state.stocks);
      } else if (buttonType === "moveDown") {
        swap(clickedIndex, clickedIndex+1,state.stocks);
      }
    }
    renderStockList();
  }

  function renderStockList() {
    const ulElm = getStockListContainer();
    ulElm.innerHTML = generateStocks(state.stocks);

    // const changeButtonElm = document.querySelector(".change");
    // changeButtonElm.addEventListener("click",switchChangeState);
  }


  function getStockListContainer() {
    return document.querySelector("#stock-list");
  }

  function init() {
    const ulElm = getStockListContainer();
    ulElm.addEventListener("click", stocksListButtonClicked);
    renderStockList(ulElm);
  }

  init();

}());
