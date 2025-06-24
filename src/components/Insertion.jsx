import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dataContext } from '../context/UserContext';
import Visualise from '../visualise/Visualise';

function Insertion() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed, setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
        generateArray();
    }, []);

    const codeSnippets = {
    cpp: `
    void insertionSort(int arr[], int n) {
        for (int i = 1; i < n; i++) {
            int key = arr[i]; // Store the current element
            int j = i - 1;

            // Shift elements that are greater than key to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            // Place key at its correct position
            arr[j + 1] = key;
        }
    }`,    
    java: `
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i]; // Store the current element
            int j = i - 1;

            // Shift elements that are greater than key to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            // Place key at its correct position
            arr[j + 1] = key;
        }
    }`,
    python: `
    def insertion_sort(arr):
        for i in range(1, len(arr)):
            key = arr[i]  # Store the current element
            j = i - 1

            # Shift elements that are greater than key to the right
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1

            # Place key at its correct position
            arr[j + 1] = key`,
    };
    
    const insertionSortVisual = async () => {
        let arr = [...array];
        let n = arr.length;
        setIsSorting(true);
        setStatusText("");

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, speed));
            }

            arr[j + 1] = key;
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }

        setIsSorting(false);
        setStatusText("Sorting Completed");
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">←</button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>Insertion Sort</h1>

            <Visualise sortFunction={insertionSortVisual}/>

            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Insertion Sort</span> is a simple sorting algorithm that builds the final sorted array one element at a time by taking each element and inserting it into its correct position within the sorted portion.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>Understanding Insertion Sort through an analogy</h2>

            <p className='text-lg'>
                Imagine selecting players for a sports team. You start by picking the best player from the entire group and placing them in the first position. Then, you pick the second-best player and place them in the second position. You repeat this until the team is fully sorted.                
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
                How Insertion Sort Works?                
            </h2>

            <ol  className='text-lg list-decimal list-inside space-y-1'>
                <li>Find the smallest element in the array.</li>
                <li>Swap it with the first element.</li>
                <li>Find the next smallest element and swap it with the second element.</li>
                <li>Repeat this process until all elements are sorted.</li>
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

                    <button onClick={()=>setLang("python")} className={`px-3 py-1 rounded cursor-pointer ${lang === "python" ? "bg-orange-400 underline" : "bg-gray-700"}`}>
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
                <li>Requires fewer swaps compared to Bubble Sort.</li>
                <li>Works well for small datasets or when memory writes are costly.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Slow for large datasets (O(n²) complexity).</li>
                <li>Not a stable sorting algorithm (may change the relative order of equal elements).</li>
                <li>Does not adapt to already sorted data (always runs in O(n²) time).</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <h4><strong>Unsorted Array:</strong> [64, 25, 12, 22, 11]</h4>
                <h6>Pass 1:</h6>
                <ul className='ml-10'>
                    <li>Find the smallest element (11) and swap it with 64</li>
                    <li>Array after swap: [11, 25, 12, 22, 64]</li>
                </ul>                                
                <h6>Pass 2:</h6>
                <ul className='ml-10'>
                    <li>Find the next smallest element (12) and swap it with 25.</li>
                    <li>Array after swap: [11, 12, 25, 22, 64]</li>
                </ul>                  
                <h6>Pass 3:</h6>
                <ul className='ml-10'>
                    <li>Find the next smallest element (22) and swap it with 25.</li>
                    <li>Array after swap: [11, 12, 22, 25, 64]</li>
                </ul>
                <h6>Pass 4:</h6>
                <ul className='ml-10'>
                    <li>Find the next smallest element (25) and swap it with itself (no change).</li>
                    <li>Array remains: [11, 12, 22, 25, 64]</li>
                </ul>    

                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Insertion