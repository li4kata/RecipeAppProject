import View from "./View";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg';
class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage =`No recipes found for your query! Please try again :)`;
    _message = ``;


    _generateMarkup(){
      // return this._data.map(this._generateMarkupPreview).join('')
      return this._data.map(result => previewView.render(result, false)).join('');
      
  }
}

/* <div class="preview__user-generated">
<svg>
  <use href="${icons}#icon-user"></use>
</svg>
</div
</div> */


export default new ResultsView();