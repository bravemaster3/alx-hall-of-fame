import ProjectCard from "./ProjectCard"
import React, { useEffect, useState } from "react"
import axios from "axios"

export default function ProjectList({ projects }) {
  // const [projects, setProjects] = useState([])

  // const fetchProjects = (username = "") => {
  //   let url = "http://localhost:8000/projects/"
  //   if (username) {
  //     url = `http://localhost:8000/projects/${username}`
  //   }

  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setProjects(response.data)
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the projects!", error)
  //     })
  // }

  // useEffect(() => {
  //   fetchProjects()
  // }, [activeTab])
  return (
    // <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[33px_29px] min-h-[933px] max-w-full">
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    //   <ProjectCard image2="/src/assets/waterfall.png" />
    // </div>
    <div className="project-list flex flex-wrap justify-center w-full gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.projectTitle}
          authors={project.authors}
          description={project.description}
          tags={project.tags.split(", ")} // Assuming tags are comma-separated
          githubRepos={project.githubRepos}
          liveProject={project.liveProject}
          imgFile={project.imgFile}
        />
      ))}
    </div>
  )
}
