// src/pages/Home.jsx
import { useState, useEffect } from "react"
import axios from "axios"
import ProjectCategoryAdd from "../filters/ProjectCategoryAdd"
import Filters from "../filters/Filters"
import ModalAddProject from "../newProject/ModalAddProject"
import ProjectList from "../projectList/ProjectList"
import { backendURL } from "../../constants"
import { handleAuth } from "../../utils"
import { Share } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("All Projects")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [githubUsername, setGithubUsername] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser).username : ""
  })
  const [editProject, setEditProject] = useState(null)

  const fetchProjects = (username = "") => {
    let url = `${backendURL}/api/projects/`
    if (username) {
      url = `${backendURL}/api/projects/user/${username}`
    }

    axios
      .get(url)
      .then((response) => {
        setProjects(response.data)
        setFilteredProjects(response.data)

        // console.log("ALL PROJECTS::::", response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error)
      })
  }

  useEffect(() => {
    if (
      activeTab === "My Projects" &&
      JSON.parse(localStorage.getItem("user"))?.is_authenticated
    ) {
      fetchProjects(githubUsername)
    } else if (
      activeTab === "My Projects" &&
      !JSON.parse(localStorage.getItem("user"))?.is_authenticated
    ) {
      const confirmed = window.confirm("Login with Github to proceed")
      if (!confirmed) {
        setActiveTab("All Projects")
        fetchProjects()
      } else {
        handleAuth()
      }
    } else {
      fetchProjects()
    }
  }, [activeTab, githubUsername])

  const handleOpenModal = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("user"))[
      "is_authenticated"
    ]
    if (isAuthenticated) {
      setIsModalOpen(true)
    } else {
      const confirmed = window.confirm("Login with Github to proceed")
      if (confirmed) {
        handleAuth()
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditProject(null)
  }

  const handleProjectAdded = (newProject) => {
    // setProjects((prevProjects) => [...prevProjects, newProject])
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject]
      setFilteredProjects(updatedProjects)
      return updatedProjects
    })
  }

  const handleProjectEdited = (updatedProject) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
      setFilteredProjects(updatedProjects)
      return updatedProjects
    })
  }

  const handleEdit = (project) => {
    setEditProject(project)
    setIsModalOpen(true)
  }

  const handleDelete = (projectId) => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token

    axios
      .delete(`${backendURL}/api/projects/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        )
        setFilteredProjects((prevFilteredProjects) =>
          prevFilteredProjects.filter((project) => project.id !== projectId)
        )
      })
      .catch((error) => {
        console.error("There was an error deleting the project!", error)
      })
  }
  // const handleFilter = ({ searchTerm, selectedCohort }) => {
  //   // console.log("selected cohort:", selectedCohort)
  //   const filtered = projects.filter((project) => {
  //     const matchesSearchTerm =
  //       project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.tags
  //         .split(",")
  //         .some((tag) =>
  //           tag.trim().toLowerCase().includes(searchTerm.toLowerCase())
  //         )

  //     const matchesCohort = selectedCohort
  //       ? project.user.cohort === selectedCohort
  //       : true

  //     return matchesSearchTerm && matchesCohort
  //   })
  //   setFilteredProjects(filtered)
  // }

  const handleFilter = ({ searchTerm, selectedCohort }) => {
    const filtered = projects.filter((project) => {
      const matchesSearchTerm =
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags
          .split(",")
          .some((tag) =>
            tag.trim().toLowerCase().includes(searchTerm.toLowerCase())
          )

      const matchesCohort =
        selectedCohort === "All"
          ? true
          : project.users.some((user) => user.cohort === selectedCohort)

      return matchesSearchTerm && matchesCohort
    })
    setFilteredProjects(filtered)
  }

  // return (
  //   <main className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[15px] box-border max-w-full shrink-0">
  //     <section className="w-[1480px] flex flex-col items-start justify-start gap-[35px] max-w-full mq750:gap-[15px]">
  //       <div className="self-stretch flex flex-col items-end justify-start gap-[30.5px] max-w-full mq750:gap-[15px]">
  //         <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[23px]">
  //           <h3 className="m-0 mt-8 relative text-[20px] leading-[24px] font-normal font-inter text-black dark:text-dark-black text-center mq450:text-base mq450:leading-[19px]">
  //             Get inspired by Projects made by ALX learners and alumni
  //           </h3>
  //         </div>
  //         <ProjectCategoryAdd
  //           handleOpenModal={handleOpenModal}
  //           setActiveTab={setActiveTab}
  //           activeTab={activeTab}
  //           githubUsername={githubUsername}
  //         />
  //         <Filters activeTab={activeTab} onFilter={handleFilter} />
  //       </div>
  //       <ModalAddProject
  //         open={isModalOpen}
  //         onClose={handleCloseModal}
  //         onProjectAdded={handleProjectAdded}
  //       />
  //       {activeTab === "My Projects" ? (
  //         <div
  //           className="w-full text-lgi flex justify-center cursor-pointer text-black dark:text-dark-black"
  //           onClick={() => navigate(`/portfolios/${githubUsername}`)}
  //         >
  //           <Share /> Share
  //         </div>
  //       ) : null}
  //       <ProjectList projects={filteredProjects} />
  //     </section>
  //   </main>
  // )

  return (
    <main className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[15px] box-border max-w-full shrink-0">
      <section className="w-[1480px] flex flex-col items-start justify-start gap-[35px] max-w-full mq750:gap-[15px]">
        <div className="self-stretch flex flex-col items-end justify-start gap-[30.5px] max-w-full mq750:gap-[15px]">
          <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[23px]">
            <h3 className="m-0 mt-8 relative text-[20px] leading-[24px] font-normal font-inter text-black dark:text-dark-black text-center mq450:text-base mq450:leading-[19px]">
              Get inspired by Projects made by ALX learners and alumni
            </h3>
          </div>
          <ProjectCategoryAdd
            handleOpenModal={handleOpenModal}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            githubUsername={githubUsername}
          />
          <Filters activeTab={activeTab} onFilter={handleFilter} />
        </div>
        <ModalAddProject
          open={isModalOpen}
          onClose={handleCloseModal}
          onProjectAdded={handleProjectAdded}
          onProjectEdited={handleProjectEdited}
          editProject={editProject}
          githubUsername={githubUsername}
        />
        {activeTab === "My Projects" ? (
          <div
            className="w-full text-lgi flex justify-center cursor-pointer text-black dark:text-dark-black"
            onClick={() => navigate(`/portfolios/${githubUsername}`)}
          >
            <Share /> Share
          </div>
        ) : null}
        <ProjectList
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          githubUsername={githubUsername}
          activeTab={activeTab}
        />
      </section>
    </main>
  )
}

export default Home
