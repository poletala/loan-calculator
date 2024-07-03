type ValueField = number | null

const sumInput = document.querySelector('.sum-field') as HTMLInputElement
const rateInput = document.querySelector('.rate-field') as HTMLInputElement
const termInput = document.querySelector('.term-field') as HTMLInputElement

let amountTotal = document.querySelector('.total-amount') as HTMLInputElement
let monthlyPayment = document.querySelector('.monthly-payment') as HTMLInputElement

const countButton = document.querySelector('.calculate-button') as HTMLInputElement

function getValue(element:HTMLInputElement): number | null {
    let value: number = Number(element.value)
    if (!element ||  !element.parentElement) {
        throw new Error(`${element} element not found`)
    }
    if (!value || value <= 0) {
        element.parentElement.classList.add('error')
        return null
    }
    return value 
}

function calc(): void {
    let sum: ValueField = getValue(sumInput)
    let rate: ValueField = getValue(rateInput)
    let term: ValueField = getValue(termInput)

    let errorText: string = (!sum) ? 'Sum' : (!rate) ? 'Rate' : (!term) ? 'Term' : (!amountTotal) ? 'Amount Total' :
    (!monthlyPayment) ? 'Monthly Payment' : '';

    if (!sum || !rate || !term || !amountTotal || !monthlyPayment) {
        throw new Error(`${errorText} element not found`)
    }

    let rateM: number = rate / (100*12)
    let monthlyPaymentValue: number = (sum * rateM) / (1 - ((1 + rateM)**(-term)))
    let amountTotalValue: number = monthlyPaymentValue * term

    setTimeout(() => {
        document.querySelector('.output')?.classList.remove('hidden')
        amountTotal.innerHTML = String (amountTotalValue.toFixed (2))
        monthlyPayment.innerHTML = String (monthlyPaymentValue.toFixed (2))
    }, 1000);
    

}

function focusElement(element:HTMLElement) {
    if(!element.parentElement || !element) {
        throw new Error(`Focus element not found`)
    }
    if (element.parentElement.classList.contains('error')) {
        element.parentElement.classList.remove('error')
    }
}
countButton.addEventListener('click', calc)