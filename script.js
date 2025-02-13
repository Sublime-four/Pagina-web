document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const orderButtons = document.querySelectorAll(".order-btn");
    const cartContainer = document.getElementById("cart-container");
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.createElement("p");
    cartTotal.id = "cart-total";
    cartTotal.textContent = "Total: $0";
    cartContainer.appendChild(cartTotal);

    const buyButton = document.createElement("button");
    buyButton.textContent = "Comprar";
    buyButton.id = "buy-button";
    buyButton.style.marginTop = "20px";
    buyButton.style.padding = "10px 20px";
    buyButton.style.fontSize = "18px";
    buyButton.style.backgroundColor = "#ff5722";
    buyButton.style.color = "white";
    buyButton.style.border = "none";
    buyButton.style.borderRadius = "5px";
    buyButton.style.cursor = "pointer";
    buyButton.style.transition = "background 0.3s ease";
    
    buyButton.addEventListener("mouseover", () => {
        buyButton.style.backgroundColor = "#e64a19";
    });
    buyButton.addEventListener("mouseout", () => {
        buyButton.style.backgroundColor = "#ff5722";
    });
    
    cartContainer.appendChild(buyButton);
    
    const cartIcon = document.createElement("button");
    cartIcon.innerHTML = "🛒 <span id='cart-count'>0</span>";
    cartIcon.classList.add("cart-icon");
    document.body.appendChild(cartIcon);
    
    cartContainer.style.position = "fixed";
    cartContainer.style.bottom = "-100%";
    cartContainer.style.left = "0";
    cartContainer.style.width = "100%";
    cartContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    cartContainer.style.color = "white";
    cartContainer.style.padding = "30px";
    cartContainer.style.textAlign = "center";
    cartContainer.style.transition = "bottom 0.5s ease-in-out";
    cartContainer.style.height = "70%";
    cartContainer.style.overflowY = "auto";
    cartContainer.style.fontSize = "20px";
    
    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cart.length === 0) {
            cartList.innerHTML = "<p>El carrito está vacío</p>";
        } else {
            cart.forEach((item, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.name} - $${item.price} `;
    
                const quantityContainer = document.createElement("span");
                quantityContainer.style.display = "flex";
                quantityContainer.style.alignItems = "center";
                quantityContainer.style.justifyContent = "center";
                quantityContainer.style.gap = "10px";
    
                const decreaseButton = document.createElement("button");
                decreaseButton.textContent = " - ";
                decreaseButton.addEventListener("click", () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cart.splice(index, 1);
                    }
                    updateCart();
                });
    
                const quantitySpan = document.createElement("span");
                quantitySpan.textContent = ` ${item.quantity} `;
    
                const increaseButton = document.createElement("button");
                increaseButton.textContent = "+";
                increaseButton.addEventListener("click", () => {
                    item.quantity++;
                    updateCart();
                });
    
                quantityContainer.appendChild(decreaseButton);
                quantityContainer.appendChild(quantitySpan);
                quantityContainer.appendChild(increaseButton);
    
                listItem.appendChild(quantityContainer);
                cartList.appendChild(listItem);
                total += item.price * item.quantity;
            });
        }
        cartTotal.textContent = `Total: $${total.toLocaleString()}`;
    }
    
    document.querySelectorAll(".size-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const shakeContainer = event.target.closest(".shake");
    
            // Quitar 'selected' de todos los botones de tamaño en este producto
            shakeContainer.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
    
            // Agregar 'selected' solo al botón clickeado
            event.target.classList.add("selected");
        });
    });
    
        orderButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const shakeContainer = event.target.closest(".shake");
            const shakeName = shakeContainer.querySelector("h2").textContent;
            
        // Tomar el botón seleccionado
        const selectedSizeButton = shakeContainer.querySelector(".size-btn.selected");

        console.log("Selected Size Button:", selectedSizeButton); // Verifica si está obteniendo el botón correcto

// Si no hay tamaño seleccionado, muestra una alerta y detiene la ejecución
         if (!selectedSizeButton) {
         alert("Por favor selecciona un tamaño antes de ordenar.");
         return;
}

         const selectedSize = selectedSizeButton.textContent;
         const price = parseFloat(selectedSizeButton.getAttribute("data-price")); // 🔥 Ya no tiene valor por defecto

            // Crear clave única para diferenciar por tamaño
            const uniqueKey = `${shakeName} - ${selectedSize}`;
    
            // Agregar o actualizar el carrito
            const existingItem = cart.find(item => item.key === uniqueKey);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ key: uniqueKey, name: shakeName, size: selectedSize, price, quantity: 1 });
            }
    
            updateCart();
        });
    });
        
    
    cartIcon.addEventListener("click", () => {
        cartContainer.style.bottom = cartContainer.style.bottom === "0px" ? "-100%" : "0px";
    });
    
    cartIcon.style.position = "fixed";
    cartIcon.style.bottom = "20px";
    cartIcon.style.right = "20px";
    cartIcon.style.background = "none";
    cartIcon.style.border = "none";
    cartIcon.style.fontSize = "40px";
    cartIcon.style.cursor = "pointer";
    cartIcon.style.color = "#1DA3B2";
    
    buyButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }
        let message = "Hola, quiero hacer un pedido:\n";
        let total = 0;
        cart.forEach(item => {
            message += `- ${item.name} (${item.size}) x${item.quantity} - $${item.price * item.quantity}\n`;

            total += item.price * item.quantity;
        });
        message += `Total: $${total.toLocaleString()}`;
        const whatsappURL = `https://wa.me/573227661878?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    next.addEventListener("click", () => {
        menu.scrollBy({ left: 300, behavior: "smooth" });
    });

    prev.addEventListener("click", () => {
        menu.scrollBy({ left: -300, behavior: "smooth" });
    });
});

