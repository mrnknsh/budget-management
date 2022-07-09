//menu navigation
const walletsPage = document.querySelector('#walletsPage')
const menu = document.querySelector('#menu')
const detailingPage = document.querySelector('#detailingPage')
const expensesPage = document.querySelector('#expensesPage')
// const notesPage = document.querySelector('#notesPage')
const analyticsPage = document.querySelector('#analyticsPage')
const authorizationPage = document.querySelector('#authorizationPage')
//registration
let email = document.querySelector('#registrationEmail')
let password1 = document.querySelector('#registrationPassword1')
let password2 = document.querySelector('#registrationPassword2')
let goodRegistration = document.querySelector('#goodRegistration')
let invalidDataOfReg = document.querySelector('#invalidDataOfReg')
//sign in
let login = document.querySelector('#singInEmail')
let password = document.querySelector('#singInPassword')
let walletName = document.querySelector('#walletName')
let token
let invalidDataOfSignIn = document.querySelector('#invalidDataOfSignIn')
//add wallet
let USD = document.querySelector('#totalIncomeUSD')
let BYN = document.querySelector('#totalIncomeBYN')
let EUR = document.querySelector('#totalIncomeEUR')
let startBalance = document.querySelector('#startBalance')
let walletCurrency = document.querySelector('#walletCurrency');
let walletForm = document.querySelector('#createWallet')
let walletContainer = document.querySelector('.walletContainer')
let topUp = document.querySelector('#addSum')
let topUpAmount = document.querySelector('#topUpAmount')
let topUpDate = document.querySelector('#dateOfTopUp')
topUpDate.valueAsDate = new Date()
let agreeToDeleteWallet = document.querySelector('.agreeToDeleteWallet')
let containerDetailingIncomes = document.querySelector('.detailingIncomes')
let tableDetailingIncomes = document.querySelector('.tbodyForIncomes')
//expenses
let expenseForm = document.querySelector('#createExpense')
let categoriesContainer = document.querySelector('.categoriesContainer')
let selectedWallet = document.getElementById('selectedWallet')
let detailingExpensesContainer = document.querySelector('.containerForExpenses')
let dateOfExpense = document.querySelector('#dateOfExpense')
let comment = document.querySelector('#comment')
let expenseSum = document.querySelector('#expenseSum')
dateOfExpense.valueAsDate = new Date()
//analytic
let startDate = document.querySelector('#startDate')
startDate.valueAsDate = new Date()
let finishDate = document.querySelector('#finishDate')
finishDate.valueAsDate = new Date()
let walletForAnalytic = document.querySelector('#walletForAnalytic')

let status = function (response) {
    if (response.status !== 200) {
        return Promise.reject()
    }
    return Promise.resolve(response)
}
let json = function (response) {
    return response.json()
}

function changeLocation() {
    authorizationPage.hidden = true
    menu.hidden = true
    walletsPage.hidden = true
    detailingPage.hidden = true
    expensesPage.hidden = true
    // notesPage.hidden = true
    analyticsPage.hidden = true

    let user = localStorage.getItem('user')
    switch (location.hash) {
        case '#authorizationPage':
            if (user) {
                location.hash = '#walletsPage'
            } else {
                authorizationPage.hidden = false
            }
            break
        case '#walletsPage':
            if (user) {
                menu.hidden = false
                walletsPage.hidden = false
            } else {
                location.hash = '#authorizationPage'
            }
            break
        case '#detailingPage':
            if (user) {
                menu.hidden = false
                detailingPage.hidden = false
            } else {
                location.hash = '#authorizationPage'
            }
            break
        case '#expensesPage':
            if (user) {
                menu.hidden = false
                expensesPage.hidden = false
            } else {
                location.hash = '#authorizationPage'
            }
            break
        // case '#notesPage':
        //     menu.hidden = false
        //     notesPage.hidden = false
        //     break
        case '#analyticsPage':
            if (user) {
                menu.hidden = false
                analyticsPage.hidden = false
            } else {
                location.hash = '#authorizationPage'
            }
            break
    }
}

window.addEventListener('hashchange', changeLocation)
changeLocation()
location.hash = '#authorizationPage'

showPassSingIn.onclick = () => {
    password.setAttribute('type', 'text');
    hidePassSingIn.style.display = 'inline'
    showPassSingIn.style.display = 'none'
}
hidePassSingIn.onclick = () => {
    password.setAttribute('type', 'password');
    hidePassSingIn.style.display = 'none'
    showPassSingIn.style.display = 'inline'
}
showPassRegistration1.onclick = () => {
    password1.setAttribute('type', 'text');
    hidePassRegistration1.style.display = 'inline'
    showPassRegistration1.style.display = 'none'
}
hidePassRegistration1.onclick = () => {
    password1.setAttribute('type', 'password');
    hidePassRegistration1.style.display = 'none'
    showPassRegistration1.style.display = 'inline'
}
showPassRegistration2.onclick = () => {
    password2.setAttribute('type', 'text');
    hidePassRegistration2.style.display = 'inline'
    showPassRegistration2.style.display = 'none'
}
hidePassRegistration2.onclick = () => {
    password2.setAttribute('type', 'password');
    hidePassRegistration2.style.display = 'none'
    showPassRegistration2.style.display = 'inline'
}

function incorrectEmail() {
    if (!email.value.includes('@')) {
        registrationEmail.classList.add('error')
    }
}

function incorrectPass() {
    if (password1.value === '' || password2.value === '') {
        registrationPassword1.classList.add('error')
        registrationPassword2.classList.add('error')
    }
}

function pass1NotEquallyPass2() {
    if (password1.value !== password2.value) {
        registrationPassword1.classList.add('error')
        registrationPassword2.classList.add('error')
    }
}

function hideRegError() {
    registrationEmail.classList.remove('error')
    registrationPassword1.classList.remove('error')
    registrationPassword2.classList.remove('error')
}

function hideSignInError(invalidDataOf) {
    invalidDataOf.style.display = 'none'
}

btnRegistration.onclick = e => {
    e.preventDefault()
    let user = {
        email: email.value,
        password: password1.value
    }
    if (email.value.includes('@') && password1.value !== '' && password2.value !== '' && password1.value === password2.value) {
        fetch('https://accountingg.herokuapp.com/api/public/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(status)
            .then(() => {
                document.querySelector('#singInCheck').checked = true
                email.value = ''
                password1.value = ''
                password2.value = ''
                setTimeout(function () {
                    goodRegistration.style.visibility = 'visible'
                    goodRegistration.style.opacity = '1'
                }, 0,)
                setTimeout(function () {
                    goodRegistration.style.visibility = 'hidden'
                    goodRegistration.style.opacity = '0'
                }, 3000,)
            })
            .catch(() => {
                invalidDataOfReg.style.display = 'block'
            })
    } else {
        incorrectEmail()
        incorrectPass()
        pass1NotEquallyPass2()
    }
}
email.addEventListener("focus", () => {
    hideRegError()
    hideSignInError(invalidDataOfReg)
});
password1.addEventListener("focus", () => {
    hideRegError()
    hideSignInError(invalidDataOfReg)
});
password2.addEventListener("focus", () => {
    hideRegError()
    hideSignInError(invalidDataOfReg)
});

function walletList(field) {
    let row = walletContainer.insertRow(walletContainer.rows.length)
    row.insertCell(0).innerHTML = field.id
    row.insertCell(1).innerHTML = `<a href="#" class="jsWalletsName" data-walletIdLink = ${field.id}>${field.name}</a>`
    row.insertCell(2).innerHTML = field.currency
    row.insertCell(3).innerHTML = field.balance
    row.insertCell(4).innerHTML = `<button class="btnRefill" data-walletIdBtn = ${field.id}>Top up</button>`
}


function getWallets() {
    fetch('https://accountingg.herokuapp.com/api/secured/wallets', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Basic ${localStorage.getItem('user')}`
        },
    })
        .then(json)
        .then(result => {
            selectedWallet.innerHTML = ''
            let sumUSD = 0;
            let sumBYN = 0;
            let sumEUR = 0;
            for (let w = 0; w < result.length; w++) {
                if (result[w].currency === 'USD') {
                    sumUSD += result[w].balance
                } else if (result[w].currency === 'BYN') {
                    sumBYN += result[w].balance
                } else if (result[w].currency === 'EUR') {
                    sumEUR += result[w].balance
                }
            }
            USD.value = sumUSD
            BYN.value = sumBYN
            EUR.value = sumEUR
            for (let i = result.length - 1; i >= 0; --i) {
                walletList(result[i])
                let walletOptions = document.createElement('option')
                walletOptions.innerHTML = result[i].name
                walletOptions.value = result[i].id
                selectedWallet.append(walletOptions)
                let walletOptions2 = document.createElement('option')
                walletOptions2.innerHTML = result[i].name
                walletOptions2.value = result[i].id
                walletForAnalytic.append(walletOptions2)
            }
            detailingExpensesContainer.innerHTML = ''
            getExpenses()
        })
}

getWallets()

function expensesList(field) {
    let expensesRow = detailingExpensesContainer.insertRow(detailingExpensesContainer.rows.length)
    expensesRow.insertCell(0).innerHTML = field.walletId
    expensesRow.insertCell(1).innerHTML = new Date(field.date).toISOString().substr(0, 10)
    expensesRow.insertCell(2).innerHTML = field.expenseCategory.name
    expensesRow.insertCell(3).innerHTML = field.description
    expensesRow.insertCell(4).innerHTML = field.value
}

function getExpenses() {
    fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${selectedWallet.value}/expenses`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Basic ${localStorage.getItem('user')}`
        },
    })
        .then(json)
        .then(result => {
            for (let i = result.length - 1; i >= 0; --i) {
                expensesList(result[i])
            }
        })
}

btnSingIn.onclick = e => {
    e.preventDefault()
    token = btoa(login.value + ':' + password.value)
    localStorage.setItem('user', token)
    fetch('https://accountingg.herokuapp.com/api/public/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${token}`
        }
    })
        .then(status)
        .then(() => {
            location.hash = '#walletsPage'
        })
        .catch(() => {
            invalidDataOfSignIn.style.display = 'block'
        })

    getWallets()
    document.getElementById('ch').checked = false
    tableDetailingIncomes.innerHTML = ''
}

login.addEventListener("focus", () => hideSignInError(invalidDataOfSignIn));
password.addEventListener("focus", () => hideSignInError(invalidDataOfSignIn));


function incorrectStartBalance() {
    if (startBalance.value === '') {
        startBalance.style.border = '2px solid red'
    }
}

function incorrectWalletName() {
    if (walletName.value === '') {
        walletName.style.border = '2px solid red'
    }
}

saveWallet.onclick = e => {
    e.preventDefault()
    if (walletName.value !== '' && startBalance.value !== '') {
        let wallet = {
            balance: startBalance.value,
            currency: walletCurrency.value,
            name: walletName.value
        }
        fetch('https://accountingg.herokuapp.com/api/secured/wallets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
            body: JSON.stringify(wallet)
        })
            .then(json)
            .then(result => {
                walletForm.style.display = 'none'
                startBalance.value = ''
                walletName.value = ''

                walletList(result);
                if (result.currency === 'USD') {
                    USD.value = Number(USD.value) + result.balance
                } else if (result.currency === 'BYN') {
                    BYN.value = Number(BYN.value) + result.balance
                } else if (result.currency === 'EUR') {
                    EUR.value = Number(EUR.value) + result.balance
                }

                let walletOptions = document.createElement('option')
                walletOptions.innerHTML = result.name
                walletOptions.value = result.id
                selectedWallet.append(walletOptions)

                let walletOptions2 = document.createElement('option')
                walletOptions2.innerHTML = result.name
                walletOptions2.value = result.id
                walletForAnalytic.append(walletOptions2)
            })
    } else {
        incorrectStartBalance()
        incorrectWalletName()
    }
}

function hideIncorrectDataOfWallet() {
    startBalance.style.border = '2px solid #ffffff'
    walletName.style.border = '2px solid #ffffff'
}

startBalance.addEventListener("focus", () => {
    hideIncorrectDataOfWallet()
});
walletName.addEventListener("focus", () => {
    hideIncorrectDataOfWallet()
});

addWallet.onclick = e => {
    e.preventDefault()
    walletForm.style.display = 'block'
}

closeCreateWallet.onclick = e => {
    e.preventDefault()
    walletForm.style.display = 'none'
    startBalance.value = ''
    walletName.value = ''
}

closeTopUpAmount.onclick = e => {
    e.preventDefault()
    topUp.style.display = 'none'
    topUpAmount.value = ''
    topUpDate.valueAsDate = new Date()
}

let walletIdTopUp;
let walletIdDelOrDetail;
walletContainer.onclick = function (event) {
    let target = event.target;
    if (target.getAttribute('data-walletIdBtn') !== null) {
        topUp.style.display = 'block'
        walletIdTopUp = target.getAttribute('data-walletIdBtn')
    } else if (target.getAttribute('data-walletIdLink') !== null) {
        event.preventDefault()
        tableDetailingIncomes.innerHTML = ''
        location.hash = '#detailingPage'
        walletIdDelOrDetail = target.getAttribute('data-walletIdLink')
        fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${walletIdDelOrDetail}/incomes`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
        })
            .then(json)
            .then(result => {
                for (let i = result.length - 1; i >= 0; --i) {
                    let row = tableDetailingIncomes.insertRow(tableDetailingIncomes.rows.length)
                    row.insertCell(0).innerHTML = new Date(result[i].date).toISOString().substr(0, 10)
                    row.insertCell(1).innerHTML = result[i].value
                }
            })
    }
};

btnTopUpAmount.onclick = e => {
    e.preventDefault()
    if (topUpAmount.value !== '') {

        let changeIncome = {
            date: Date.parse(topUpDate.value),
            description: '',
            value: topUpAmount.value,
        }
        fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${walletIdTopUp}/incomes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
            body: JSON.stringify(changeIncome)
        })
            .then(json)
            .then(result => {
                for (let j = 0; j < walletContainer.rows.length; j++) {
                    if (walletContainer.rows[j].cells[0].innerHTML === walletIdTopUp) {
                        if (walletContainer.rows[j].cells[2].innerHTML === 'USD') {
                            USD.value = Number(USD.value) + result.value
                        } else if (walletContainer.rows[j].cells[2].innerHTML === 'BYN') {
                            BYN.value = Number(BYN.value) + result.value
                        } else if (walletContainer.rows[j].cells[2].innerHTML === 'EUR') {
                            EUR.value = Number(EUR.value) + result.value
                        }
                        walletContainer.rows[j].cells[3].innerHTML = Number(walletContainer.rows[j].cells[3].innerHTML) + result.value
                    }
                }
            })

        topUp.style.display = 'none'
        topUpAmount.value = ''
        topUpDate.valueAsDate = new Date()
    } else {
        topUpAmount.style.border = '2px solid red'
    }
}

topUpAmount.addEventListener("focus", () => {
    topUpAmount.style.border = '2px solid #49c6c9'
})

closeDetailing.onclick = e => {
    e.preventDefault()
    location.hash = '#walletsPage'
    tableDetailingIncomes.innerHTML = ''
}

deleteWallet.onclick = e => {
    e.preventDefault()
    agreeToDeleteWallet.style.display = 'block'
    containerDetailingIncomes.style.display = 'none'
}

yesDeleteWallet.onclick = e => {
    e.preventDefault()
    agreeToDeleteWallet.style.display = 'none'
    containerDetailingIncomes.style.display = 'table'
    fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${walletIdDelOrDetail}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Basic ${localStorage.getItem('user')}`
        },
    })
    for (let j = 0; j < walletContainer.rows.length; j++) {
        if (walletContainer.rows[j].cells[0].innerHTML === walletIdDelOrDetail) {
            if (walletContainer.rows[j].cells[2].innerHTML === 'USD') {
                USD.value = USD.value - walletContainer.rows[j].cells[3].innerHTML
            } else if (walletContainer.rows[j].cells[2].innerHTML === 'BYN') {
                BYN.value = BYN.value - walletContainer.rows[j].cells[3].innerHTML
            } else if (walletContainer.rows[j].cells[2].innerHTML === 'EUR') {
                EUR.value = EUR.value - walletContainer.rows[j].cells[3].innerHTML
            }
            walletContainer.deleteRow(j)
        }
    }
    for (let i = 0; i < selectedWallet.length; i++) {
        if (selectedWallet.options[i].value === walletIdDelOrDetail && walletForAnalytic.options[i].value === walletIdDelOrDetail) {
            selectedWallet.remove(i);
            walletForAnalytic.remove(i)
        }
    }
    detailingExpensesContainer.innerHTML = ''
    getExpenses()
    tableDetailingIncomes.innerHTML = ''
}

notDeleteWallet.onclick = e => {
    e.preventDefault()
    agreeToDeleteWallet.style.display = 'none'
    containerDetailingIncomes.style.display = 'table'
}

function getCategories() {
    fetch('https://accountingg.herokuapp.com/api/secured/expense-categories', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Basic ${localStorage.getItem('user')}`
        },
    })
        .then(json)
        .then(result => {
            for (let i = 0; i < result.length; i++) {
                let categoriesBtn = document.createElement('button')
                categoriesBtn.classList.add('categoriesBtn')
                categoriesBtn.dataset.category = result[i].id
                categoriesBtn.innerHTML = `<img src=${result[i].icon} class="categoriesImg" data-category = ${result[i].id}><br><span data-category = ${result[i].id}>${result[i].name}</span>`
                categoriesContainer.append(categoriesBtn)
            }
        })
}

addExpanses.onclick = e => {
    e.preventDefault()
    expenseForm.style.display = 'block'
    getCategories()
}

closeCreateExpense.onclick = e => {
    e.preventDefault()
    expenseForm.style.display = 'none'
    dateOfExpense.valueAsDate = new Date()
    comment.value = ''
    expenseSum.value = ''
    category = undefined
    categoriesContainer.style.border = '2px solid #ffffff'
    expenseSum.style.border = '2px solid #77e8bb'
    document.querySelectorAll('.categoriesImg').forEach(n => n.classList.remove('highlight'))
    categoriesContainer.innerHTML = ''
}

fieldSignOut.onclick = () => {
    localStorage.removeItem('user')
    walletContainer.innerHTML = ''
    login.value = ''
    password.value = ''
    selectedWallet.innerHTML = ''
    walletForAnalytic.innerHTML = ''
    USD.value = 0
    BYN.value = 0
    EUR.value = 0
    updateFieldsForAnalytic()
}

let category;
categoriesContainer.addEventListener('click', (event) => {
    event.preventDefault()
    let targetCategory = event.target;
    if (targetCategory.tagName !== 'IMG') {
        return
    } else {
        document.querySelectorAll('.categoriesImg').forEach(n => n.classList.remove('highlight'))
        targetCategory.classList.add('highlight');
        category = targetCategory.getAttribute('data-category')
    }
})

function dontChooseCategory() {
    if (category === undefined) {
        categoriesContainer.style.border = '2px solid red'
    }
}

function noExpenseSum() {
    if (expenseSum.value === '') {
        expenseSum.style.border = '2px solid red'
    }
}

function hideErrOfExpense() {
    categoriesContainer.style.border = '2px solid #ffffff'
    expenseSum.style.border = '2px solid #77e8bb'
}

saveExpense.onclick = e => {
    e.preventDefault()
    if ((expenseSum.value !== '' && category !== undefined)) {
        let expenseData = {
            categoryId: category,
            date: Date.parse(dateOfExpense.value),
            description: comment.value,
            value: expenseSum.value,
        }
        fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${selectedWallet.value}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
            body: JSON.stringify(expenseData)
        })
            .then(json)
            .then(result => {
                walletContainer.innerHTML = ''
                selectedWallet.innerHTML = ''
                walletForAnalytic.innerHTML = ''
                getWallets()
            })
        expenseForm.style.display = 'none'
        dateOfExpense.valueAsDate = new Date()
        comment.value = ''
        expenseSum.value = ''
        category = undefined
        categoriesContainer.style.border = '2px solid #ffffff'
        categoriesContainer.innerHTML = ''
        document.querySelectorAll('.categoriesImg').forEach(n => n.classList.remove('highlight'))
    } else {
        noExpenseSum()
        dontChooseCategory()
    }
}

expenseSum.addEventListener("focus", () => {
    hideErrOfExpense()
})

categoriesContainer.addEventListener("click", () => {
    hideErrOfExpense()
})

selectedWallet.onchange = () => {
    detailingExpensesContainer.innerHTML = ''
    getExpenses()
}

function getPeriod(field, from, to, date1, date2) {
    let arr = []

    for (let i = 0; i < field.length; i++) {
        let data = {
            date: new Date(field[i].date).toISOString().substr(from, to),
            value: field[i].value
        }
        arr.push(data)
    }

    let a = [];
    let b = [];

    for (let i = 0; i < arr.length; i++) {
        if (!a.includes(arr[i].date)) {
            a.push(arr[i].date)
        }
    }

    for (let i = 0; i < a.length; i++) {
        let q = 0
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].date === a[i]) {
                q += arr[j].value
            }
        }
        b.push(Math.round(q))
    }

    let ox = a.reverse()
    let oy = b.reverse()


    console.log(ox)
    console.log(oy)

    document.querySelector(".container").innerHTML = '&nbsp;';
    document.querySelector(".container").innerHTML = '<canvas id="myChart"></canvas>';
    let myChart = document.getElementById("myChart").getContext("2d");

    Chart.defaults.font.family = 'Playfair Display';
    Chart.defaults.font.size = 18;

    let massPopChart = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: `${field[0].type}, ${date1} – ${date2}`,
                data: oy,
                backgroundColor: 'rgb(119,232,188)',
                borderWidth: 2,
                borderColor: '#49c6c9'
            }]
        },
        options: {}
    })
}

function updateFieldsForAnalytic() {
    startDate.valueAsDate = new Date()
    finishDate.valueAsDate = new Date()
    document.getElementById('days').checked = false
    document.getElementById('months').checked = false
    document.getElementById('years').checked = false
    document.getElementById('incomes').checked = false
    document.getElementById('expenses').checked = false
}

getAnalytics.onclick = e => {
    e.preventDefault()
    let fromMs = Date.parse(startDate.value)
    let toMs = Date.parse(finishDate.value)

    let fromDate = new Date(fromMs).toISOString().substr(0, 10)
    let toDate = new Date(toMs).toISOString().substr(0, 10)

    if (document.getElementById('incomes').checked) {
        fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${walletForAnalytic.value}/incomes?from=${fromMs}&to=${toMs}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
        })
            .then(json)
            .then(result => {
                if (document.getElementById('days').checked) {
                    getPeriod(result, 5, 5, fromDate, toDate)
                } else if (document.getElementById('months').checked) {
                    getPeriod(result, 0, 7, fromDate, toDate)
                } else if (document.getElementById('years').checked) {
                    getPeriod(result, 0, 4, fromDate, toDate)
                }
            })
            .then(() => updateFieldsForAnalytic())
    } else if (document.getElementById('expenses').checked) {
        fetch(`https://accountingg.herokuapp.com/api/secured/wallets/${walletForAnalytic.value}/expenses?from=${fromMs}&to=${toMs}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${localStorage.getItem('user')}`
            },
        })
            .then(json)
            .then(result => {
                console.log(result)
                if (document.getElementById('days').checked) {
                    getPeriod(result, 5, 5, fromDate, toDate)
                } else if (document.getElementById('months').checked) {
                    getPeriod(result, 0, 7, fromDate, toDate)
                } else if (document.getElementById('years').checked) {
                    getPeriod(result, 0, 4, fromDate, toDate)
                }
            })
            .then(() => updateFieldsForAnalytic())
    }
}


if (window.matchMedia("(min-width: 400px)").matches) {
    fieldMenu.onclick = () => {
        document.getElementById('ch').checked = false
    }
    fieldExpenses.onclick = () => {
        document.getElementById('ch').checked = false
    }
    fieldAnalytics.onclick = () => {
        document.getElementById('ch').checked = false
    }
}

