/**
 * Created by erezr on 23/07/2017.
 */

(function () {
  `use strict`;

  window.stokr = window.stokr || {};


  //TODO : order function as public and private

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
    let state = null;
    const stateFromStorage = localStorage.getItem("state");
    if(stateFromStorage !== null){
      state = JSON.parse(stateFromStorage);
      window.stokr.model.setState(state);
    } else {
      state = getState();
    }
    const userStocks = state.userStocks.toString();
    const url = "http://localhost:7000/quotes?q=" + userStocks;

    return fetch(url).then(function(response){
      return response.json();
    }).then(function(resAsJsonObj){
      if(resAsJsonObj.query.count === 1) {
        window.stokr.model.setStocksList([resAsJsonObj.query.results.quote]);
      }else{
        window.stokr.model.setStocksList(resAsJsonObj.query.results.quote);
      }
    });
  }

  function init() {
    fetchDataFromServer()
      .then(renderView);
  }

  function updateLocalStorage() {
    const state = getState();
    localStorage.setItem("state",JSON.stringify(state));
  }

  function switchChangeState(state) {
    window.stokr.model.setChangeState(++state.changeState%3);
    updateLocalStorage();
  }

  function toggleFilter(){
    window.stokr.model.changeFilter();
    updateLocalStorage();
    renderView();
  }

  function swap(index1,index2,array){
    let arrayToChange = array.slice();
    if(index1 >=0 && index1 < arrayToChange.length && index2 >=0 && index2 < arrayToChange.length) {
      const temp = arrayToChange.splice(index1,1)[0];
      arrayToChange.splice(index2,0,temp);
    }

    window.stokr.model.setStocksList(arrayToChange);
    updateLocalStorage();
  }

  function stocksListClicked(buttonType,clickedIndex){
    const stocks = getStocksList();
    let state = getState();
    if(buttonType === "changeState") {
      switchChangeState(state);
    }else {
      if (buttonType === "moveUp") {
        swap(clickedIndex-1, clickedIndex,stocks);
      } else if (buttonType === "moveDown") {
        swap(clickedIndex, clickedIndex+1,stocks);
      }
    }

    updateLocalStorage(state);
    renderView();
  }

  function hashChangeHandler(){
    renderView();
  }

  function setFilter(filterData){
    window.stokr.model.setFilter(filterData);
    updateLocalStorage();
  }

  function getChangeEnum(){
    return window.stokr.model.getChangeEnum();
  }

  window.stokr.controler = {
    init,
    getState,
    getChangeState,
    getStocksList,
    hashChangeHandler,
    toggleFilter,
    renderView,
    setFilter,
    getChangeEnum
  }


}());
