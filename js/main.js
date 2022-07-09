const drop_list = document.querySelectorAll('form select')
const btn = document.querySelector('form button')
let input = document.querySelector('form input')
const fromCurrency = document.querySelector('.from select')
const toCurrency = document.querySelector('.to select')

for (let index = 0; index < drop_list.length; index++) {
    for (let currency_code in country_list) {

        let otionTag = document.createElement('option')

        otionTag.value = `${currency_code}`
        otionTag.innerHTML = `${currency_code}`

        drop_list[index].insertAdjacentElement('beforeend', otionTag)
    }
    drop_list[index].addEventListener('change', e => {
        console.log(e.target.value)
        loadFlag(e.target.value);
    })
}

function loadFlag(flag) {
    for (key in country_list) {

        if (key == flag) {
            document.querySelector('.from-box img').src = `https://countryflagsapi.com/png/${country_list[key]}`
        }
    }

}

btn.addEventListener('click', e => {
    e.preventDefault()
    getExchangeRate()
})


function getExchangeRate() {
    console.log(1)
    let val = input.value
    if (input.value == 0) {
        input.value = 1
        val = input.value
    }

    let url = `https://v6.exchangerate-api.com/v6/b360843aceaddea8b5180a6e/latest/${fromCurrency.value}`;

    fetch(url)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            let ex = res.conversion_rates[toCurrency.value]
            let totalEx = (val * ex).toFixed(2)
            document.querySelector('.exchange-rate').innerHTML = `${val} ${fromCurrency.value} = ${totalEx} ${toCurrency.value}`
        })

}