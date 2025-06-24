import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dataContext } from '../context/UserContext';
import Visualise from '../visualise/Visualise';

function Merge() {
    const navigate = useNavigate()
    const {lang, setLang, copy, array, setArray, speed, setIsSorting, setStatusText, copyToClipboard, generateArray} = useContext(dataContext)

    useEffect(() => {
            generateArray();
        }, []);

    const codeSnippets = {
    cpp: `
    void mergeSort(int arr[], int l, int r) {
        if (l >= r) return; // Base case: single element is already sorted

        int mid = l + (r - l) / 2; // Find the middle index

        // Recursively sort left and right halves
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);

        // Merge the sorted halves
        int n1 = mid - l + 1, n2 = r - mid;
        int left[n1], right[n2];

        // Copy data to temporary arrays
        for (int i = 0; i < n1; i++) left[i] = arr[l + i];
        for (int i = 0; i < n2; i++) right[i] = arr[mid + 1 + i];

        // Merge the two sorted arrays
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        }

        // Copy remaining elements
        while (i < n1) arr[k++] = left[i++];
        while (j < n2) arr[k++] = right[j++];
    }
        `
    ,    
    java: `
    public static void mergeSort(int[] arr, int l, int r) {
        if (l >= r) return; // Base case: single element is already sorted

        int mid = l + (r - l) / 2; // Find the middle index

        // Recursively sort left and right halves
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);

        // Merge the sorted halves
        int n1 = mid - l + 1, n2 = r - mid;
        int[] left = Arrays.copyOfRange(arr, l, mid + 1);
        int[] right = Arrays.copyOfRange(arr, mid + 1, r + 1);

        // Merge the two sorted arrays
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        }

        // Copy remaining elements
        while (i < n1) arr[k++] = left[i++];
        while (j < n2) arr[k++] = right[j++];
    }
        `
    ,
    python: `
    def merge_sort(arr, l, r):
        if l >= r:
            return  # Base case: single element is already sorted

        mid = l + (r - l) // 2  # Find the middle index

        # Recursively sort left and right halves
        merge_sort(arr, l, mid)
        merge_sort(arr, mid + 1, r)

        # Merge the sorted halves
        left = arr[l:mid + 1]
        right = arr[mid + 1:r + 1]

        # Merge the two sorted arrays
        i, j, k = 0, 0, l
        while i < len(left) and j < len(right):
            arr[k] = left[i] if left[i] <= right[j] else right[j]
            i += left[i] <= right[j]
            j += left[i] > right[j]
            k += 1

        # Copy remaining elements
        while i < len(left):
            arr[k] = left[i]
            i++
            k++
        while j < len(right):
            arr[k] = right[j]
            j++
            k++
        `,
    };
    
    const mergeSortVisual = async () => {
        let arr = [...array];
        setIsSorting(true);
        setStatusText("");

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const merge = async (arr, left, mid, right) => {
            const n1 = mid - left + 1;
            const n2 = right - mid;

            const L = new Array(n1);
            const R = new Array(n2);

            for (let i = 0; i < n1; i++) L[i] = arr[left + i];
            for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

            let i = 0, j = 0, k = left;

            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } 
                else {
                    arr[k] = R[j];
                    j++;
                }
                setArray([...arr]);
                await sleep(speed);
                k++;
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
                setArray([...arr]);
                await sleep(speed);
            }

            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
                setArray([...arr]);
                await sleep(speed);
            }
        };

        const mergeSort = async (arr, left, right) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                await mergeSort(arr, left, mid);
                await mergeSort(arr, mid + 1, right);
                await merge(arr, left, mid, right);
            }
        };

        await mergeSort(arr, 0, arr.length - 1);

        setIsSorting(false);
        setStatusText("Sorting Completed");
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-200 p-4 text-gray-800">
        <button className='fixed top-4 left-4 w-10 h-10 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer text-3xl flex justify-center' 
        onClick={()=>{navigate('/Comparison-Algorithms')}} title="Go back">←</button>

        <div className='flex flex-col gap-6 max-w-6xl mx-auto p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur'>

            <h1 className='text-center text-4xl font-bold text-blue-900'>Merge Sort</h1>
        
            <Visualise sortFunction={mergeSortVisual}/>

            <p className='text-lg'>
                <span className='text-2xl font-semibold'>Merge Sort</span> is a divide-and-conquer sorting algorithm that recursively splits an array into smaller subarrays, sorts them, and then merges them back together in sorted order.
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>Understanding Merge Sort through an analogy</h2>

            <p className='text-lg'>
                Imagine sorting a shuffled deck of cards. You split the deck into smaller piles, sort each pile individually, and then merge them back together in order. This is exactly how Merge Sort works—breaking down the problem, solving smaller parts, and combining them efficiently.                
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
                O(n) in the <strong>Worst-case</strong> scenario
            </p>

            <h2 className='text-3xl font-bold text-blue-700'>
                How Merge Sort Works?                
            </h2>

            <ol  className='text-lg list-decimal list-inside space-y-1'>
                <li>Divide: Split the array into two halves until each subarray contains only one element.</li>
                <li>Conquer: Recursively sort each half.</li>
                <li>Merge: Combine the sorted halves back together to form a fully sorted array.</li>
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
                <li>Stable sorting algorithm (preserves order of equal elements).</li>
                <li>Works well for linked lists and external sorting (large files).</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Disadvantages                
            </h2>

            <ul className='text-lg list-disc list-inside'>
                <li>Requires extra memory (O(n)) for merging.</li>
                <li>Slower than Quick Sort in practical scenarios due to overhead.</li>
            </ul>

            <h2 className='text-3xl font-bold text-blue-700'>
                Example            
            </h2>

            <div className='text-lg space-y-2'>
            <h4><strong>Unsorted Array:</strong> [38, 27, 43, 10]</h4>
                <h6>Step 1: Divide</h6>
                <ul className='ml-10'>
                    <li>Split into [38, 27] and [43, 10]</li>
                    <li>Further split into [38], [27], [43], [10]</li>
                </ul>                                
                <h6>Step 2: Conquer</h6>
                <ul className='ml-10'>
                    <li>[38] and [27] are sorted individually.</li>
                    <li>[43] and [10] are sorted individually.</li>
                    <li>Compare 5 & 2 → Swap → [3, 4, 2, 5, 8]</li>
                </ul>                  
                <h6>Step 3: Merge</h6>
                <ul className='ml-10'>
                    <li>Merge [38] and [27] → [27, 38]</li>
                    <li>Merge [43] and [10] → [10, 43]</li>
                    <li>Merge [27, 38] and [10, 43] → [10, 27, 38, 43]</li>
                </ul>
                <p className='text-xl text-green-700 font-semibold'>Now the array is sorted!</p>
            </div>
        </div>
    </div>
  )
}

export default Merge