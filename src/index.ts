import './styles.css';

const billInput = document.querySelector('input');
const billOutput = document.getElementById('bill-output');
const tipPercent = document.getElementById('tip-percent') as HTMLElement;
const tipMsg = document.getElementById('tip-msg-percent');
const tipAmount = document.getElementById('tip-amt');
const tipButtons = document.querySelectorAll('#button-group>button');
const total = document.getElementById('total');
const tenPercent = document.getElementById('ten-percent') as HTMLButtonElement;
const fifteenPercent = document.getElementById('fifteen-percent') as HTMLButtonElement;
const twentyPercent = document.getElementById('twenty-percent') as HTMLButtonElement;
const preferredTip = localStorage.getItem('tip');
let currentTipValue = 0.20;

if (preferredTip) {
    currentTipValue = parseFloat(JSON.parse(preferredTip));
    tipMsg.innerText = currentTipValue.toFixed(2).toString();
    switch (currentTipValue.toString()) {
        case '0.1':
            tipPercent.innerText = '10%';
            tipMsg.innerText = '10%';
            tenPercent.disabled = true;
            fifteenPercent.disabled = false;
            twentyPercent.disabled = false;
            break;
        case '0.15':
            tipPercent.innerText = '15%';
            tipMsg.innerText = '15%';
            tenPercent.disabled = false;
            fifteenPercent.disabled = true;
            twentyPercent.disabled = false;
            break;
        case '0.2':
            tipPercent.innerText = '20%';
            tipMsg.innerText = '20%';
            tenPercent.disabled = false;
            fifteenPercent.disabled = false;
            twentyPercent.disabled = true;
            break;
    }
}

billInput.addEventListener('input', calculateBill);
tipButtons.forEach(b => b.addEventListener('click', updateTipValues));

function calculateBill() {
    if (parseFloat(billInput.value) < 0) {
        billInput.classList.add('error');
    } else {
        if (parseFloat(billInput.value) > 0) {
            billInput.classList.remove('error');
        }
    }
    billOutput.innerText = billInput.value;

    const tip = currentTipValue * parseFloat(billInput.value);
    const totalAmt = tip + parseFloat(billInput.value);

    tipAmount.innerText = tip.toFixed(2).toString();
    total.innerText = totalAmt.toFixed(2).toString();
}

function updateTipValues() {
    const that = this as HTMLButtonElement;
    tipButtons.forEach((b: HTMLButtonElement) => b.disabled = false);
    that.disabled = true;

    tipPercent.innerText = that.innerText;
    tipMsg.innerText = that.innerText;
    currentTipValue = parseFloat(that.dataset.percent);

    savePreferredTip();

    const tip = currentTipValue * parseFloat(billInput.value);
    const totalAmt = tip + parseFloat(billInput.value);
    tipAmount.innerText = tip.toFixed(2).toString();
    total.innerText = totalAmt.toFixed(2).toString();
    // implement isNaN() to get rid of NaN in output
}

function savePreferredTip() {
    localStorage.setItem('tip', JSON.stringify(currentTipValue));
}
