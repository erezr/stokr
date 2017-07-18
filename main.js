const data = [
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
]

function generatList(stock){
  const liElm =  `    
    <li class="stock" data-id="${stock.Symbol}">
      <span class="stock-full-name">${stock.Symbol} (${stock.Name})</span>
      <span class="stock-details">
        <span class="last-trade-price-only">${stock.LastTradePriceOnly}</span>
        <button class="change">${stock.PercentChange}</button>
        <span class="move-stock-buttons">
          <button class="moveUp icon-arrow"></button>
          <button class="moveDown icon-arrow"></button>
        </span>
      </span>
    </li>
  `

  return liElm;
}

function generateStocks(stocksList){
  return stocksList.map(generatList).join('');
}


const mainElm = document.querySelector("main ul");
mainElm.innerHTML = generateStocks(data);
