import icons from 'url:../../img/icons.svg';
export default class View {

    _data;
/**
 * Render the received object to the DOM.
 * @param {Object | Object[]} data  The data to render into DOM (e.g. recipe)
 * @param {boolean} [render=true] if false create markup string instead of rendering to the DOM
 * @return {undefined | string}A markup string is returned if render is false
 * @this {Object} View instance
 * @author IliaIliev
 * @todo Finish the implementation
 */
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.lenght === 0)) return this.renderError()

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    //Update method for text and light updates
    update(data){
        // if(!data || (Array.isArray(data) && data.lenght === 0)) return this.renderError()

        this._data = data;
        const newMarkup = this._generateMarkup();
        ////////// creating someting like a virtual DOM element , and we can update just few lines insted of reloading everything
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements =  Array.from(this._parentElement.querySelectorAll('*'));
        
        
        newElements.forEach((newEl, i ) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));

            if(
                !newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''
                ) {
                curEl.textContent = newEl.textContent;
            }
            //update attributes
            if(!newEl.isEqualNode(curEl))
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value)
            );

        })
    }


    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner  () {
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      };


      renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
        renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }


}