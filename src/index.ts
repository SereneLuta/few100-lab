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
            preferredTipUpdate('10%');
            tenPercent.disabled = true;
            fifteenPercent.disabled = false;
            twentyPercent.disabled = false;
            break;
        case '0.15':
            preferredTipUpdate('15%');
            tenPercent.disabled = false;
            fifteenPercent.disabled = true;
            twentyPercent.disabled = false;
            break;
        case '0.2':
            preferredTipUpdate('20%');
            tenPercent.disabled = false;
            fifteenPercent.disabled = false;
            twentyPercent.disabled = true;
            break;
    }
}

billInput.addEventListener('input', calculateBill);
tipButtons.forEach(b => b.addEventListener('click', updateTipValues));

function calculateBill() {
    const tip = currentTipValue * parseFloat(billInput.value);
    const totalAmt = tip + parseFloat(billInput.value);

    checkForInvalidInput();

    updateBillOutput();

    calculateTipValue(tip);

    calculateTotalAmount(tip, totalAmt);
}

function updateTipValues() {
    const that = this as HTMLButtonElement;
    const tip = currentTipValue * parseFloat(billInput.value);
    const totalAmt = tip + parseFloat(billInput.value);

    updateHTMLButtons(that);

    tipPercent.innerText = that.innerText;
    tipMsg.innerText = that.innerText;
    currentTipValue = parseFloat(that.dataset.percent);

    savePreferredTip();

    calculateTipValue(tip);

    calculateTotalAmount(tip, totalAmt);
}

function checkForInvalidInput() {
    if (parseFloat(billInput.value) < 0) {
        billInput.classList.add('error');
    } else {
        if (parseFloat(billInput.value) > 0) {
            billInput.classList.remove('error');
        }
    }
}

function updateBillOutput() {
    if (billInput.value !== '' ) {
        billOutput.innerText = billInput.value;
    } else {
        billOutput.innerText = '0';
    }
}

function calculateTipValue(tip: number) {
    if (!isNaN(tip)) {
        tipAmount.innerText = tip.toFixed(2).toString();
    } else {
        tipAmount.innerText = '0';
    }
}

function calculateTotalAmount(tip: number, totalAmt: number) {
    if (!isNaN(totalAmt)) {
        total.innerText = totalAmt.toFixed(2).toString();
    } else {
        total.innerText = '0';
    }
}

function updateHTMLButtons(that: HTMLButtonElement) {
    tipButtons.forEach((button: HTMLButtonElement) => button.disabled = false);
    that.disabled = true;
}


function savePreferredTip() {
    localStorage.setItem('tip', JSON.stringify(currentTipValue));
}

function preferredTipUpdate(tipPercentAmt: string) {
    tipPercent.innerText = tipPercentAmt;
    tipMsg.innerText = tipPercentAmt;
}
