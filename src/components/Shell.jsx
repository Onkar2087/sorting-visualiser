import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dataContext } from '../context/UserContext';
import Visualise from '../visualise/Visualise';

function Shell() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed, setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
            generateArray();
        }, []);

    const codeSnippets = {
    cpp: `
    void shellSort(int arr[], int n) {
        for (int gap = n / 2; gap > 0; gap /= 2) { // Reduce gap size in each iteration
            for (int i = gap; i < n; i++) {
                int temp = arr[i]; // Store current element
                int j = i;

                // Shift elements that are greater than temp to the right
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                // Place temp at its correct position
                arr[j] = temp;
            }
        }
    }
        `,    
    java: `
    public static void shellSort(int[] arr) {
        int n = arr.length;

        for (int gap = n / 2; gap > 0; gap /= 2) { // Reduce gap size in each iteration
            for (int i = gap; i < n; i++) {
                int temp = arr[i]; // Store current element
                int j = i;

                // Shift elements that are greater than temp to the right
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                // Place temp at its correct position
                arr[j] = temp;
            }
        }
    }
        `,
    python: `
    def shell_sort(arr):
        n = len(arr)
        gap = n // 2  # Reduce gap size in each iteration

        while gap > 0:
            for i in range(gap, n):
                temp = arr[i]  # Store current element
                j = i

                # Shift elements that are greater than temp to the right
                while j >= gap and arr[j - gap] > temp:
                    arr[j] = arr[j - gap]
                    j -= gap

                # Place temp at its correct position
                arr[j] = temp

            gap //= 2  # Reduce gap size
        `,
    };
    
    const shellSortVisual = async () => {
        let arr = [...array];
        let n = arr.length;

        setIsSorting(true);
        setStatusText("");

        // Start with a big gap, then reduce the gap
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            // Do a gapped insertion sort for this gap size
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;

                // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                    setArray([...arr]);
                    await new Promise((resolve) => setTimeout(resolve, speed));
                }

                arr[j] = temp;
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, speed));
            }
        }

        setIsSorting(false);
        setStatusText("Sorting Completed");
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">←</button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>Shell Sort</h1>
        
            <Visualise sortFunction={shellSortVisual}/>
        
            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Shell Sort</span> is an efficient sorting algorithm that improves upon Insertion Sort by allowing exchanges of far-apart elements, reducing the number of shifts required for sorting.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Understanding Shell Sort through an analogy
            </h2>

            <p className='text-lg'>
                Imagine sorting books on a shelf, but instead of moving them one by one, you first organize books that are far apart, then gradually refine the order.                
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Time Complexity
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li><strong>Best-case:</strong> O(nlog(n))</li>
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
                How Shell Sort Works?                
            </h2>

            <ol className='text-lg list-decimal list-inside space-y-1'>
                <li>Choose a Gap Sequence: Start with a large gap and reduce it over time.</li>
                <li>Sort Elements at Intervals: Perform Insertion Sort on elements that are gap positions apart.</li>
                <li>Reduce the Gap: Continue sorting with smaller gaps until gap = 1, at which point the array is fully sorted.</li>
            </ol>

            <h2 className='text-3xl font-bold text-blue-700'>
                Code Implementation                
            </h2>

            <div className='relative'>
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
                <li>Faster than Insertion Sort for larger datasets.</li>
                <li>Efficient for nearly sorted arrays.</li>
                <li> Works well with different gap sequences for optimization.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Performance depends on gap sequence choice.</li>
                <li>Not a stable sorting algorithm (may change the relative order of equal elements).</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <h4><strong>Unsorted Array:</strong> [23, 1, 10, 5, 2]</h4>
                <h6>Step 1: Choose Gap = 2</h6>
                <ul className='ml-10'>
                    <li>Compare elements gap positions apart: [23, 10], [1, 5], [10, 2]</li>
                    <li>Sort these subarrays → [10, 1, 23, 5, 2]</li>
                </ul>                                
                <h6>Step 2: Reduce Gap to 1</h6>
                <ul className='ml-10'>
                    <li>Perform Insertion Sort on the entire array → [1, 2, 5, 10, 23]</li>
                </ul>

                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Shell
