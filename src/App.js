import React, { useState } from 'react'
import { FaClipboard } from 'react-icons/fa'
import { useForm } from './useForm'
import { getRandomChar, getSpecialChar } from './utils'
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';

const App = () => {

  const [values, setValues] = useForm({
    length: 8,
    capital: true,
    small: true,
    number: true,
    symbol: true
  })
  const [result, setResult] = useState("");
  
  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90)
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122)
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57)
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar(),
    }
  ]

  const handleOnSubmit = (e) => {
   e.preventDefault();
   let generatedPassword = "";
   const checkedFields = fieldsArray.filter(({field}) => field)

   for(let i = 0; i < values.length; i++){
     const index = Math.floor(Math.random() * checkedFields.length)
     const letter = checkedFields[index]?.getChar()

     if(letter){
      generatedPassword += letter;
     }
    }
    if(generatedPassword){
      setResult(generatedPassword)
    }else{
      toast.error("please select at least one option")
    }
  }

  const handleClipboard = async () => {
       if(result) {
        await navigator.clipboard.writeText(result)
        toast.success("Copied to your clipboard")
       }else{
        toast.error("No password to copy")
       }
  }

  return (
    <section>
      <div className='container'>
        <form id="pg-form" onSubmit={handleOnSubmit}>
          <div className='result'>
            <input type="text" id="result" placeholder='Min 8 Char' readOnly 
              value={result}
            />
            <div className='clipboard' onClick={handleClipboard} title="Copy Password">
              <Button id="button" variant="contained"> <FaClipboard id="button-two" /> </Button>
            </div>
          </div>
          <div>
            <div className='field' title="Choose Length">
              <label htmlFor="length">Length</label>
              <input
              type="number" 
              id="length" 
              min={8} 
              max={20} 
              name="length" 
              value={values.length}
              onChange={setValues}
               />
            </div>
            <div className='field' title="Include Capital Case">
              <label htmlFor="capital">Capital</label>
              <input type="checkbox" id="capital"
              name="capital"
              checked={values.capital}
              onChange={setValues}
               />
            </div>

            <div className='field' title="Include Small Case">
              <label htmlFor="small">Small</label>
              <input type="checkbox" id="small" 
               name="small"
               checked={values.small}
              onChange={setValues} 
              />
            </div>

            <div className='field' title="Include Number">
              <label htmlFor="number">Number</label>
              <input type="checkbox" id="number" 
                name="number"
                checked={values.number}
              onChange={setValues}
              />
            </div>

            <div className='field' title="Include Symbol">
              <label htmlFor="symbol">Symbol</label>
              <input type="checkbox" id="symbol" 
                name="symbol"
                checked={values.symbol}
              onChange={setValues}
              />
            </div>
          </div>
          <Button variant="contained" type="submit" title="Generate Random Password">Generate Password</Button>
        </form>
      </div>
    </section>
  )
}

export default App
