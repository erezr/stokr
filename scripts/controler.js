/**
 * Created by erezr on 23/07/2017.
 */

(function () {
  `use strict`;

  window.stokr = window.stokr || {};

  function getState() {
    return window.stokr.model.getState();
  }

  function getChangeState() {
    return window.stokr.model.getChangeState();
  }

  function getStocksList() {
    return window.stokr.model.getStocksList();
  }

  function renderView() {
    return window.stokr.view.render(stocksListClicked);
  }

  function fetchDataFromServer() {
    const state = window.stokr.model.getState();
    const userStocks = state.userStocks.toString();
    const url = "http://localhost:7000/quotes?q=" + userStocks;

    return fetch(url).then(function(response){
      return response.json();
    }).then(function(resAsJsonObj){
      if(resAsJsonObj.query.count === 1) {
        state.stocks = [resAsJsonObj.query.results.quote];
      }else{
        state.stocks = resAsJsonObj.query.results.quote;
      }
    });
  }

  function init() {
    fetchDataFromServer()
      .then(renderView);
  }

  function switchChangeState(state) {
    // state.changeState = !state.changeState;
    state.changeState = ++state.changeState%3;
    console.log(state.changeState);
  }

  function toggleFilter(){
    let state = window.stokr.model.getState();
    state.showFilter = !state.showFilter;
    renderView();
  }

  function swap(index1,index2,array){
    if(index1 >=0 && index1 < array.length && index2 >=0 && index2 < array.length) {
      const temp = array.splice(index1,1)[0];
      array.splice(index2,0,temp);
    }
  }

  function stocksListClicked(buttonType,clickedIndex){
    const stocks = window.stokr.model.getStocksList();
    let state = window.stokr.model.getState();
    if(buttonType === "changeState") {
      switchChangeState(state);
    }else {
      if (buttonType === "moveUp") {
        swap(clickedIndex-1, clickedIndex,stocks);
      } else if (buttonType === "moveDown") {
        swap(clickedIndex, clickedIndex+1,stocks);
      }
    }

    renderView();
  }

  function hashchangeHandler(){
    renderView();
  }

  window.stokr.controler = {
    init,
    getState,
    getChangeState,
    getStocksList,
    hashchangeHandler,
    toggleFilter
  }


}())
