import React, { useEffect, useState } from 'react';
import './App.css';
import api from "./api/expenses"
import Expense from './Components/Expense/Expenses/Expense';
import NewExpense from './Components/NewExpense/NewExpense/NewExpense';

interface Item {
  id?: string,
  title: string,
  amount: number,
  date: Date
};

function App() {
  const [expenses, setExpenses] = useState<Item[]>([])

  //retrive expense Data
  const expenseData = async() => {
    const response = await api.get("/expenses");
    return response.data;
  }
  useEffect(() => {
    const getExpenseData = async() => {
      const allExpense = await expenseData();
      allExpense.map((e: Item) => {
        return e.date = new Date (e.date)
      })
      if (allExpense) setExpenses(allExpense)
    }
    getExpenseData();
  }, [])

  const addExpenseHandler = async(expense: Item) => {
    const response = await api.post("/expenses", expense)
    setExpenses((prevExpenses) => {
      response.data.date = new Date (response.data.date)
      return [response.data, ...prevExpenses]
    })
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expense expenses={expenses}/>
    </div>
  );
}

export default App;
