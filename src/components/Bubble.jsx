import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import Visualise from '../visualise/Visualise';
import { dataContext } from '../context/UserContext';

function Bubble() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed, setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
            generateArray();
        }, []);

    const codeSnippets = {
    cpp: `
    void bubbleSort(int arr[], int n) {
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {  // Swap
                    std::swap(arr[j], arr[j+1]);
                }
            }
        }
    }`,    
    java: `
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {  // Swap
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }`,
    python: `
    def bubble_sort(arr):
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:  # Swap
                arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr`,
    }; 

    const bubbleSortVisual = async () => {
        let arr = [...array];
        let n = arr.length;
        setIsSorting(true);
        setStatusText("");
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await new Promise((resolve) => setTimeout(resolve, speed));
                }
            }
        }
    setIsSorting(false);
    setStatusText("Sorting Completed");
    };
    
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">
            ←
        </button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>
                Bubble Sort
            </h1>

            <Visualise sortFunction={bubbleSortVisual}/>

            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Bubble Sort</span> is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order, gradually "bubbling" the largest values to the end.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Understanding Bubble Sort through an analogy
            </h2>

            <p className='text-lg'>
                Imagine sorting a row of books by height. You repeatedly compare two books at a time, swapping them if the left one is taller than the right.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Time Complexity
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li><strong>Best-case:</strong> O(n)</li>
                <li><strong>Average-case:</strong> O(n²)</li>
                <li><strong>Worst-case:</strong> O(n²)</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Space Complexity                
            </h2>

            <p className='text-lg'>
                O(1) in the <strong>Worst-case</strong> scenario
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                How Bubble Sort Works?                
            </h2>

            <ol  className='text-lg list-decimal list-inside space-y-1'>
                <li>Compare the first two elements; if the first is greater, swap them.</li>
                <li>Move to the next pair and repeat the comparison/swapping.</li>
                <li>Continue until the largest element "bubbles" to the end.</li>
                <li>Repeat the process for the remaining elements until the entire list is sorted.</li>
            </ol>

            <h2 className='text-3xl font-bold text-blue-700'>
                Code Implementation                
            </h2>

            <div className='relative rounded-lg bg-black/80 p-4'>
                <div className='absolute top-2 left-2 z-10 flex space-x-2 text-white font-semibold'>
                    <button onClick={()=>setLang("cpp")} className={`px-3 py-1 rounded cursor-pointer ${lang === "cpp" ? "bg-yellow-400 underline" : "bg-gray-700"}`}>
                        C++                        
                    </button>
            
                    <button onClick={()=>setLang("java")} className={`px-3 py-1 rounded cursor-pointer ${lang === "java" ? "bg-red-600 underline" : "bg-gray-700"}`}>
                        Java
                    </button>
            
                    <button onClick={()=>setLang("python")} className={`px-3 py-1 rounded cursor-pointer ${lang === "python" ? "bg-orange-400  underline" : "bg-gray-700"}`}>
                        Python
                        </button>
                </div>
            
                <SyntaxHighlighter language={lang} className="rounded-md mt-12" style={nightOwl}>
                    {codeSnippets[lang]}
                </SyntaxHighlighter>
        
                <button className='absolute top-2 right-2 text-white px-3 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center space-x-2 cursor-pointer' onClick={()=>{copyToClipboard(codeSnippets[lang])}}>
                    {copy === 'Copy' ? <FaCopy/> : <FaCheck/>}
                    <span>{copy}</span>
                </button>
            </div>

            <h2 className='text-3xl font-bold text-blue-700'>
                Advantages
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li> Easy to understand and implement.</li>
                <li>Stable sorting algorithm (preserves order of equal elements).</li>
                <li>Works well for small datasets or nearly sorted arrays.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Slow for large datasets (O(n²) complexity).</li>
                <li>Not efficient compared to other sorting algorithms like Quick Sort or Merge Sort.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <p><strong>Unsorted Array:</strong> [5, 3, 8, 4, 2]</p>
                <h6>Pass 1:</h6>
                <ul className='ml-10'>
                    <li>Compare 5 & 3 → Swap → [3, 5, 8, 4, 2]</li>
                    <li>Compare 5 & 8 → No swap → [3, 5, 8, 4, 2]</li>
                    <li>Compare 8 & 4 → Swap → [3, 5, 4, 8, 2]</li>
                    <li>Compare 8 & 2 → Swap → [3, 5, 4, 2, 8]</li>
                </ul>                                
                <h6>Pass 2:</h6>
                <ul className='ml-10'>
                    <li>Compare 3 & 5 → No swap → [3, 5, 4, 2, 8]</li>
                    <li>Compare 5 & 4 → Swap → [3, 4, 5, 2, 8]</li>
                    <li>Compare 5 & 2 → Swap → [3, 4, 2, 5, 8]</li>
                </ul>                  
                <h6>Pass 3:</h6>
                <ul className='ml-10'>
                    <li>Compare 3 & 4 → No swap → [3, 4, 2, 5, 8]</li>
                    <li>Compare 4 & 2 → Swap → [3, 2, 4, 5, 8]</li>
                </ul>
                <h6>Pass 4:</h6>
                <ul className='ml-10'>
                    <li>Compare 3 & 2 → Swap → [2, 3, 4, 5, 8]</li>
                </ul>    

                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Bubble