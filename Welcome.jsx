import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './src/assets/bg.png';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-center flex-col w-full min-h-screen gap-10 p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-lg py-9">
        Welcome to the Sorting Visualiser...
      </h1>
      <h3 className="text-3xl md:text-4xl font-semibold text-indigo-200 text-center">
        Which Sorting Algorithm do you want to visualise?
      </h3>

      <div className="flex flex-col items-center justify-center h-full text-center gap-10">
        <h1 className="text-4xl font-extrabold text-teal-100 max-w-4xl">
          <span className="text-fuchsia-300">Comparison Sorting</span> Algorithms includes
        </h1>

        <ol className="flex flex-col gap-5 text-xl text-cyan-200">
          {[
            ['Bubble Sort', '/Bubble-Sort'],
            ['Heap Sort', '/Heap-Sort'],
            ['Insertion Sort', '/Insertion-Sort'],
            ['Merge Sort', '/Merge-Sort'],
            ['Quick Sort', '/Quick-Sort'],
            ['Selection Sort', '/Selection-Sort'],
            ['Shell Sort', '/Shell-Sort'],
          ].map(([label, route]) => (
            <li
              key={route}
              className="text-yellow-200 hover:underline hover:font-bold hover:text-white cursor-pointer transition"
              onClick={() => navigate(route)}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Welcome;
