import React from 'react'
import github from "./assets/github.jpeg"
import gmail from "./assets/gmail.png"
import linkedin from "./assets/linkedin.png"

<a href="https://github.com/rajanjha9235/Sorting_Visualizer" target="_blank" rel="noopener noreferrer">
          <img src="/Sorting_Visualizer/GitHub-Mark.png" alt="GitHub" title="Source Code" className="w-8 h-8 rounded-full" />
        </a>

function Footer() {
  return (
    <footer className="Z-2 w-full bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 text-gray-800 py-6 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm md:text-base">
                © {new Date().getFullYear()} Sorting Visualiser. All rights reserved. Onkar Dhingra
            </p>
            <div className="flex space-x-4 gap-5">


                <a href="" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="GitHub" title="Source Code" className="w-8 h-8 rounded-lg" />
                </a>

                <a href="https://www.linkedin.com/in/onkar-dhingra-61b3b91b5/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="Linkedin" title="Source Code" className="w-8 h-8 rounded-lg" />
                </a>

                <a href="mailto:onkardhingra99@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmail} alt="Email" title="Source Code" className="w-8 h-8 rounded-lg" />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
