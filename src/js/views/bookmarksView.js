import View from "./View";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg';
class bookmakrsView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage =`No  bookmarks yet, find nice recipe and bookmarked:)`;
    _message = ``;

    addHandlerRender(handler){
        window.addEventListener('load', handler)
    }

    _generateMarkup(){
        // return this._data.map(this._generateMarkupPreview).join('')
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
        
    }
   
}

export default new bookmakrsView();