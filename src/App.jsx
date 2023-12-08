import { useState, useCallback, useEffect, useRef } from 'react'
import AllPass from './AllPass'
import NoPass from './NoPass'

function App() {
  const [save, setSave] = useState(false)
  const [title, setTitle] = useState('')
  const [len, setLen] = useState('10') //length of password
  const [password, setPassword] = useState("") //password to be displayed/generated
  const [numAllowed, setNumAllowed] = useState(true)
  const [spclCharAllowed, setSpclCharAllowed] = useState(true)
  const [showAllStatus, setShowAllStatus] = useState(false)
  const [allPass, setAllPass] = useState(null)
  const passRef = useRef(null)

  const generatePass = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) str += '0123456789'
    if (spclCharAllowed) str += '!@#$%^&*()-_+='
    const strLen = str.length;
    for (let i = 0; i < len; i++) {
      let ranNum = Math.floor(Math.random() * strLen + 1); // give number from 1 to stringLength.
      pass += str.charAt(ranNum);
    }
    setPassword(pass)
  }, [len, numAllowed, spclCharAllowed, setPassword])

  useEffect(() => {
    generatePass()
  }, [len, numAllowed, spclCharAllowed, setPassword])

  const copyPassToClipBoard = useCallback(() => {
    passRef.current?.select();                     // this is for ui purpose only.
    // passRef.current?.setSelectionRange(0,3)     // will select only 3 char character. (3 is excluded)
    window.navigator.clipboard.writeText(password) // in next.js we don't have window object.
  }, [password])

  // SAVING TO LOCALSTORAGE
  const saveToLocal = async () => {
    if ((title.trim())) {
      // get the old saved pass from local and save it into variable
      let savedPass = await JSON.parse(localStorage.getItem('pass'))
      // save the current password into variable
      if (savedPass) {
        savedPass = [...savedPass, { title: title.trim(), pass: password, date: new Date().toLocaleString() }]
      }
      else {
        savedPass = [{ title: title, pass: password, date: new Date().toLocaleString() }]
      }
      // set the passwords into local
      localStorage.setItem('pass', JSON.stringify(savedPass))
      setSave(false)
      setTitle('')
      if(showAllStatus) showAllPass() // if show all pass box is open then rloading it.
    }
    else {
      return null;
    }
  }

  // SHOW ALL PASS
  const showAllPass = () => {
    // FETCH THE PASS AND SAVE IT 
    const savedPass = JSON.parse(localStorage.getItem('pass'))
    setAllPass(savedPass)
    setShowAllStatus(true)
  }

  // REMOVE ALL PASS
  const removeAllPass = () => {
    localStorage.removeItem('pass')
    setShowAllStatus(false)
  }

  //CLOSE SHOW ALL PASS
  const close = ()=>{
    setAllPass(null)
    setShowAllStatus(false)
  }



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
            onClick={generatePass}
            className='bg-gray-500 text-white px-3 py-0.5  shrink-0 round'
          >
            ↻
          </button>
          <button
            onClick={copyPassToClipBoard}
            className='bg-blue-700 text-white px-3 py-0.5 rounded-r-lg shrink-0 round'
          >
            copy
          </button>

        </div>

        {/* OPTIONS */}
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
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => { setNumAllowed((prev) => (!prev)) }} // reverse the prev value.
            />
            <label>Numbers</label>
            <input
              className='cursor-pointer'
              type='checkbox'
              defaultChecked={spclCharAllowed}
              id='numberInput'
              onChange={() => { setSpclCharAllowed((prev) => (!prev)) }} // reverse the prev value.
            />
            <label>Special Characters</label>
          </div>
        </div>
        {/* SAVE OPTION */}
        <div
          className='flex  overflow-hidden rounded-lg my-4 px-2'
        >
          <button
            onClick={showAllPass}
            className='bg-blue-700 text-white px-3 py-1 mr-2  shrink-0 round'
          >
            Show all Pass
          </button>
          <button
            onClick={() => setSave(true)}
            className='bg-blue-700 text-white px-3 py-1  shrink-0 round'
          >
            Save
          </button>
          {save && <><input
            type='text'
            value={title}
            placeholder='Title'
            className=' outline-none py-1 px-3 ml-auto w-full'
            onChange={(e) => setTitle(e.target.value)}
          />
            <button
              onClick={saveToLocal}
              className='bg-blue-700 text-white px-3 py-0.5  shrink-0 round'
            >
              →
            </button></>}
        </div>
      </div>
      {/* SHOW ALL PASS DIV */}
      {showAllStatus && (allPass?<AllPass allPass={allPass} removeAllPass={removeAllPass} close={close} />:<NoPass close={close}/>)}

    </>
  )
}

export default App


// generatePass();
//calling generatePass() directly will lead error of 'too many renders'.
//it updates the component state by calling setPassword(pass), which triggers a re-render of the component. However, in the next render, generatePass() is called again, and this process repeats infinitely, leading to the "Too many re-renders" error.