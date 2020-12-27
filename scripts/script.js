const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
console.log(inputTransactionAmount,inputTransactionName)

const dummyTransactions = [
  {id:1, name: 'Bolo', amount:-20.00},
  {id:1, name: 'Salário', amount:418.00},
  {id:1, name: 'Conta de Telefone', amount:-29.90},
  {id:1, name: 'Livro', amount:-20.00}
]

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'  
  const li = document.createElement('li') 
  const amountWithoutOperator = Math.abs(transaction.amount)

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
  `
  transactionUl.append(li)//prepend
}

const updateBalanceValues = () => {
  const transactionsAmounts = dummyTransactions
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
  dummyTransactions.forEach(addTransactionIntoDOM)
}

init()
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
  dummyTransactions.push(transaction)
  init()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''

})