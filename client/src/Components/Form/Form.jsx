import React from 'react'
import inputHook from '../../Hooks/FormHook'
import './Form.scss'

const form = props => {
     const [value,onInputChange,resetValue] = inputHook();
     const handleFormSubmit = (e) => {
          e.preventDefault()
          props.onFormSubmit(value)
          //resetValue()
     }
     return (
          <form className="col-7 m-auto form" onSubmit={handleFormSubmit}>
               <input type="text" className="form__input" value={value} onChange={onInputChange}/>
               <button className="form__button" type="submit">Detect</button>
          </form>
     )
}
export default form;