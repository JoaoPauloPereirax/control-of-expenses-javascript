const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
console.log(inputTransactionAmount,inputTransactionName)



const localStorangeTransactions = JSON.parse( localStorage
  .getItem('transactions'))

let transactions = localStorage
.getItem('transactions') !== null ? localStorangeTransactions : []

const removeTransaction = (ID)=>{
  transactions = transactions.filter(transaction =>
    transaction.id !== ID)
  updateLocalStorange()
  init()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'  
  const li = document.createElement('li') 
  const amountWithoutOperator = Math.abs(transaction.amount)

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${transaction.name} 
  <span>${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
  x
  </button>
  `
  transactionUl.append(li)//prepend
}

const updateBalanceValues = () => {
  const transactionsAmounts = transactions
    .map(transaction => transaction.amount)
  const balance = transactionsAmounts
    .reduce((accumulator,transaction)=>accumulator+transaction,0)
    .toFixed(2)
  const income = transactionsAmounts
    .filter(value => value>0)
    .reduce((accumulator,value)=>accumulator+value,0)
    .toFixed(2)
  const expense = Math.abs(transactionsAmounts
    .filter(value => value<0)
    .reduce((accumulator,value)=>accumulator+value,0))
    .toFixed(2)
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
  balanceDisplay.textContent = `R$ ${balance}`

}

const init = ()=>{
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
}

init()

const updateLocalStorange = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

updateBalanceValues()

const generateId = ()=>Math.round(Math.random()*1000)

form.addEventListener('submit', event =>{
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()

  if(transactionName == '' || transactionAmount == ''){
    alert('Preencha tanto o nome quanto a transação!')
    return
  }
  const transaction = {
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount)
  }
  transactions.push(transaction)
  init()
  updateLocalStorange()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''

})