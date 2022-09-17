import React from 'react'


const ExpenseForm = ({charge,amount,handelAmount,handelCharge,handelSubmit, edit}) => {
  return (
    <form onSubmit={handelSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                <label htmlFor='charge'>Charge</label>
                <input
                 type="text"
                 className='form-control' 
                 id='charge'
                 name='charge'
                 placeholder='Add Charge'
                 value={charge}
                 onChange = {handelCharge}/>
            </div>

            <div className='form-group'>
                <label htmlFor='amount'>Amount</label>
                <input
                 type="number"
                 className='form-control' 
                 id='amount'
                 name='amount'
                 placeholder='Add amount'
                 value={amount}
                 onChange = {handelAmount}/>
            </div>
        </div>
        <button type='submit' className='btn'>
          {edit ? "Edit" : "Submit"}
          </button>
    </form>
  )
}

export default ExpenseForm
