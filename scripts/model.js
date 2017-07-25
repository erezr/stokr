/**
 * Created by erezr on 23/07/2017.
 */

(function () {
  `use strict`;

  window.stokr = window.stokr || {};

  // const xhr = new XMLHttpRequest();
  // xhr.addEventListener('load',function (event) {
  //   state.stocks = JSON.parse(event);
  // })
  // // xhr.onload = function (event) {
  // //   state.stocks = JSON.parse(event);
  // // };
  // const url = "../mocks/stocks.json";
  // xhr.open('GET',url);
  // xhr.send();

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

    changeState: true
  };

  // const changeValues = ["change","precent"]


  function getState() {
    return state;
  }

  function getChangeState() {
    return state.changeState;
  }

  function getStocksList() {
    return state.stocks;
  }

  window.stokr.model = {
    getState,
    getChangeState,
    getStocksList,
    // stocksListClicked
  }

}())
