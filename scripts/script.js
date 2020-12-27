const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')




const localStorangeTransactions = JSON.parse( localStorage
  .getItem('transactions'))

let transactions = localStorage
.getItem('transactions') !== null ? localStorangeTransactions : []

const removeTransaction = (ID)=>{
  transactions = transactions.filter(transaction =>
    id !== ID)
  updateLocalStorange()
  init()
}

const addTransactionIntoDOM = ({amount,name,id}) => {
  const operator = amount < 0 ? '-' : '+'
  const CSSClass = amount < 0 ? 'minus' : 'plus'  
  const li = document.createElement('li') 
  const amountWithoutOperator = Math.abs(amount)

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${name} 
  <span>${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
  `
  transactionUl.append(li)//prepend
}

const getExpenses = transactionsAmounts =>Math.abs(transactionsAmounts
    .filter(value => value<0)
    .reduce((accumulator,value)=>accumulator+value,0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
.filter(value => value>0)
.reduce((accumulator,value)=>accumulator+value,0)
.toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
.reduce((accumulator,transaction)=>accumulator+transaction,0)
.toFixed(2)

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({amount}) => amount)

  const total = getTotal(transactionsAmounts)

  const income = getIncome(transactionsAmounts)

  const expense = getExpenses(transactionsAmounts)
  
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
  balanceDisplay.textContent = `R$ ${total}`
  

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


const addToTransactionsArray = (transactionName,transactionAmount)=>{
  transactions.push({
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount)
  })

}

const cleanInputs = ()=>{
  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
}

const handleFormSubmit = event =>{
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isSomeInputEmpty = transactionName == '' || transactionAmount == ''

  if(isSomeInputEmpty){
    alert('Preencha tanto o nome quanto a transação!')
    return
  }
  addToTransactionsArray(transactionName,transactionAmount) 
  
  init()
  updateLocalStorange()
  cleanInputs()

}

const generateId = ()=>Math.round(Math.random()*1000)



form.addEventListener('submit', handleFormSubmit)