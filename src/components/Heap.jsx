import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dataContext } from '../context/UserContext';
import Visualise from '../visualise/Visualise';

function Heap() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed, setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
            generateArray();
        }, []);

    const codeSnippets = {
    cpp: `    
    void heapSort(int arr[], int n) {
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            int largest = i, left = 2 * i + 1, right = 2 * i + 2;
            while (left < n) {
                if (arr[left] > arr[largest]) largest = left;
                if (right < n && arr[right] > arr[largest]) largest = right;
                if (largest == i) break;
                swap(arr[i], arr[largest]);
                i = largest;
                left = 2 * i + 1;
                right = 2 * i + 2;
            }
        }

        // Extract elements one by one from heap
        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]); // Move current root to end
            int largest = 0, left = 1, right = 2;
            while (left < i) {
                if (arr[left] > arr[largest]) largest = left;
                if (right < i && arr[right] > arr[largest]) largest = right;
                if (largest == 0) break;
                swap(arr[0], arr[largest]);
                largest = 0;
                left = 1;
                right = 2;
            }
        }
    }`,    
    java: `
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            int largest = i, left = 2 * i + 1, right = 2 * i + 2;
            while (left < n) {
                if (arr[left] > arr[largest]) largest = left;
                if (right < n && arr[right] > arr[largest]) largest = right;
                if (largest == i) break;
                int temp = arr[i];
                arr[i] = arr[largest];
                arr[largest] = temp;
                i = largest;
                left = 2 * i + 1;
                right = 2 * i + 2;
            }
        }

        // Extract elements one by one from heap
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            int largest = 0, left = 1, right = 2;
            while (left < i) {
                if (arr[left] > arr[largest]) largest = left;
                if (right < i && arr[right] > arr[largest]) largest = right;
                if (largest == 0) break;
                temp = arr[0];
                arr[0] = arr[largest];
                arr[largest] = temp;
                largest = 0;
                left = 1;
                right = 2;
            }
        }
    }`,
    python: `
    def heap_sort(arr):
        n = len(arr)

        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            largest, left, right = i, 2 * i + 1, 2 * i + 2
            while left < n:
                if arr[left] > arr[largest]:
                    largest = left
                if right < n and arr[right] > arr[largest]:
                    largest = right
                if largest == i:
                    break
                arr[i], arr[largest] = arr[largest], arr[i]
                i = largest
                left, right = 2 * i + 1, 2 * i + 2

        # Extract elements one by one from heap
        for i in range(n - 1, 0, -1):
            arr[0], arr[i] = arr[i], arr[0]
            largest, left, right = 0, 1, 2
            while left < i:
                if arr[left] > arr[largest]:
                    largest = left
                if right < i and arr[right] > arr[largest]:
                    largest = right
                if largest == 0:
                    break
                arr[0], arr[largest] = arr[largest], arr[0]
                largest, left, right = 0, 1, 2`,
        };
    
    const heapSortVisual = async () => {
        let arr = [...array];
        let n = arr.length;
        setIsSorting(true);
        setStatusText("");

        const heapify = async (arr, n, i) => {
            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }

            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }

            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, speed));
                await heapify(arr, n, largest);
            }
        };

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }

        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, speed));
            await heapify(arr, i, 0);
        }

        setIsSorting(false);
        setStatusText("Sorting Completed");
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">←</button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>Heap Sort</h1>
        
            <Visualise sortFunction={heapSortVisual}/>
        
            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Heap Sort</span> is an efficient sorting algorithm that uses a binary heap data structure to sort elements. It repeatedly removes the largest (or smallest) element from the heap and places it at the end of the sorted array.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Understanding Heap Sort through an analogy                
            </h2>

            <p className='text-lg'>
                Imagine organizing a tournament where the strongest player is always placed at the top. After each round, the strongest player is removed, and the remaining players adjust their rankings. This is exactly how Heap Sort works—removing the largest element and reorganizing the heap!                
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                Time Complexity
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li><strong>Best-case:</strong> O(nlog(n))</li>
                <li><strong>Average-case:</strong> O(nlog(n))</li>
                <li><strong>Worst-case:</strong> O(nlog(n))</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Space Complexity                
            </h2>

            <p className='text-lg'>
                O(1) in the <strong>Worst-case</strong> scenario
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                How Heap Sort Works?
            </h2>

            <ol  className='text-lg list-decimal list-inside space-y-1'>
                <li>Build a Max Heap – Convert the array into a max heap where the largest element is at the root.</li>
                <li>Swap & Remove Root – Swap the root (largest element) with the last element and remove it from the heap.</li>
                <li>Heapify the Remaining Elements – Restore the heap property by adjusting the remaining elements.</li>
                <li>Repeat Until Sorted – Continue the process until all elements are sorted.</li>
            
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
                <li>Efficient for large datasets (O(n log n) complexity).</li>
                <li>Works well for priority queues and scheduling tasks.</li>
                <li>Does not require additional memory (in-place sorting).</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Not a stable sorting algorithm (may change the relative order of equal elements).</li>
                <li>Heapify operations can be slow compared to Quick Sort.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <h4><strong>Unsorted Array:</strong> [4, 10, 3, 5, 1]</h4>
                <h6>Step 1: Build Max Heap</h6>
                <ul className='ml-10'>
                    <li>Convert the array into a max heap: [10, 5, 3, 4, 1]</li>
                </ul>                                
                <h6>Step 2: Swap & Remove Root</h6>
                <ul className='ml-10'>
                    <li>Swap 10 with 1: [1, 5, 3, 4, 10]</li>
                    <li>Remove 10 (sorted portion): [1, 5, 3, 4]</li>
                </ul>                  
                <h6>Step 3: Heapify</h6>
                <ul className='ml-10'>
                    <li>Restore heap property: [5, 4, 3, 1]</li>
                </ul>
                <h6>Step 4: Repeat Until Sorted</h6>
                <ul className='ml-10'>
                    <li>Swap 5 with 1: [1, 4, 3, 5]</li>
                    <li>Remove 5: [1, 4, 3]</li>
                    <li>Continue until fully sorted: [1, 3, 4, 5, 10]</li>
                </ul>    

                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Heap