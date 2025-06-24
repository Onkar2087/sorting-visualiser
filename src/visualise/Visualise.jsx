import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'

function Visualise({sortFunction}) {
    const {arraySize, setArraySize, isSorting, speed, setSpeed, generateArray, statusText, array} = useContext(dataContext)
  return (
    <div className="w-full flex flex-col items-center">
            {/* Sliders */}
            <div className='flex flex-col items-center gap-4 mb-6'>
                <div className='flex flex-col items-center'>
                    <label className=' font-semibold'>Array Size: {arraySize}</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={arraySize}
                        onChange={(e) => setArraySize(parseInt(e.target.value))}
                        className='w-64'
                        disabled={isSorting}
                    />
                </div>
                <div className='flex flex-col items-center'>
                    <label className='font-semibold'>Speed: {speed}</label>
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className='w-64'
                        disabled={isSorting}
                    />
                </div>
            </div>

            {/* Visualization Bars */}
            <div className="bg-white p-4 rounded w-full max-w-5xl h-[250px] flex items-end justify-center overflow-hidden mb-4">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="mx-[2px] bg-blue-500"
                        style={{
                            height: `${value * 2}px`,
                            width: '20px',
                            transition: 'all 0.2s ease',
                        }}
                    ></div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-2 justify-center">
                <button
                    onClick={generateArray}
                    disabled={isSorting}
                    className=" px-4 py-2 rounded font-semibold cursor-pointer bg-rose-500 hover:bg-rose-700 text-white"
                >
                    Reset Bars
                </button>
                <button
                    onClick={sortFunction}
                    disabled={isSorting}
                    className=" px-4 py-2 rounded font-semibold cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white"
                >
                    {isSorting ? "Sorting..." : "Sort Visual"}
                </button>
            </div>

            {/* Status */}
            {statusText && (
                <div className="text-green-400 font-bold text-lg mb-6 text-center">{statusText}</div>
            )}
    </div>
  )
}

export default Visualise