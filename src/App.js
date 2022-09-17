import React, { useState, useEffect } from "react";
import './App.css';
import Alert from "./component/Alert.js"
import ExpenseForm from "./component/ExpenseForm.js";
import ExpenseList from "./component/ExpenseList.js";
import { v4 as uuid } from 'uuid'


 //const initialExpenses = []
//   { id: uuid(), charge: "rent1", amount: 1300 },
//   { id: uuid(), charge: "rent2", amount: 1200 },
//   { id: uuid(), charge: "rent3", amount: 1400 },
//   { id: uuid(), charge: "rent4", amount: 100 },
// ]


 const initialExpenses = localStorage.getItem('expenses')?
 JSON.parse(localStorage.getItem('expenses')):[]

function App() {
  //===========State Values========
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState()
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

    //===========use Effect ========
useEffect(()=>{
  localStorage.setItem("expenses", JSON.stringify(expenses))
},[expenses])




  //===========Functionality========
  const handelCharge = e => {
    setCharge(e.target.value)
  }

  const handelAmount = e => {
    setAmount(e.target.value)
  }

  const handelAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 2000)
  }

  const handelSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
       let tempExpenses = expenses.map(item => {
        return item.id === id ? {...item, charge:charge, amount :amount}:item
       })
       setExpenses(tempExpenses)
       setEdit(false)
      } else {
        const newExpense = {
          id: uuid(),
          charge: charge,
          amount: amount
        }
        setExpenses([...expenses, newExpense])
        handelAlert({ type: "success", text: "Item added successfully" })
      }
      setCharge("")
      setAmount(0)
    } else {
      handelAlert({ type: "danger", text: "Charge can't be empty value and Amount value has to be bigger than zero " })
    }
  }
  //===========Clear Edit functions========
  const handelDeleteAllItems = () => {
    setExpenses([])
    handelAlert({ type: 'danger', text: ' All items deleted' })

  }

  const handelDeleteSingleItem = (id) => {
    let tempExpenses = expenses.filter(item =>
      item.id !== id)
    setExpenses(tempExpenses);
    handelAlert({ type: 'danger', text: 'Item deleted' })
  };

  const handleEditItem = (id) => {
    let findExpenses = expenses.find(item => item.id === id)
    let { charge, amount } = findExpenses;
    setCharge(charge);
    setAmount(amount);
    setEdit(true)
    setId(id)
    handelAlert({ type: 'success', text: 'Item Edited' })

  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1> Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge}
          amount={amount}
          handelAmount={handelAmount}
          handelCharge={handelCharge}
          handelSubmit={handelSubmit}
          edit={edit} />


        <ExpenseList
          expenses={expenses}
          handelDeleteAllItems={handelDeleteAllItems}
          handelDeleteSingleItem={handelDeleteSingleItem}
          handleEditItem={handleEditItem} />
      </main>
      <h1> total spending :
        <span className="total">${expenses.reduce((total, current) => {
          return (total += parseInt(current.amount))
        }, 0)}</span></h1>
    </>
  );
}

export default App;
