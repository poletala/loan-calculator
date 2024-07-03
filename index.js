var sumInput = document.querySelector('.sum-field');
var rateInput = document.querySelector('.rate-field');
var termInput = document.querySelector('.term-field');
var amountTotal = document.querySelector('.total-amount');
var monthlyPayment = document.querySelector('.monthly-payment');
var countButton = document.querySelector('.calculate-button');
function getValue(element) {
    var value = Number(element.value);
    if (!element || !element.parentElement) {
        throw new Error("".concat(element, " element not found"));
    }
    if (!value || value <= 0) {
        element.parentElement.classList.add('error');
        return null;
    }
    return value;
}
function calc() {
    var sum = getValue(sumInput);
    var rate = getValue(rateInput);
    var term = getValue(termInput);
    var errorText = (!sum) ? 'Sum' : (!rate) ? 'Rate' : (!term) ? 'Term' : (!amountTotal) ? 'Amount Total' :
        (!monthlyPayment) ? 'Monthly Payment' : '';
    if (!sum || !rate || !term || !amountTotal || !monthlyPayment) {
        throw new Error("".concat(errorText, " element not found"));
    }
    var rateM = rate / (100 * 12);
    var monthlyPaymentValue = (sum * rateM) / (1 - (Math.pow((1 + rateM), (-term))));
    var amountTotalValue = monthlyPaymentValue * term;
    setTimeout(function () {
        var _a;
        (_a = document.querySelector('.output')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        amountTotal.innerHTML = String(amountTotalValue.toFixed(2));
        monthlyPayment.innerHTML = String(monthlyPaymentValue.toFixed(2));
    }, 1000);
}
function focusElement(element) {
    if (!element.parentElement || !element) {
        throw new Error("Focus element not found");
    }
    if (element.parentElement.classList.contains('error')) {
        element.parentElement.classList.remove('error');
    }
}
countButton.addEventListener('click', calc);
