//Variables Globales
const sbProductButton = document.getElementById('productButton');
const sbCategoriesButton = document.getElementById('categoriesButton');

const newProductButton = document.getElementById('newProductButton');//Boton principal
const newCategoryButton = document.getElementById('newCategoryButton');//Boton principal

const acceptProductButton = document.getElementById('acceptProductButton');//Boton Secundario
const acceptCategoryButton = document.getElementById('acceptCategoryButton');//Boton Secundario

const cancelNewProductButton = document.getElementById('cancelAddProduct');//Boton Secundario
const cancelNewCategoryButton = document.getElementById('cancelAddCategory');//Boton Secundario

const newProductMenu = document.querySelector('.addProducts');
const prueba = document.querySelector('.prueba');
const categoryMenu = document.querySelector('.addCategories');

let editMenuId;
let cancelEditProductButtonId;
let acceptEditProductButtonId;
let editProductButtonId;
let deleteProductButtonId;

let editMenu = document.querySelector('.editMenu');
let cancelEditProductButton = document.querySelector('.cancelEditProductButton');
let acceptEditProductButton = document.querySelector('.acceptEditProduct');
let editProductButton = document.querySelector('.editProductButton');
let deleteProductButton = document.querySelector('.deleteProductButton');

let inputValues = {};//Tiene almacenado el objeto listo para SourceOfTruth

let currentErrorCount = 0;
const errorHeightIncrement = 10;

let eventListenerAdded = false;//Para sideBarProductButton()

document.addEventListener('DOMContentLoaded', function() {
    createProductPage();
    showProductPage();
    showCategoryPage();
});

//Funcion para click en SideBar Buttons
function sideBarProductButton() {
    if (eventListenerAdded) return;
    let productMainPage = document.getElementById('productMainPage');
    let categoryMainPage = document.getElementById('categoriesMainPage');
    let productPage = document.getElementById('productPageContainer');
    let categoryPage = document.querySelector('.categoryPage');
    
    document.addEventListener('click', function(event) {
        let targetProduct = event.target.closest('#productButton');
        if (targetProduct) {
            console.log('Product Button funciona bien');
            if (getComputedStyle(categoryMainPage).display !== 'none'
            || getComputedStyle(productPage).display !== 'none') {
                productPage.style.display = 'none';
                categoryMainPage.style.display = 'none';
                productMainPage.style.display = 'flex';
            }
        }
        let targetCategory = event.target.closest('#categoriesButton');
        if (targetCategory) {
            console.log('Category Button funciona bien');
            if (getComputedStyle(productMainPage).display !== 'none'
            || getComputedStyle(productPage).display !== 'none') {
                productPage.style.display = 'none';
                categoryMainPage.style.display = 'flex';
                productMainPage.style.display = 'none';
            }
        }
    });
    eventListenerAdded = true;
}
sideBarProductButton();

//Funcion para ver Product Page Selectivo
function showProductPage() {
    let productMainPage = document.getElementById('productMainPage');

    document.addEventListener('click', function(event) {
        let elementClicked = event.target.closest("[id^='sku-']"); //sku-X
        if (elementClicked) {
            let idClickeado = elementClicked.id; // Obtiene el ID, por ejemplo, "sku-1"
            let idPagina = "page-" + idClickeado; // Construye el nuevo ID, ejemplo: "page-sku-1"
            let pagina = document.getElementById(idPagina); //page-sku-X
            let pageContainer = document.getElementById('productPageContainer');
            if (pagina) {
                pagina.style.display = 'block';
                pageContainer.style.display = 'block';
                productMainPage.style.display = 'none';
                console.log('showProductPage Funciona bien');
            }else {
                console.log('Page Doesnt Exist');
            }
        }
    });
}

//Funcion para crear ProductPage dinamicamente
function createProductPage() {
document.addEventListener('click', function(event) {
    // Obtener el elemento que tenga un id que empiece por "sku-"
    let idElement = event.target.closest("[id^='sku-']");
    if (!idElement) return; // Si no se hace clic en un elemento relevante, salir

    // Extraer datos del elemento clickeado
    let nameElement = idElement.querySelector('.name');
    let stockElement = idElement.querySelector('.stock');
    let imageElement = idElement.querySelector('.imageContainer img');
    let base64Src = imageElement.src; // data:image/png;base64,iVBOR_0B...
    let idJustNumber = parseInt(idElement.id.replace('sku-', ''), 10);

    if (!nameElement || !stockElement) return;

    let name = nameElement.textContent;
    let stock = stockElement.textContent;
    let skuNumber = parseInt(idElement.id.replace('sku-', ''), 10);

    // Limpiar el contenedor de la página de producto
    let fatherContainer = document.getElementById('productPageContainer');
    fatherContainer.innerHTML = '';

    // Crear el nuevo contenedor de la página de producto
    let productPage = document.createElement('div');
    productPage.classList.add('productPageCategory');
    productPage.id = `page-sku-${skuNumber}`;

    productPage.innerHTML = `
    <div class="productPageHeader">
        <h2>${name}</h2>
        <p class="lastUpdated">
        Last update <span class="date">February 25, 2025 at 7:41pm</span>
        </p>
    </div>
    <div class="productPageMain">
        <div class="productInfo">
        <div class="imageProductPage">
            <img src="${base64Src}" alt="Imagen de ${name}">
        </div>
        <div class="textContainer">
            <p class="productName">${name}</p>
            <p id="productBrand-${idJustNumber}" class="productBrand">EDIT</p>
            <p id="productSpecs-${idJustNumber}" class="productSpecs">EDIT</p>
        </div>
        </div>
        <div class="productDetails">
        <div class="buttonsContainer">
            <button id="deleteProductButton-${idJustNumber}" class="deleteProductButton">Delete</button>
            <button id="editProductButton-${idJustNumber}" class="editProductButton">Edit Product</button>
            <button style="z-index: 1;" type="button" class="cancelEditProductButton" id="cancelEditProduct-${idJustNumber}">
            Cancel
            </button>
            <button type="button" class="acceptEditProduct" id="acceptEditProduct-${idJustNumber}">
            Accept
            </button>
        <div id="editMenu-${idJustNumber}" class="editMenu">
            <label for="editTitle">Tilte</label>
            <input class="editTitle" type="text" id="editTitle-${idJustNumber}">
            <label for="editSubtitle">Brand</label>
            <input class="editSubtitle" type="text" id="editSubtitle-${idJustNumber}">
            <label for="editSpecs">Details</label>
            <input class="editSpecs" type="text" id="editSpecs-${idJustNumber}">
        </div>
        </div>
        <div class="availability">
            <strong>Availability</strong>
            <p>Stock: <span class="stockInfo">${stock}</span></p>
            <p>Product SKU: <span class="productSku">${skuNumber}</span></p>
        </div>
        </div>
    </div>
    <div class="relatedProductsContainer">
        <div class="textContainer">Related Products</div>
        <div class="relatedProducts">
        <div class="related"></div>
        <div class="related"></div>
        <div class="related"></div>
        <div class="related"></div>
        <div class="related"></div>
        <div class="related"></div>
        <div class="related"></div>
        </div>
    </div>
    `;
    fatherContainer.appendChild(productPage);
    editMenu = document.getElementById(`editMenu-${idJustNumber}`);
    cancelEditProductButton = document.getElementById(`cancelEditProduct-${idJustNumber}`);
    acceptEditProductButton = document.getElementById(`acceptEditProduct-${idJustNumber}`);
    editProductButton = document.getElementById(`editProductButton-${idJustNumber}`);
    deleteProductButton = document.getElementById(`deleteProductButton-${idJustNumber}`);
});
}

//Funcion para mostrar Category Page
function showCategoryPage() {
    document.addEventListener('click', function(event) {
        let target = event.target.closest('.innerCard');
        if (target) {
            let categoryClicked = target.closest('[id]')?.id || null;//categoryClicked tiene el ID correcto
            if (categoryClicked) {
                let idClickeado = categoryClicked; // Obtiene el ID, por ejemplo, "sku-1"
                let idPagina = "page-" + idClickeado; // Construye el nuevo ID, ejemplo: "page-sku-1"
                let pagina = document.getElementById(idPagina);
                if (pagina) {
                    let productCategory = document.querySelector('.productCategory');
                    let categoriesContainer = document.querySelector('.categoriesContainer');
                    productCategory.style.display = 'none';
                    categoriesContainer.style.display = 'none';
                    pagina.style.display = 'block';
                    productCategory.style.display = 'none';
                }
            }
        }
    })
}
showCategoryPage();

//Funcion para mostrar Menu Agregar Producto, Agregar Categoria, uso de Cancel New Product Button y Cancel New Category Button
function showMenus() {
    document.addEventListener('click', function(event) {
        let target = event.target;
        if (target) {
            if (target.id === 'newProductButton') {
                let prueba = document.getElementById('prueba');
                newProductMenu.style.display = 'flex';
                prueba.style.display = 'flex';
                cancelNewProductButton.style.display = 'block';
                acceptProductButton.style.display = 'block';
                newProductButton.style.display = 'none';
                console.log('Menu New Product Visible');
            }
        }
        if (target.id === 'cancelAddProduct') {
            newProductMenu.style.display = 'none';
            prueba.style.display = 'none';
            cancelNewProductButton.style.display = 'none';
            acceptProductButton.style.display = 'none';
            newProductButton.style.display = 'block';
        }
        if (target.id === 'newCategoryButton') {
            let categoryMenuValue = getComputedStyle(categoryMenu).display;
            if (categoryMenuValue !== 'flex') {
                categoryMenu.style.display = 'flex'
                cancelNewCategoryButton.style.display = 'block';
                acceptCategoryButton.style.display = 'block';
                newCategoryButton.style.display = 'none';
            }
        }
        if (target.id === 'cancelAddCategory') {
            categoryMenu.style.display = 'none';
            cancelNewCategoryButton.style.display = 'none';
            acceptCategoryButton.style.display = 'none';
            newCategoryButton.style.display = 'block';
        }
        let categoryMenuValue = getComputedStyle(categoryMenu).display;
        if (categoryMenuValue !== 'none') {
            if (target.id !== 'addCategories' 
                && target.id !== 'cancelAddCategory' 
                && target.id !== 'newCategoryButton' 
                && target.id !== 'categoryName' 
                && target.id !== 'productCategory' 
                && target.id !== 'acceptCategoryButton' 
                && target.id !== 'fileIcon' 
                && target.tagName !== 'LABEL'
            ) {
                categoryMenu.style.display = 'none';
                cancelNewCategoryButton.style.display = 'none';
                acceptCategoryButton.style.display = 'none';
                newCategoryButton.style.display = 'block';
            }
        }
        let productMenuValue = getComputedStyle(newProductMenu).display;
        if (productMenuValue !== 'none') {
            if (target.id !== 'cancelAddProduct' 
            && target.id !== 'acceptProductButton' 
            && target.id !== 'newProductButton' 
            && target.id !== 'addProducts' 
            && target.tagName !== 'INPUT'
            && target.tagName !== 'LABEL'
            && target.tagName !== 'SELECT' 
            && !target.classList.contains('nameMessageContainer') 
            && !target.classList.contains('quantityMessageContainer') 
            && !target.classList.contains('priceMessageContainer') 
            && !target.classList.contains('codeMessageContainer')
            && !target.classList.contains('addCategories')
         ) {
            newProductMenu.style.display = 'none';
            cancelNewProductButton.style.display = 'none';
            acceptProductButton.style.display = 'none';
            newProductButton.style.display = 'block';
            }
        }
    })
}
showMenus();

//Source of Truth
let sourceOfTruthProduct = [
    {   
        name: "LapTop Gamer",
        stock: 10,
        price: '8000',
        id: "sku-1",
        status: true, // true = Active, false = Inactive
        category: "Electronics",
        image: "assets/laptopGamer.webp" // Ruta de la imagen
    }
];

let currentID = parseInt(localStorage.getItem("currentID")) || sourceOfTruthProduct.length; // Recuperar ID o usar el length
localStorage.setItem("currentID", currentID + 1); // Incrementar el ID en localStorage

//Funcion para agregar productos nuevos al UI
function renderProducts() {
    let fatherContainer = document.getElementById("sourceOfTruthProductContainer");
    fatherContainer.innerHTML = ""; // Limpiar antes de renderizar, osea que siempre estara vacio en el HTML, pero agregara dinamicamente
    sourceOfTruthProduct.forEach(function(product) { //product es cada elemento en el array
        let productMainAncestorDiv = document.createElement('div');
        productMainAncestorDiv.classList.add('productMainAncestorDiv');
        productMainAncestorDiv.id = `productMainAncestor-${product.id}`;
        productMainAncestorDiv.innerHTML = 
        `
            <div class="checkBoxDiv">
                <input type="checkbox" class="checkInput" aria-controls="${product.id}"/>
            </div>
            <div class="productContainer" id="${product.id}">
                <div class="imageContainer">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='assets/defaultImage.webp';"/>
                </div>
                <p class="name">${product.name}</p>
                <div class="status">${product.status ? "Active" : "Inactive"}</div>
                <p class="stock">${product.stock} in Stock</p>
                <p class="category">${product.category}</p>
            </div>
        `;

        fatherContainer.appendChild(productMainAncestorDiv);//Introduce productContainer al inicio del fatherContainer que es SourceOfTruthProductContainer
    });
    // Guardar el estado actualizado en localStorage
    localStorage.setItem("sourceOfTruthProduct", JSON.stringify(sourceOfTruthProduct));
}
renderProducts();

//Funcion para hacer push a nuevo producto con Accept Button
function pushNewProduct() {
    newProductMenu.addEventListener("input", function(event) {
        let target = event.target;
        let categorySelection = document.getElementById('productCategory');
        let uploadProductImage = document.getElementById('uploadImageInput');
        let codeInput = document.getElementById('productCode');
        
        categorySelection.addEventListener('change', function(event) {
            inputValues["category"] = event.target.value; // se guarda la categoría seleccionada
        });

        uploadProductImage.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader(); // Usamos FileReader para obtener la imagen que subió el usuario
                reader.onload = function(e) {
                    inputValues["image"] = e.target.result; // La imagen se guarda en formato base64
                };
                reader.readAsDataURL(file);
            }
        });

        if (target.tagName === "INPUT") {
            inputValues[target.name] = target.value;
            console.log("Actualizando inputValues:", inputValues);
        }
    });

    acceptProductButton.addEventListener("click", function() {
        inputValues["name"] = document.getElementById('productName').value;
        inputValues["stock"] = document.getElementById('productQuantity').value; // stock es el valor de quantity
        inputValues["id"] = "sku-" + document.getElementById('productCode').value; // id en formato sku-X donde X es el código ingresado
        let newProduct = { ...inputValues };//Sirve para clonar lo que va despues de los ...
        sourceOfTruthProduct.push(newProduct);
        console.log("Producto agregado:", newProduct);
        inputValues = {};
        let inputs = newProductMenu.querySelectorAll("input");
        inputs.forEach(function(input) {
            input.value = "";
        });
        renderProducts();
    });
}
pushNewProduct();

//Funcion para Check Input
function deleteSelectedProduct() {
    document.addEventListener('change', function(event) {
        if (event.target.matches('input[type="checkbox"][aria-controls]')) {
            let targetId = event.target.getAttribute('aria-controls');
            let targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                console.log('Si funciona');
                cancelNewProductButton.style.display = 'block';
            }
        } 

    })
}
deleteSelectedProduct();

