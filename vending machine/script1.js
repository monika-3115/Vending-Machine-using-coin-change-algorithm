document.getElementById('pay').addEventListener('click', function() {
    var amountGiven = parseFloat(document.getElementById('amount').value);
    var totalPrice = calculateTotalPrice();
    var change = (amountGiven - totalPrice).toFixed(2);
    var changeInCoins = calculateChangeInCoins(change * 100 / 100); // Convert to paise
    document.getElementById('change').innerHTML = 'Change: ' + formatChange(changeInCoins);
});

function calculateTotalPrice() {
    var items = document.getElementsByClassName('item');
    var totalPrice = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains('selected')) {
            totalPrice += parseFloat(items[i].getAttribute('data-price'));
            items[i].classList.remove('selected'); // Remove the selected class after adding the price
        }
    }
    return totalPrice;
}

function calculateChangeInCoins(change) {
    var denominations = [1, 2, 5, 10]; // Coin denominations in ascending order
    var coins = {};
    for (var i = denominations.length - 1; i >= 0 && change > 0; i--) {
        var denomination = denominations[i];
        var numCoins = Math.floor(change / denomination);
        if (numCoins > 0) {
            coins[denomination] = numCoins;
            change -= numCoins * denomination;
        }
    }
    return coins;
}
function formatChange(changeInCoins) {
    var changeString = "";
    for (var denomination in changeInCoins) {
        changeString += changeInCoins[denomination] + 'x' + denomination + ' Rupees, ';
    }
    return changeString.slice(0, -2); // Remove the last comma and space
}

var items = document.getElementsByClassName('item');
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function() {
        this.classList.toggle('selected');
    });
}