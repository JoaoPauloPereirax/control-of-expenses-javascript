const transationUl = document.querySelector('#transactions')

const dummyTransactions = [
  {id:1, name: 'Bolo', amount:-20.00},
  {id:1, name: 'Salário', amount:418.00},
  {id:1, name: 'Conta de Telefone', amount:-29.90},
  {id:1, name: 'Livro', amount:-20.00}
]

const addTransactionIntoDOM = transation => {
  const operator = transation.amount < 0 ? '-' : '+'
  const CSSClass = transation.amount < 0 ? 'minus' : 'plus'
  const li = document.createElement('li') 
  const amountWithoutOperator = Math.abs(transation.amount)

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${transation.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
  `
  transationUl.append(li)//prepend
}

addTransactionIntoDOM(dummyTransactions[1])