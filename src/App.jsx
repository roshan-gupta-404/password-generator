import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [len, setLen] = useState('10') //length of password
  const [password, setPassword] = useState("") //password to be displayed/generated
  const [numAllowed, setNumAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(false)
  const passRef = useRef(null)

  const generatePass = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()-_+='
    const strLen = str.length;
    for (let i = 0; i < len; i++) {
      let ranNum = Math.floor(Math.random() * strLen + 1); // give number from 1 to stringLength.
      pass+= str.charAt(ranNum);
    }
    setPassword(pass)
  }, [len, numAllowed, charAllowed, setPassword])

  useEffect(()=>{
    generatePass()
  },[len,numAllowed,charAllowed,setPassword])

  const copyPassToClipBoard = useCallback(()=>{
    passRef.current?.select();                     // this is for ui purpose only.
    // passRef.current?.setSelectionRange(0,3)     // will select only 3 char character. (3 is excluded)
    window.navigator.clipboard.writeText(password) // in next.js we don't have window object.
  },[password])

  // generatePass();
  //calling generatePass() directly will lead error of 'too many renders'.
  //it updates the component state by calling setPassword(pass), which triggers a re-render of the component. However, in the next render, generatePass() is called again, and this process repeats infinitely, leading to the "Too many re-renders" error.


  return (
    <>
      <div
        className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'
      >
        <h1 className='text-white text-center mb-4'>Password Generator</h1>
        <div
          className='flex shadow overflow-hidden rounded-lg mb-4 px-2'
        >
          <input
            type='text'
            value={password}
            placeholder='Password'
            readOnly
            className='rounded-l-lg outline-none py-1 px-3 w-full'
            ref={passRef}
          />
          <button
            onClick={copyPassToClipBoard}
            className='bg-blue-700 text-white px-3 py-0.5 rounded-r-lg shrink-0 roudn'
          >
            copy
          </button>

        </div>
        <div
          className='flex text-sm gap-x-2'
        >
          <div
            className='flex items-center gap-x-1'
          >
            <input
              className='cursor-pointer'
              type='range'
              min={6}
              max={20}
              value={len} // untill we change the len by onclick fn, the range slider will not slide bcoz it is fixed at value of len.
              onChange={(e) => { setLen(e.target.value) }}
            />
            <label 
            className='mr-1'
            >Length: {len}</label>
            <input
              className='cursor-pointer'
              type='checkbox'
              defaultChecked = {numAllowed}
              id='numberInput'
              onChange={() => {setNumAllowed((prev)=>(!prev))}} // reverse the prev value.
            />
            <label>Numbers</label>
            <input
              className='cursor-pointer'
              type='checkbox'
              defaultChecked = {charAllowed}
              id='numberInput'
              onChange={() => {setCharAllowed((prev)=>(!prev))}} // reverse the prev value.
            />
            <label>Special Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
