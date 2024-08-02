import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Search } from "@mui/icons-material"

const GitHubRepoSearch = ({ username, onSelectRepo }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [showRepos, setShowRepos] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value)

    if (e.target.value.length >= 1) {
      setLoading(true)
      setShowRepos(true)
      try {
        let allRepos = []
        let page = 1
        let response

        // Loop to fetch all pages
        do {
          response = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
              params: {
                per_page: 100, // Maximum allowed by GitHub API
                page: page,
              },
            }
          )
          allRepos = allRepos.concat(response.data)
          page++
        } while (response.data.length === 100) // Continue if there are more repos

        let filtered_repos = allRepos.filter((repo) => {
          return repo.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRepos(filtered_repos)
      } catch (error) {
        console.error("Error fetching repositories:", error)
      } finally {
        setLoading(false)
      }
    } else {
      setRepos([])
      setShowRepos(false)
    }
  }

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo)
    onSelectRepo(repo) // Call the onSelectRepo prop function if needed
    setShowRepos(false)
    setSearchTerm("")
  }

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowRepos(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full h-[40px] pl-4 py-2 border-[1px] rounded-2xl box-border border-solid border-gainsboro-200 dark:border-dark-gainsboro-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-white dark:text-white transition duration-300 ease-in-out transform focus:scale-105"
          placeholder="Search GitHub Repos"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowRepos(true)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-black dark:text-dark-black" />
        </div>
        {loading && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3">
            <svg
              className="w-5 h-5 animate-spin text-white dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {showRepos && repos.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 right-0 z-10 max-h-52 overflow-y-auto bg-gray-100 dark:bg-dark-gray-300 border border-gray-300 rounded-md shadow-lg dark:border-gray-600"
        >
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleRepoSelect(repo)}
            >
              {repo.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GitHubRepoSearch
