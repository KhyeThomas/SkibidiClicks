let money = 0;
let shootMoney = 1;
let ammo = 12;
let maxAmmo = 12;
let shootTime = 0.5;
let reloadTime = 2;
let totalEarned = 0;

document.getElementById('shootButton').addEventListener('click', () => {
    if (ammo > 0) {
        ammo--;
        money += shootMoney;
        totalEarned += shootMoney;
        updateDisplay();
    } else {
        alert('No ammo left! Reload first.');
    }
});

document.getElementById('reloadButton').addEventListener('click', () => {
    setTimeout(() => {
        ammo = maxAmmo;
        updateDisplay();
    }, reloadTime * 1000);
});

const upgrades = {
    shootMoney: { cost: 10, increment: 10 },
    ammo: { cost: 20, increment: 5 },
    reloadTime: { cost: 30, increment: -0.1 },
    shootTime: { cost: 40, increment: -0.1 }
};

function buyUpgrade(type) {
    if (money >= upgrades[type].cost) {
        money -= upgrades[type].cost;
        upgrades[type].cost = Math.floor(upgrades[type].cost * 1.5);
        if (type === 'shootMoney') {
            shootMoney += upgrades[type].increment;
        } else if (type === 'ammo') {
            maxAmmo += upgrades[type].increment;
        } else if (type === 'reloadTime') {
            reloadTime = Math.max(0.1, reloadTime + upgrades[type].increment);
        } else if (type === 'shootTime') {
            shootTime = Math.max(0.1, shootTime + upgrades[type].increment);
        }
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function createUpgradeButtons() {
    for (const type in upgrades) {
        const button = document.createElement('button');
        button.className = 'upgrade';
        button.innerText = `Increase ${type} - $${upgrades[type].cost}`;
        button.addEventListener('click', () => buyUpgrade(type));
        document.getElementById(`${type}Upgrades`).appendChild(button);
    }
}

function updateDisplay() {
    document.getElementById('money').innerText = money;
    document.getElementById('shootMoney').innerText = shootMoney;
    document.getElementById('ammo').innerText = `${ammo}/${maxAmmo}`;
    document.getElementById('shootTime').innerText = `${shootTime}s`;
    document.getElementById('reloadTime').innerText = `${reloadTime}s`;
    document.getElementById('totalEarned').innerText = totalEarned;
    document.getElementById('ammoInfo').innerText = `${ammo}/${maxAmmo}`;
    document.getElementById('shootTimeInfo').innerText = `${shootTime}s`;
    document.getElementById('reloadTimeInfo').innerText = `${reloadTime}s`;
    document.getElementById('shootMoneyInfo').innerText = shootMoney;
    document.querySelectorAll('.upgrade').forEach((button, index) => {
        const type = button.parentNode.id.replace('Upgrades', '');
        button.innerText = `Increase ${type} - $${upgrades[type].cost}`;
    });
}

createUpgradeButtons();
updateDisplay();
