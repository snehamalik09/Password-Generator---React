import { useCallback, useEffect, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed)
        str += "0123456789"
    if(charsAllowed)
        str += "@#$%^&*!~(){}:"

    for(let i = 0; i<length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
  
  setPassword(pass)

  } ,[length, numbersAllowed, charsAllowed, setPassword])

  const copyPassword = useCallback(() => {
      window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect( () => {
    passwordGenerator()
  }, [length, numbersAllowed, charsAllowed, passwordGenerator] )

  



  return (
    <>
      <h1 className="text-5xl bg-white py-4 text-center my-2">Password Generator</h1>
      <div className=" w-full max-w-lg h-60 mx-auto my-10 p-5 rounded-xl bg-black"> 
      <input type="text" placeholder='Password' value={password} readOnly className=' p-2 m-2 w-96' />
      <button id="copybtn" onClick={copyPassword} className='outline-none bg-blue-600 px-3 py-2 hover:bg-blue-200'>Copy</button>
      
      <div className='flex gap-x-3 my-5'>
      <input type="range" value={length} min={8} max={30} onChange={ (e) => setLength(e.target.value) } className='cursor-pointer' />
      <label className='text-white'>Length : {length}</label>

      <input type="checkbox" value={numbersAllowed} onChange={ () => setNumbersAllowed((prev) => !prev ) } className='cursor-pointer' />
      <label className='text-white'> Numbers</label>

      <input type="checkbox" value={charsAllowed} onChange={ () => setCharsAllowed((prev) => !prev )} className='cursor-pointer' />
      <label className='text-white'> Characters</label>
      </div>
      
      </div>
      
    </>
  )
}

export default App
