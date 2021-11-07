window.onload = function () {
    let options = document.getElementsByClassName('options');

    for (let opt of options) {
        opt.style.display = 'none';
    }

    // Add button to all menu items
    for (let menu of menuItems) {
        menu.appendChild(createElement('button', 'Add to order'));
    }

    //Call the get order function when the user clicks
    getOrder();

    //Call the display order function on the order page
    displayOrder();

    // Call update order quantity
    upDateOrderQty();
}; // end window.onload

//Get all the menu items on the page
let menuItems = document.getElementsByClassName("menu-container");

/** Create an element and return the element
 *
 * @param element
 * @param value
 * @returns {*}
 */
const createElement = (element, value) => {
    let newElement = document.createElement(element);
    newElement.type = "button";
    newElement.value = "order";
    newElement.name = "order";
    newElement.innerHTML = value;
    return newElement;
}

/** Get values of a menu item when the user clicks on it
 *
 */
const getOrder = () => {
    for (let item of menuItems) {
        item.addEventListener("click", function () {
            let image = item.getElementsByTagName('img')[0].src;
            let menu = item.getElementsByTagName("h3")[0].innerHTML
            let desc = item.getElementsByClassName("menu-desc")[0].innerHTML;
            let price = item.getElementsByClassName("price")[0].innerHTML;
            let calories = item.getElementsByClassName("calories")[0].innerHTML;
            let options = item.getElementsByClassName('options')[0].innerHTML;

            // Store the values of each menu item
            localStorage.setItem("img", image);
            localStorage.setItem("menu", menu);
            localStorage.setItem("desc", desc);
            localStorage.setItem("price", price);
            localStorage.setItem("calories", calories);
            localStorage.setItem("options", options);

            // Go to order page
            window.location.href = "order.html";
        });
    }
}

/** Show the user clicked order on the order page
 *
 */
const displayOrder = () => {
        // Display the values of the clicked menu item on the order page
        document.getElementById("image").src = localStorage.img;
        document.getElementById("image").alt = localStorage.menu;
        document.getElementById("menu").innerHTML = localStorage.menu;
        document.getElementById("desc").innerHTML = localStorage.desc;
        document.getElementById("price").innerHTML = localStorage.price;
        document.getElementById("calories").innerHTML = localStorage.calories;
		document.getElementById("options").innerHTML = localStorage.options;
}

/**
 * Updates the order quantity when the user click the minus or plus button
 */
const upDateOrderQty = () => {
    let minus = document.getElementById('minus');
    let plus = document.getElementById('plus');
    let qtyInput = document.getElementById('order-qty');
    let qty = document.getElementById('order-qty').innerHTML;

    //Set total price
    let totalPrice = document.getElementById('price');
    let totalCalories = document.getElementById('calories');

    // strip the dollar sign from the price
    let originalPrice = parseFloat(localStorage.price.replace('$', ''));
    let originalKcal = parseInt(localStorage.calories.replace('cal', ''));

    let currentPrice = originalPrice;
    let currentKcal = originalKcal;

    plus.addEventListener('click', function () {
        qty++;

        if (qty <= 10) {
            qtyInput.innerHTML = qty;

            // Calculate the price
            currentPrice += originalPrice;

            // Update the subtotal
            totalPrice.innerHTML =  `$${(currentPrice).toFixed(2)}`;

            // Calculate calories
            currentKcal += originalKcal;

            //Update calories
            totalCalories.innerHTML = `${currentKcal} cal`;

            if (qty > 1) {
                minus.classList.remove("plus-minus-greyed");
                minus.classList.add("plus-minus-active");
            }

            //Disable and enable plus button
            if (qty === 10) {
                plus.classList.remove("plus-minus-active");
                plus.classList.add("plus-minus-greyed");
                plus.disabled = true;
            }
        }

    });

    minus.addEventListener('click', function () {
        qty = qtyInput.innerHTML;
        qty--;

        // Make sure the order quantity is greater than 0
        if (qty > 0) {
            qtyInput.innerHTML = qty;

            // Calculate the price
            currentPrice -= originalPrice;

            // Update the subtotal
            totalPrice.innerHTML =  `$${(currentPrice).toFixed(2)}`;

            // Calculate calories
            currentKcal -= originalKcal;

            //Update calories
            totalCalories.innerHTML = `${currentKcal} cal`;

            if (qty === 1) {
                minus.classList.remove("plus-minus-active");
                minus.classList.add("plus-minus-greyed");
                minus.disabled = false;
            }

            if (qty < 10) {
                plus.classList.remove("plus-minus-greyed");
                plus.classList.add("plus-minus-active");
                plus.disabled = false;
            }

        } else {
            qty = 1;
            qtyInput.innerHTML = qty;
        }

    });
}