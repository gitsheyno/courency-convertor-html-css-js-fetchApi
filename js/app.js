const select = document.querySelectorAll('select')
const btn = document.querySelector('button')
const fromCurrency = document.querySelector('.from select')
const toCurrency = document.querySelector('.to select')
const ans = document.querySelector('.exchange-rate')

select.forEach(list => {
    let option;
    for (let value in country_list) {
        option = `<option value="${value}">${value}</option>`
        list.innerHTML += option
    }

    list.addEventListener('change', e => {
        loadFlag(e.target)
    })
})

function loadFlag(key) {
    for (let value in country_list) {
        if (value === key.value) {
            key.parentElement.children[0].src = `https://countryflagsapi.com/png/${country_list[key.value]}`
        }
    }
}

btn.addEventListener('click', e => {
    e.preventDefault()
    doExchange()
})


async function doExchange() {
    let url = `https://v6.exchangerate-api.com/v6/b360843aceaddea8b5180a6e/latest/${fromCurrency.value}`;
    const response = await fetch(url)
    const dataJson = await response.json()

    let input = takeInput()

    let totalAns = input * dataJson.conversion_rates[toCurrency.value]

    ans.innerHTML = `${input} ${fromCurrency.value} = ${totalAns} ${toCurrency.value}`

}

function takeInput() {
    let input = document.querySelector('input').value

    if (input == 0 || input < 0) {
        document.querySelector('input').value = 1
        input = 1
    }

    return input
}
