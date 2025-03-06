function createCategoryPage() {
    let categoriesContainer = document.querySelector('.cardsContainer');
    categoriesContainer.addEventListener('click', function(event) {
        let cardClicked = event.target.closest("[id^='cat-']");
        if (!cardClicked) return;

        let title = cardClicked.querySelector('.cardText .title').textContent;
        let idClickeado = cardClicked.id;
        let idPagina = 'categoryPage-' + idClickeado;

        // Verificar si la página ya existe
        if (document.getElementById(idPagina)) {
            console.log('La página ya existe:', idPagina);
            showCategoryPage(idPagina);
            return;
        }

        let fatherContainer = document.getElementById('categoryPageContainer');
        
        let categoryPage = document.createElement('div');
        categoryPage.classList.add('categoryPage');
        categoryPage.id = idPagina;
        
        categoryPage.innerHTML = `
            <div id="${idClickeado}" class="categoryPageContent">
                <div class="productsHeader">
                    <h2 class="lgTxt">${title} Products</h2>
                    <div class="searchInputContainerProduct">
                        <input
                            type="search"
                            id="searchProduct-${idClickeado}"
                            class="input"
                            placeholder="Search product..."
                            oninput="buscarProducto()"
                            autocomplete="off"
                        />
                        <img src="assets/icons8-search-50.png" alt="" />
                    </div>
                </div>
                <!-- Aquí puedes agregar más contenido específico de la categoría -->
            </div>
        `;
        
        fatherContainer.appendChild(categoryPage);
        console.log('Página creada:', idPagina);
        showCategoryPage(idPagina);
    });
}