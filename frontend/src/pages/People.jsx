// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { backendURL } from "../../constants"
// import { Box, Modal } from "@mui/material"
// import UserProfile from "./UserProfile"

// export default function People() {
//   const [users, setUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios
//       .get(`${backendURL}/users`)
//       .then((response) => {
//         setUsers(response.data)
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the users!", error)
//       })
//   }, [])

//   const handlePortfolioClick = (username) => {
//     navigate(`/portfolios/${username}`)
//   }

//   const handleOpenUserProfileModal = (selectedUser) => {
//     if (selectedUser) {
//       setSelectedUser(selectedUser)
//       setIsUserProfileModalOpen(true)
//     }
//   }

//   const handleCloseUserProfileModal = () => {
//     setIsUserProfileModalOpen(false)
//     setSelectedUser(null)
//   }

//   return (
//     <div>
//       <h1>Users List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username}
//             <button onClick={() => handleOpenUserProfileModal(user)}>
//               Profile
//             </button>
//             <button onClick={() => handlePortfolioClick(user.username)}>
//               Portfolio
//             </button>
//           </li>
//         ))}
//       </ul>

//       <Modal
//         open={isUserProfileModalOpen}
//         onClose={handleCloseUserProfileModal}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 600,
//             bgcolor: "grey",
//             boxShadow: 24,
//             p: 2,
//           }}
//         >
//           {selectedUser && (
//             <UserProfile userProfile={selectedUser} editable={false} />
//           )}
//         </Box>
//       </Modal>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL } from "../../constants"
import { Box, Modal, IconButton } from "@mui/material"
import { GitHub, Facebook, Twitter, LinkedIn, Close } from "@mui/icons-material"
import UserProfile from "./UserProfile"
import SimpleSelect from "../filters/SimpleSelect"

export default function People() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCohort, setSelectedCohort] = useState("All")
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${backendURL}/api/users`)
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error)
      })
  }, [])

  const handlePortfolioClick = (username) => {
    navigate(`/portfolios/${username}`)
  }

  const handleOpenUserProfileModal = (selectedUser) => {
    if (selectedUser) {
      setSelectedUser(selectedUser)
      setIsUserProfileModalOpen(true)
    }
  }

  const handleCloseUserProfileModal = () => {
    setIsUserProfileModalOpen(false)
    setSelectedUser(null)
  }

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase()
    return (
      (user.username.toLowerCase().includes(term) ||
        user.full_name.toLowerCase().includes(term) ||
        user.location.toLowerCase().includes(term)) &&
      (selectedCohort === "All" || user.cohort === selectedCohort)
    )
  })

  return (
    <div className="p-2 bg-gray-100 dark:bg-dark-white min-h-screen max-w-[1480px">
      <div className="max-w-[1480px] mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Find a developer
        </h1>

        <div className="flex justify-center items-center mb-6 gap-3 w-full">
          <select
            className="px-4 py-2 h-[40px] border rounded-lg  w-1/3"
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
          >
            <option value="All">All Cohorts</option>
            {[...new Set(users.map((user) => user.cohort))].map((cohort) => (
              <option key={cohort} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>

          {/* <SimpleSelect
          selectedCohort={selectedCohort}
          handleCohortChange={(e) => setSelectedCohort(e.target.value)}
        /> */}

          <input
            type="text"
            placeholder="Search by username, full name, or location"
            className="px-4 py-2 h-5 border rounded-lg w-2/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800"
            >
              <div className="flex items-center mb-4">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  alt={user.username}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {user.full_name || user.username}
                  </h2>
                  <p className="text-gray-700 dark:text-dark-gray-300">
                    {user.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-dark-gray-300 mb-4">
                {user.bio}
              </p>
              <div className="flex w-full justify-between items-center flex-wrap">
                <div className="flex space-x-4">
                  {user.github && (
                    <a
                      href={`https://github.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHub className="text-gray-900 dark:text-white" />
                    </a>
                  )}
                  {user.facebook && (
                    <a
                      href={user.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="text-gray-900 dark:text-white" />
                    </a>
                  )}
                  {user.twitter && (
                    <a
                      href={user.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="text-gray-900 dark:text-white" />
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn className="text-gray-900 dark:text-white" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleOpenUserProfileModal(user)}
                  >
                    Profile
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handlePortfolioClick(user.username)}
                  >
                    Portfolio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          open={isUserProfileModalOpen}
          onClose={handleCloseUserProfileModal}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              bgcolor: "white",
              boxShadow: 24,
              p: 2,
            }}
          >
            {/* <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={handleCloseUserProfileModal}
            >
              <Close />
            </IconButton> */}
            {selectedUser && (
              <UserProfile
                userProfile={selectedUser}
                editable={false}
                onCloseClick={handleCloseUserProfileModal}
              />
            )}
          </Box>
        </Modal>
      </div>
    </div>
  )
}
