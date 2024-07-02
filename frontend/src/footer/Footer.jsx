import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai" // Importing GitHub and LinkedIn icons from react-icons
import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className="w-full bg-gainsboro dark:bg-dark-steelblue py-3 mt-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* First Row */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/bravemaster3/alx-hall-of-fame"
            target="blank"
          >
            <AiFillGithub
              className="text-gray-600 dark:text-dark-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              size={24}
            />
          </a>
          <a href="https://x.com/bravemaster3" target="blank">
            <FaXTwitter
              className="text-gray-600 dark:text-dark-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              size={24}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/koffi-dodji-noumonvi-8a578a89/"
            target="blank"
          >
            <AiFillLinkedin
              className="text-gray-600 dark:text-dark-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              size={24}
            />
          </a>
        </div>
        {/* Second Row */}
        <div className="text-sm text-gray-600 dark:text-dark-gray-400">
          © ALX Hall of Fame | All rights reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer
