/**
 * Created by erezr on 23/07/2017.
 */

(function () {
  `use strict`;

  window.stokr = window.stokr || {};

  function getChangeState() {
    return window.stokr.model.getChangeState();
  }

  function getStocksList() {
    return window.stokr.model.getStocksList();
  }

  function renderStockList() {
    return window.stokr.view.renderStockList();
  }

  function init() {
    window.stokr.view.renderFirstStockList(stocksListClicked);
  }



  function switchChangeState(state) {
    state.changeState = !state.changeState;
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

    renderStockList();
  }


  window.stokr.controler = {
    init,
    getChangeState,
    getStocksList
    // renderStockList
  }


}())
