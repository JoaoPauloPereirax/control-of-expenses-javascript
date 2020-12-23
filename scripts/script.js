const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

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
  console.log(expense)
  console.log(income)
  console.log(balance)
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
  balanceDisplay.textContent = `R$ ${balance}`

}

const init = ()=>{
  dummyTransactions.forEach(addTransactionIntoDOM)
}

init()
updateBalanceValues()