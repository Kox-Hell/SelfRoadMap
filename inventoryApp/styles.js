//Variables Globales
let sbProductButton = document.getElementById('productButton');
let sbCategoriesButton = document.getElementById('categoriesButton');

let newProductButton = document.getElementById('newProductButton');//Boton principal
let newCategoryButton = document.getElementById('newCategoryButton');//Boton principal

let acceptProductButton = document.getElementById('acceptProductButton');//Boton Secundario
let acceptCategoryButton = document.getElementById('acceptCategoryButton');//Boton Secundario

let cancelNewProductButton = document.getElementById('cancelAddProduct');//Boton Secundario
let cancelNewCategoryButton = document.getElementById('cancelAddCategory');//Boton Secundario

let productMenu = document.querySelector('.addProducts');
let prueba = document.querySelector('.prueba');
let categoryMenu = document.querySelector('.addCategories');

let inputValues = {};//Tiene almacenado el objeto listo para SourceOfTruth

let currentErrorCount = 0;
const errorHeightIncrement = 10;

//Funcion para ver propiedades de lo que sea que de click
function clickedItemProperties() {
    document.addEventListener('click', function(event) {
        let target = event.target;
        console.log("ID:", target.id || "Sin ID");
        console.log("Clase:", target.className || "Sin Clases");
        console.log("Clases:", target.classList.value.split(" "));
    });
}
clickedItemProperties();

//Source of Truth
let sourceOfTruth = [
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

let currentID = parseInt(localStorage.getItem("currentID")) || sourceOfTruth.length; // Recuperar ID o usar el length
localStorage.setItem("currentID", currentID + 1); // Incrementar el ID en localStorage

//Funcion para agregar productos nuevos al UI
function renderProducts() {
    let fatherContainer = document.getElementById("sourceOfTruthContainer");
    fatherContainer.innerHTML = ""; // Limpiar antes de renderizar, osea que siempre estara vacio en el HTML, pero agregara dinamicamente
    sourceOfTruth.forEach(function(product) { //product es cada elemento en el array
        let productDiv = document.createElement("div");//Crea el div
        productDiv.classList.add("productContainer");//Le da una clase
        productDiv.id = product.id; // Usa el ID que tenga product
        productDiv.innerHTML = //Crea dinamicamente el contenido del productContainer
            `
            <input type="checkbox" class="checkInput" />
            <div class="imageContainer">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='assets/defaultImage.webp';"/>
            </div>
            <p class="name">${product.name}</p>
            <div class="status">${product.status ? "Active" : "Inactive"}</div>
            <p class="stock">${product.stock} in Stock</p>
            <p class="category">${product.category}</p>
            `;
        fatherContainer.appendChild(productDiv);//Introduce productContainer al inicio del fatherContainer que es SourceOfTruthContainer
    });
    // Guardar el estado actualizado en localStorage
    localStorage.setItem("sourceOfTruth", JSON.stringify(sourceOfTruth));
}
renderProducts();

//Funcion para crear ProductPage dinamicamente
function createProductPage() {
    let fatherContainer = document.getElementById('productPageContainer');
    fatherContainer.innerHTML = '';
    fatherContainer.forEach(function(page) {
        let productPage = document.createElement('div');
        productPage.classList.add('productPageCategory');
        productPage.id = 'page-sku-';
        productPage.innerHTML = 
    `                    
        <div class="productPageHeader">
        <h2 id="sku-">Laptop Gamer</h2>
        <p class="lastUpdated">
        Last update <span class="date">February 25, 2025 at 7:41pm</span>
        </p>
        </div>
        <div class="productPageMain">
        <div class="productInfo">
        <div class="imageProductPage">
        </div>
        <div class="textContainer">
        <p class="productName">
        </p>
        <p class="productBrand">
        </p>
        <p class="productSpecs">
        </p>
        </div>
        </div>
        <div class="productDetails">
        <div class="buttonsContainer">
        <button class="deleteProductButton">
        Delete
        </button>
        <button class="editProductButton">
        Edit Product
        </button>
        </div>
        <div class="availability">
        <strong>
        Availability
        </strong>
        <p>
        Stock: <span class="stockInfo">10</span>
        </p>
        <p>
        Product SKU: <span class="productSku">1</span>
        </p>
        </div>
        </div>
        </div>
        <div class="relatedProductsContainer">
        <div class="textContainer">
        Related Products
        </div>
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
    });
}

//Funcion para hacer push a nuevo producto con Accept Button
function pushNewProduct() {
    productMenu.addEventListener("input", function(event) {
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
        inputValues["stock"] = document.getElementById('productQuantity').value; // stock es el valor de quantity
        inputValues["id"] = "sku-" + document.getElementById('productCode').value; // NUEVO: id en formato sku-X donde X es el código ingresado
        let newProduct = { ...inputValues };
        sourceOfTruth.push(newProduct);
        console.log("Producto agregado:", newProduct);
        inputValues = {};
        let inputs = productMenu.querySelectorAll("input");
        inputs.forEach(function(input) {
            input.value = "";
        });
        renderProducts();
    });
}
pushNewProduct();

newCategoryButton.addEventListener('click', function() {
    showAddCategory();
    closeMenu();
});

sbProductButton.addEventListener('click', function() {
    showProducts();
});

sbCategoriesButton.addEventListener('click', function() {
    showCategories();
});

newProductButton.addEventListener('click', function() {
    showProductMenu();
    closeMenu();
});

cancelNewProductButton.addEventListener('click', function() {
    showProductMenu();
});

cancelNewCategoryButton.addEventListener('click', function() {
    showAddCategory();
});

acceptProductButton.addEventListener('click', function() {
    errorMessage();
});
document.getElementById('productName').addEventListener('input', function () {
    document.querySelector('.nameMessageContainer').classList.remove('error');
});

document.getElementById('productQuantity').addEventListener('input', function () {
    document.querySelector('.quantityMessageContainer').classList.remove('error');
});

document.getElementById('productPrice').addEventListener('input', function () {
    document.querySelector('.priceMessageContainer').classList.remove('error');
});

document.getElementById('productCode').addEventListener('input', function () {
    document.querySelector('.codeMessageContainer').classList.remove('error');
});


//Funcion para mostrar pagina de Products
function showProducts() {
    let productCategory = document.querySelector('.productCategory');
    let categoriesContainer = document.querySelector('.categoriesContainer');
    let productPage = document.querySelector('.productPageCategory');
    let categoryPage = document.querySelector('.categoryPage');
    let pageContainer = document.getElementById('productPageContainer');

    if (categoriesContainer.style.display !== 'none') {
        productCategory.style.display = 'flex';
        categoriesContainer.style.display = 'none';
        productPage.style.display = 'none';
        categoryPage.style.display = 'none';
        pageContainer.style.display = 'none';

    }else {
        productCategory.style.display = 'flex';
        categoriesContainer.style.display = 'none';
        productPage.style.display = 'none';
        categoryPage.style.display = 'none';
        pageContainer.style.display = 'none';
    }
}

//Funcion para mostrar pagina de Categories
function showCategories() {
    let categoriesContainer = document.querySelector('.categoriesContainer');
    let productCategory = document.querySelector('.productCategory');
    let productPage = document.querySelector('.productPageCategory');
    let categoryPage = document.querySelector('.categoryPage');
    let pageContainer = document.getElementById('productPageContainer');

    if (productCategory.style.display !== 'none') {
        categoriesContainer.style.display = 'flex';
        productCategory.style.display = 'none';
        productPage.style.display = 'none';
        categoryPage.style.display = 'none';
        pageContainer.style.display = 'none';
    }else {
        productPage.style.display = 'none';
        categoriesContainer.style.display = 'flex';
        categoryPage.style.display = 'none';
        pageContainer.style.display = 'none';
    }
}

//Funcion para mostrar menu en Products
function showProductMenu() {
    if (productMenu.style.display === 'flex') {
        productMenu.style.display = 'none';
        prueba.style.display = 'none';
        acceptProductButton.style.display = 'none';
        newProductButton.style.display = 'block';
        newProductButton.style.zIndex = '2';
        cancelNewProductButton.style.display = 'none';
        cancelNewProductButton.style.zIndex = '1';
        // Detener la ejecución del eventListener al cerrar el menú
        document.removeEventListener('click', closeMenuHandler);//No es mia
        resetInputErrors();
    }else {
        productMenu.style.display = 'flex';
        prueba.style.display = 'flex';
        acceptProductButton.style.display = 'block';
        newProductButton.style.display = 'none';
        newProductButton.style.zIndex = '2';
        cancelNewProductButton.style.display = 'block';
        cancelNewProductButton.style.zIndex = '1';
        // Reactivar el event listener solo si el menú se abre
        closeMenu();//No es mia
    }
}

//Funcion para mostrar menu en Category
function showAddCategory() {
    if (categoryMenu.style.display === 'flex') {
        categoryMenu.style.display = 'none';
        acceptCategoryButton.style.display = 'none';
        newCategoryButton.style.display = 'block';
        newCategoryButton.style.zIndex = '2';
        cancelNewCategoryButton.style.display = 'none';
        cancelNewCategoryButton.style.zIndex = '1';
        // Detener la ejecución del eventListener al cerrar el menú
        document.removeEventListener('click', closeMenuHandler);//No es mia
    }else {
        categoryMenu.style.display = 'flex';
        acceptCategoryButton.style.display = 'block';
        newCategoryButton.style.display = 'none';
        newCategoryButton.style.zIndex = '2';
        cancelNewCategoryButton.style.display = 'block';
        cancelNewCategoryButton.style.zIndex = '1';
        // Reactivar el event listener solo si el menú se abre
        closeMenu();//No es mia
    }
}

// Funcion para cerrado de menu automatico
function closeMenu() {//No es mia
    document.addEventListener('click', closeMenuHandler);
}

//Funcion para cerrado de menu automatico
function closeMenuHandler(event) {
        let target = event.target;
        if (target.id !== 'acceptProductButton' 
            && target.id !== 'newProductButton'
            && target.id !== 'cancelAddProduct' 
            && target.id !== 'addProducts' 
            && target.id !== 'productName' 
            && target.id !== 'acceptCategoryButton' 
            && target.id !== 'newCategoryButton' 
            && target.id !== 'productCategory' 
            && target.tagName !== 'LABEL' 
            && target.tagName !== 'INPUT'
            && target.tagName !== 'SELECT' 
            && !target.classList.contains('nameMessageContainer') 
            && !target.classList.contains('quantityMessageContainer') 
            && !target.classList.contains('priceMessageContainer') 
            && !target.classList.contains('codeMessageContainer')
            && !target.classList.contains('addCategories')
        ) {
            let displayValueProduct = window.getComputedStyle(productMenu).display;
            let displayValueCategory= window.getComputedStyle(categoryMenu).display;
            
            if (displayValueProduct === 'flex') {
                showProductMenu();
            // Remueve el event listener para que no siga ejecutándose después
            document.removeEventListener('click', closeMenuHandler);//No es mia
            }
            if (displayValueCategory === 'flex') {
                showAddCategory();
            // Remueve el event listener para que no siga ejecutándose después
            document.removeEventListener('click', closeMenuHandler);//No es mia
            }
            console.log('Click fuera de los 3');
        }else {
            console.log('Click en uno de los 3')
        }
}

//Funcion para ver Product Page Selectivo
function productPage() {
    let clickProduct = document.querySelectorAll('.productContainer');
    let productCategory = document.querySelector('.productCategory');

    clickProduct.forEach(function(event) {//Event tiene el ID correcto
        let elementClicked = event.closest("[id^='sku-']");
        event.addEventListener('click', function() {
            if (elementClicked) {
                let idClickeado = elementClicked.id; // Obtiene el ID, por ejemplo, "sku-1"
                let idPagina = "page-" + idClickeado; // Construye el nuevo ID, ejemplo: "page-sku-1"
                let pagina = document.getElementById(idPagina);
                let pageContainer = document.getElementById('productPageContainer');
                if (pagina) {
                    pagina.style.display = 'block';
                    pageContainer.style.display = 'block';
                    productCategory.style.display = 'none';
                }
            }
        })
    })
}
productPage();

//Funcion para mostrar Category Page
function categoryPage() {
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
categoryPage();

// Funcion mensaje de error
function errorMessage() {
    let name = document.getElementById('productName');
    let quantity = document.getElementById('productQuantity');
    let price = document.getElementById('productPrice');
    let code = document.getElementById('productCode');

    let nameContainer = document.querySelector('.nameMessageContainer');
    let quantityContainer = document.querySelector('.quantityMessageContainer');
    let priceContainer = document.querySelector('.priceMessageContainer');
    let codeContainer = document.querySelector('.codeMessageContainer');

    let originalHeight = parseFloat(window.getComputedStyle(productMenu).height) - (currentErrorCount * errorHeightIncrement);
    let newErrorCount = 0;

    function checkField(value, container) {
        if (value.trim() === '') {
            if (!container.classList.contains('error')) {
                container.classList.add('error');
                newErrorCount++;
            }
        } else {
            container.classList.remove('error');
        }
    }
    checkField(name.value, nameContainer);
    checkField(quantity.value, quantityContainer);
    checkField(price.value, priceContainer);
    checkField(code.value, codeContainer);
    let heightDifference = (newErrorCount - currentErrorCount) * errorHeightIncrement;
    productMenu.style.height = (originalHeight + (newErrorCount * errorHeightIncrement)) + 'px';
    currentErrorCount = newErrorCount;
}

//Funcion resetear Error Message
function resetInputErrors() {
    let errorContainers = document.querySelectorAll('.nameMessageContainer, .quantityMessageContainer, .priceMessageContainer, .codeMessageContainer');
    errorContainers.forEach(container => container.classList.remove('error'));
    currentErrorCount = 0;
    productMenu.style.height = ''; // Reset the height
}



