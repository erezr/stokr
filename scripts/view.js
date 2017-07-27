/**
 * Created by erezr on 23/07/2017.
 */

(function(){
  `use strict`;

  window.stokr = window.stokr || {};

  function renderNavigationHeader() {
    const headerElm = document.querySelector(".root header");
    headerElm.innerHTML = `
        <h1>stokr</h1>
        <nav class="nav-menu">
          <a class="icon-search" href="#search"></a>
          <button class="icon-refresh"></button>
          <button class="icon-filter" id="filter"></button>
          <button class="icon-settings"></button>
        </nav>
      `;

    headerElm.addEventListener("click",navigationHandler);
  }

  function render(changeStocksViewMode){

    const url = window.location.hash.slice(1);

    if(url === '' || url ==='#'){
      renderNavigationHeader();
      renderStocksList(changeStocksViewMode);
    } else if(url.toLowerCase() === "search"){
      const headerElm = document.querySelector(".root header");
      headerElm.innerHTML = ``;
      const mainElm = document.querySelector("main");
      mainElm.innerHTML = `
          <h1>Searching....</h1>
          <a href="#">Cancel</a>
        `;
    }

    window.addEventListener('hashchange', window.stokr.controler.hashChangeHandler);
  }

  function renderStocksList(changeStocksViewMode) {
    const state = window.stokr.controler.getState();
    const mainElm = document.querySelector("main");

    if(state.showFilter) {
      mainElm.innerHTML = generateFilterPanel();
      // const filterElm = mainElm.querySelector("#filter-panel");
    }else{
      mainElm.innerHTML = ``;
    }


    const ulStr = `
      <ul class="stock-list" id="stock-list">
      </ul>
    `;

    const stocks = window.stokr.controler.getStocksList();
    mainElm.innerHTML += ulStr;
    let ulElm = document.querySelector("#stock-list");
    ulElm.innerHTML = generateStocks(stocks,state);
    ulElm.addEventListener('click', stocksListButtonClicked.bind(null, changeStocksViewMode));

    const filterButton = mainElm.querySelector("#filter-panel");
    if (filterButton) {
      filterButton.addEventListener("submit", formHandlerSubmit);
    }

    return mainElm;
  }

  function generateStockRow(stock, index, state){
    // const changeValue = state.changeState ? stock.realtime_chg_percent : roundTo2DigitsAfterDot(stock.Change);
    let changeValue = null;
    const changeEnum = window.stokr.controler.getChangeEnum();
    if(changeEnum[state.changeState] === "percent"){
      changeValue = roundTo2DigitsAfterDot(stock.realtime_chg_percent)+"%";
    }else if(changeEnum[state.changeState] === "change"){
      changeValue = roundTo2DigitsAfterDot(stock.Change);
    }else if(changeEnum[state.changeState] === "marketChange"){
      changeValue = roundTo2DigitsAfterDot(stock.MarketCapitalization.split("B")[0])+"B";
    }

    const changeClass = parseFloat(stock.Change) >= 0 ? "gain" : "lose";
    const liElm = `
      <li class="stock">
        <span class="stock-full-name">${stock.Symbol} (${stock.Name})</span>
        <span class="stock-details">
          <span class="last-trade-price-only">${roundTo2DigitsAfterDot(stock.LastTradePriceOnly)}</span>
          <button class="change ${changeClass}" data-type="changeState">${changeValue}</button>
          ${state.showReorderButtons ? generateReorderButtons(stock, index) : ''}
        </span>
      </li>
    `;

    return liElm;
  }

  function generateReorderButtons(stock, index) {
    return `<span class="move-stock-buttons" data-id="${stock.Symbol}" data-index="${index}">
        <button class="moveUp icon-arrow" data-type="moveUp"></button>
        <button class="moveDown icon-arrow" data-type="moveDown"></button>
      </span>`;
  }

  function generateFilterPanel(){
    const formElm = `
      <form class="filter-panel" id="filter-panel">
        <span class="filter-category-container">
          <label for="search-by-name">By Name</label>
          <input type="search" id="search-by-name" name="name"/>
        </span>

        <span class="filter-category-container">
          <label for="search-by-gain">By Gain</label>
          <select id="search-by-gain" name="gain">
            <option value="all">All</option>
            <option value="gain">Gain</option>
            <option value="lose">Lose</option>
          </select>
        </span>

        <!--<div class="filter-by-range-container">-->
          <span class="filter-category-container">
            <label for="search-by-name-range-from">By Range: From</label>
            <input type="number" id="search-by-name-range-from" name="rangeFrom"/>
          </span>
          <span class="filter-category-container">
            <label for="search-by-name-range-to">By Range: To</label>
            <input type="number" id="search-by-name-range-to" name="rangeTo"/>
          </span>
        <!--</div>-->

        <button class="apply-filter" id="apply-filter" type="submit">Apply</button>
      </form>
    `;

    return formElm;
  }

  function roundTo2DigitsAfterDot(floatNum){
    return (Math.round(floatNum*100)/100).toFixed(2)
  }

  function generateStocks(stocksList,state){
    return stocksList.map((stock, index) => {
      return generateStockRow(stock, index, state)
    }).join('');
  }

  function stocksListButtonClicked(changeStocksViewMode, event) {
    const buttonType = event.target.dataset.type;
    const clickedIndex = parseInt(event.target.parentNode.getAttribute("data-index"));
    // TODO: const clickedIndex = event.target.closest('li').dataset.index;
    changeStocksViewMode(buttonType, clickedIndex);
  }

  function navigationHandler(event){
    if(event.target.id === "filter"){
     window.stokr.controler.toggleFilter();
    }
  }

  function formHandlerSubmit(event){
    event.preventDefault();
    const formElm = event.target;
    const formData = new FormData(formElm);
    const filterData = {
      byName: formData.get('name'),
      byGain: formData.get('gain'),
      byRangeFrom: formData.get('rangeFrom'),
      byRangeTo: formData.get('rangeTo')
    };

    window.stokr.controler.setFilter(filterData);
    window.stokr.controler.renderView();
  }

  window.stokr.view = {
    render
  }

}())
