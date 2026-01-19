import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState("");
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback( () => {
    let pass = "";
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str += "!@#$%^&*()~";
    if(numberAllowed) str += "0123456789";


    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);


  const copyPasswordToClipboard = useCallback( () =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect( () => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='box'>
      <h3 className='heading'>Password_Generator</h3>
      <div className='passw'>
        <input type="text"
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
        className='copy'>
          Copy
        </button>
      </div>

     <div>
      <div className='ran'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        onChange={ (e) => {setLength(e.target.value)} }
         />
         <label>Length: {length}</label>
      </div>

      <div className='number'>
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed} 
        id='NumberInput' 
        onChange={ () => {
          setNumberAllowed((prev) => !prev) ;
        }} />
        <label htmlFor="NumberInput">Numbers</label>
      </div>

      <div className='character'>
        <input type="checkbox" 
        defaultChecked={charAllowed} 
        id='characterInput' 
        onChange={ () => {
          setCharAllowed((prev) => !prev) ;
        }} />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
