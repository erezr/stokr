/**
 * Created by erezr on 23/07/2017.
 */

(function () {
  `use strict`;

  window.stokr = window.stokr || {};

  const changeEnum = {
    0: "percent",
    1: "change",
    2: "marketChange"
  };

  let stocks = [];

  let state = {
    userStocks: [
      "WIX",
      "MSFT",
      "GOOG",
    ],

    filterValues: {
      byName:'',
      byGain:'',
      byRangeFrom:'',
      byRangeTo:''
    },

    changeState: 0,
    showHeader: true,
    showFilter: false,
    showReorderButtons: true,
    showSettings: false
  };


  function setFilter(filterData){
    state.filterValues.byName = filterData.byName;
    state.filterValues.byGain = filterData.byGain;
    state.filterValues.byRangeFrom = filterData.byRangeFrom;
    state.filterValues.byRangeTo = filterData.byRangeTo;
  }

  function getState() {
    return state;
  }

  function getChangeEnum(){
    return changeEnum;
  }

  function getChangeState() {
    return state.changeState;
  }

  function getStocksList() {

    console.log('state',state);
    if(!state.showFilter ||
      (state.filterValues.byName === '' &&
      state.filterValues.byGain === '' &&
      state.filterValues.byRangeFrom === '' &&
      state.filterValues.byRangeTo === '' )) {
      return stocks;
    }
    else{
      return stocks.filter(stock => {
        if(state.filterValues.byName !== '' && !(stock.Symbol.toLowerCase().includes(state.filterValues.byName) || stock.Name.toLowerCase().includes(state.filterValues.byName))) {
          return false;
        }else if(state.filterValues.byGain === 'gain' && parseFloat(stock.Change) < 0 ||
                 state.filterValues.byGain === 'lose' && parseFloat(stock.Change) > 0) {
          return false;
        }else if(state.filterValues.byRangeFrom !== '' && parseFloat(stock.realtime_chg_percent) < state.filterValues.byRangeFrom){
          return false;
        }else if(state.filterValues.byRangeTo !== '' && parseFloat(stock.realtime_chg_percent) > state.filterValues.byRangeTo){
          return false;
        }

        return true;
      })
    }
  }

  function setChangeState(changeState){
   state.changeState = changeState;
  }

  function setStocksList(stocksList){
   stocks = stocksList;
  }

  function changeFilter(){
    state.showFilter = !state.showFilter;
  }

  function setState(newState){
    state = newState;
  }

  window.stokr.model = {
    getState,
    getChangeState,
    getStocksList,
    setState,
    setChangeState,
    setStocksList,
    changeFilter,
    setFilter,
    getChangeEnum
    // stocksListClicked
  }

}())
