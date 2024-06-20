document.addEventListener('DOMContentLoaded', function() {
    let balance = 100;
    let lollies = 0;
    let price = 5;

    const balanceEl = document.getElementById('balance');
    const lolliesEl = document.getElementById('lollies');
    const priceEl = document.getElementById('price');

    function updateUI() {
        balanceEl.textContent = balance.toFixed(2);
        lolliesEl.textContent = lollies;
        priceEl.textContent = price.toFixed(2);
    }

    document.getElementById('buy').addEventListener('click', function() {
        if (balance >= price) {
            balance -= price;
            lollies += 1;
            updateUI();
        } else {
            alert('Not enough balance to buy lollies.');
        }
    });

    document.getElementById('sell').addEventListener('click', function() {
        if (lollies > 0) {
            balance += price;
            lollies -= 1;
            updateUI();
        } else {
            alert('No lollies to sell.');
        }
    });

    updateUI();
});
