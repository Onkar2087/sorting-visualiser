import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dataContext } from '../context/UserContext';
import Visualise from '../visualise/Visualise';

function Quick() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed,  setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
            generateArray();
        }, []);

    const codeSnippets = {
    cpp: `
    void quickSort(int arr[], int low, int high) {
        if (low >= high) return; // Base case: single element is already sorted

        int pivot = arr[high]; // Choose the last element as pivot
        int i = low - 1; // Index for smaller elements

        // Partition the array
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]); // Swap smaller element with current element
            }
        }
        swap(arr[i + 1], arr[high]); // Place pivot at correct position
        int pi = i + 1; // Pivot index

        // Recursively sort left and right partitions
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
        `
    ,    
    java: `
    public static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return; // Base case: single element is already sorted

        int pivot = arr[high]; // Choose the last element as pivot
        int i = low - 1; // Index for smaller elements

        // Partition the array
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp; // Swap smaller element with current element
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp; // Place pivot at correct position
        int pi = i + 1; // Pivot index

        // Recursively sort left and right partitions
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
        `
    ,
    python: `
    def quick_sort(arr, low, high):
        if low >= high:
            return  # Base case: single element is already sorted

        pivot = arr[high]  # Choose the last element as pivot
        i = low - 1  # Index for smaller elements

        # Partition the array
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]  # Swap smaller element with current element

        arr[i + 1], arr[high] = arr[high], arr[i + 1]  # Place pivot at correct position
        pi = i + 1  # Pivot index

        # Recursively sort left and right partitions
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
        `,
    };

    const quickSortVisual = async () => {
        let arr = [...array];
        setIsSorting(true);
        setStatusText("");

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const partition = async (arr, low, high) => {
            let pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setArray([...arr]);
                    await sleep(speed);
                }
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            await sleep(speed);
            return i + 1;
        };

        const quickSort = async (arr, low, high) => {
            if (low < high) {
                let pi = await partition(arr, low, high);
                await quickSort(arr, low, pi - 1);
                await quickSort(arr, pi + 1, high);
            }
        };

        await quickSort(arr, 0, arr.length - 1);

        setIsSorting(false);
        setStatusText("Sorting Completed");
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">←</button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>Quick Sort</h1>
        
            <Visualise sortFunction={quickSortVisual}/>

            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Quick Sort</span> is a divide-and-conquer sorting algorithm that selects a pivot element, partitions the array around the pivot, and recursively sorts the subarrays.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Understanding Quick Sort through an analogy
            </h2>

            <p className='text-lg'>
                Imagine organizing books on a shelf. You pick a random book as a reference (pivot), then move smaller books to the left and larger books to the right. You repeat this process for each section until the books are fully sorted
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Time Complexity
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li><strong>Best-case:</strong> O(nlog(n))</li>
                <li><strong>Average-case:</strong> O(nlog(n))</li>
                <li><strong>Worst-case:</strong> O(n²)</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Space Complexity                
            </h2>

            <p className='text-lg'>
                O(n+k) in the <strong>Worst-case</strong> scenario
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                How Quick Sort Works?                
            </h2>

            <ol  className='text-lg list-decimal list-inside space-y-1'>
                <li>- Choose a Pivot: Select an element from the array (e.g., first, last, random, or median).</li>
                <li>- Partition the Array: Rearrange elements so that smaller values are on the left and larger values are on the right.</li>
                <li>- Recursively Sort: Apply Quick Sort to the left and right subarrays.</li>
                <li>- Base Case: The recursion stops when subarrays contain only one element.</li>
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
                <li>Efficient for large datasets (O(n log n) complexity).</li>
                <li>Works well for in-place sorting (minimal memory usage).</li>
                <li>Highly optimized in practice (used in many programming libraries).</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Not a stable sorting algorithm (may change the relative order of equal elements).</li>
                <li>Worst-case performance is O(n²) if the pivot is poorly chosen.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <h4><strong>Unsorted Array:</strong> [11, 9, 12, 7, 3]</h4>
                <h6>Step 1: Choose Pivot</h6>
                <ul className='ml-10'>
                    <li>Step 1: Choose Pivot</li>
                </ul>                                
                <h6>Step 2: Partition</h6>
                <ul className='ml-10'>
                    <li>Move smaller elements to the left and larger elements to the right.</li>
                    <li>Swap 3 with 11: [3, 9, 12, 7, 11]</li>
                </ul>                  
                <h6>Step 3: Recursively Sort</h6>
                <ul className='ml-10'>
                    <li>Sort [9, 12, 7, 11] using the same process.</li>
                    <li>Continue until fully sorted: [3, 7, 9, 11, 12]</li>
                </ul>

                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Quick