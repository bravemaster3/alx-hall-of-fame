// import ProjectCard from "./ProjectCard"
// import React, { useEffect, useState } from "react"
// import axios from "axios"

// export default function ProjectList({ projects }) {
//   // const [projects, setProjects] = useState([])

//   // const fetchProjects = (username = "") => {
//   //   let url = "http://localhost:8000/projects/"
//   //   if (username) {
//   //     url = `http://localhost:8000/projects/${username}`
//   //   }

//   //   axios
//   //     .get(url)
//   //     .then((response) => {
//   //       setProjects(response.data)
//   //     })
//   //     .catch((error) => {
//   //       console.error("There was an error fetching the projects!", error)
//   //     })
//   // }

//   // useEffect(() => {
//   //   fetchProjects()
//   // }, [activeTab])
//   return (
//     // <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[33px_29px] min-h-[933px] max-w-full">
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     //   <ProjectCard image2="/src/assets/waterfall.png" />
//     // </div>
//     <div className="project-list flex flex-wrap justify-center w-full gap-[25px]">
//       {projects.map((project) => (
//         <ProjectCard
//           key={project.id}
//           title={project.projectTitle}
//           authors={project.authors}
//           description={project.description}
//           tags={project.tags.split(", ")} // Assuming tags are comma-separated
//           githubRepos={project.githubRepos}
//           liveProject={project.liveProject}
//           imgFile={project.imgFile}
//         />
//       ))}
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import axios from "axios"
import { backendURL } from "../../constants"

export default function ProjectList({ projects }) {
  const handleTitleClick = (projectId, setComments) => {
    axios
      .get(`${backendURL}/api/projects/${projectId}/comments/`)
      .then((response) => {
        setComments(response.data)
      })
  }

  return (
    // <div className="project-list flex flex-wrap justify-center w-full gap-[25px]">
    //   {projects.map((project) => (
    //     <ProjectCard
    //       key={project.id}
    //       id={project.id}
    //       title={project.projectTitle}
    //       authors={project.authors}
    //       description={project.description}
    //       tags={project.tags.split(", ")} // Assuming tags are comma-separated
    //       githubRepos={project.githubRepos}
    //       liveProject={project.liveProject}
    //       imgFile={project.imgFile}
    //       likesCount={project.total_likes}
    //       commentsCount={project.comments.length}
    //       onTitleClick={handleTitleClick}
    //     />
    //   ))}
    // </div>
    <div className="project-list flex flex-wrap justify-center w-full gap-[25px]">
      {projects.length === 0 ? (
        <p className="text-black dark:text-dark-black">
          Sorry, no projects to show!
        </p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.projectTitle}
            authors={project.authors}
            description={project.description}
            tags={project.tags.split(", ")} // Assuming tags are comma-separated
            githubRepos={project.githubRepos}
            liveProject={project.liveProject}
            imgFile={project.imgFile}
            likesCount={project.total_likes}
            commentsCount={project.comments.length}
            onTitleClick={handleTitleClick}
          />
        ))
      )}
    </div>
  )
}
