import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setlen] = useState(8);
  const [numokay, setnumokay] = useState(false);
  const [specialchar, setspecialchar] = useState(false);
  const [password, setpassword] = useState("");

  const passwordgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numokay) {
      str += "0123456789";
    }
    if (specialchar) {
      str += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    }

    for (let i = 0; i < length; i++) {
      let ch = Math.floor(Math.random() * str.length);
      pass += str.charAt(ch);
    }

    setpassword(pass);
  }, [length, numokay, specialchar]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg bg-white px-4 my-8 text-orange-400">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="bg-white outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
          />
          <button
            className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlen(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numokay}
              onChange={(e) => setnumokay(e.target.checked)}
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={specialchar}
              onChange={(e) => setspecialchar(e.target.checked)}
            />
            <label>Include Special Characters</label>
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
          onClick={passwordgen}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
