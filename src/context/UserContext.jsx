import React, { createContext, useEffect, useState } from 'react'
export const dataContext = createContext()

function UserContext({children}) {
        const [lang, setLang] = useState("cpp")
        const[copy, setCopy] = useState('Copy')
        const [array, setArray] = useState([]);
        const [speed, setSpeed] = useState(100); // speed in ms
        const [isSorting, setIsSorting] = useState(false);
        const [arraySize, setArraySize] = useState(20);
        const [statusText, setStatusText] = useState('')


    const generateArray = () => {
        const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
        setArray(newArr);
        setStatusText('');
    };

    useEffect(() => {
        generateArray();
    }, [arraySize]);

    const copyToClipboard = (code)=>{
        navigator.clipboard.writeText(code);
        setCopy('Copied!')
        setTimeout(()=>setCopy('Copy'), 5000)
    }

    let data = {
        generateArray,
        useEffect,
        lang,
        setLang,
        copy, setCopy, array, setArray,
        arraySize, setArraySize,
        speed, setSpeed, isSorting, setIsSorting, statusText, setStatusText, copyToClipboard
    }
  return (
    <div>
        <dataContext.Provider value = {data}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext