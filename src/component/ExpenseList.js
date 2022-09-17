import React from 'react'
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from 'react-icons/md'


const ExpenseList = ({ expenses,handelDeleteAllItems,handelDeleteSingleItem,handleEditItem }) => {
    return (
        <>
            <ul className='list'>
                {expenses.map((expense) => {
                    return <ExpenseItem key={expense.id}
                     expense={expense}
                     handelDeleteSingleItem={handelDeleteSingleItem}
                     handleEditItem={handleEditItem}
                      />
                })}
            </ul>
            {expenses.length > 0 && (
                <button className='btn' onClick={handelDeleteAllItems}>Clear List
                    <MdDelete className='btn-icon' /></button>)}
        </>
    )
}

export default ExpenseList
