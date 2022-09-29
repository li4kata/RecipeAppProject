import * as model from '../js/model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';


// if(module.hot){
//   module.hot.accept();
// }
// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes  = async function (){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results 
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks vie 
    bookmarksView.update(model.state.bookmarks);


    // 2) Loadin recipe
    await model.loadRecipe(id);
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfb2');
    ////// 3) rendering recipe
    recipeView.render(model.state.recipe);

  }catch(err){
    recipeView.renderError();
    console.error(err);

  }
 
};
// controlRecipes();
const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    // 1) get search qqery
    const query = searchView.getQuery();
    if(!query) return;
    // 2) load search results
   await  model.loadSearchResults(query)

   //3) render results
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons 
    paginationView.render(model.state.search)
  } catch (err){
    console.log(err);
  }
};
const controlPagination = function (goToPage){
//1) render new results
resultsView.render(model.getSearchResultsPage(goToPage));

// 2) render new pagination buttons 
paginationView.render(model.state.search)
}

// control servings for the recipes
const controlServings = function (newServings){
    // Update the recipe servings (in state )
    model.updateServings(newServings);
    // Update the recipe veiw as well 
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);

};

const controlAddBookmark = function (){
  // 1) add or remove bookamrks
  if (!model.state.recipe.bookmarked) model.addBoookmark(model.state.recipe);
  else  model.deleteBookmark(model.state.recipe.id);

  // 2) update recipe veiw
  recipeView.update(model.state.recipe);
 
  // 3) render bookamrks
  bookmarksView.render(model.state.bookmarks);

}

const controlBookmarks = function (){
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe){
  // console.log(newRecipe)
try{
  //Show loading spinner
  addRecipeView.renderSpinner();
  //upload the new recipe data
  
  await model.uploadRecipe(newRecipe);


  console.log(model.state.recipe)

  //remder recipe
  recipeView.render(model.state.recipe);
  //success message
  addRecipeView.renderMessage();

  //render the bookmark view
  bookmarksView.render(model.state.bookmarks);

// Change ID in URL ( history URL)
window.history.pushState(null, '', `$${model.state.recipe.id}`);

  //close form window
  setTimeout(function(){
    addRecipeView.toggleWindow()
  }, 2500 );
} catch(err){
  console.log('Ingredients error', err)
  addRecipeView.renderError(err.message)
}
};

// controlSearchResults()
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // addRecipeView._addHandlerShowWindow(controlAddBookmark);
  
};
init();


