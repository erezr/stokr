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
    userStocks: [
      "WIX",
      "MSFT",
      "GOOG"
    ],
    stocks: [],
    //   {
    //     "Symbol": "WIX",
    //     "Name": "Wix.com Ltd.",
    //     "Change": "0.750000",
    //     "PercentChange": "+1.51%",
    //     "LastTradePriceOnly": "76.099998"
    //   },
    //   {
    //     "Symbol": "MSFT",
    //     "Name": "Microsoft Corporation",
    //     "PercentChange": "-2.09%",
    //     "Change": "-0.850006",
    //     "LastTradePriceOnly": "69.620003"
    //   },
    //   {
    //     "Symbol": "YHOO",
    //     "Name": "Yahoo! Inc.",
    //     "Change": "0.279999",
    //     "PercentChange": "+1.11%",
    //     "LastTradePriceOnly": "50.599998"
    //   }
    // ],

    filter: {
      byName:'',
      byGain:'',
      byRangeFrom:'',
      byRangeTo:''
    },

    changeEnum: {
      0: "percent",
      1: "change",
      2: "marketChange"
    },

    // TODO: put those attributes in objects
    changeState: 0,
    showHeader: true,
    showFilter: false,
    showReorderButtons: true,
    showSearch: false,
    showSettings: false
  };

  // const changeValues = ["change","precent"]


  function getState() {
    return state;
  }

  function getChangeState() {
    return state.changeState;
  }

  function getStocksList() {
    if(!state.showFilter ||
      (state.filter.byName === '' &&
      state.filter.byGain === 'All' &&
      state.filter.byRangeFrom === '' &&
      state.filter.byRangeTo === '' )) {
      return state.stocks;
    }
    else{
      // return state.stocks.filter(stock => {
      //   if(state.filter.byName !== '' && !(stock.Symbol.contains(state.filter.byName) || stock.Name.contains(state.filter.byName))) {
      //     return false;
      //   }else if(state.filter.byGain === 'Gain' && parseFloat(stock.Change) < 0 ||
      //           state.filter.byGain === 'Lose' && parseFloat(stock.Change) > 0) {
      //         return false;
      //   }else if(state.filter.byRangeFrom !== '' && parseFloat(stock.Change) < 0 ||
      //     state.filter.byGain === 'Lose' && parseFloat(stock.Change) > 0) {
      //     return false;
      //   }else if(state.filter.byGain === 'Gain' && parseFloat(stock.Change) < 0 ||
      //     state.filter.byGain === 'Lose' && parseFloat(stock.Change) > 0) {
      //     return false;
      //   }
      //
      // })
    }
  }

  window.stokr.model = {
    getState,
    getChangeState,
    getStocksList
    // stocksListClicked
  }

}())
