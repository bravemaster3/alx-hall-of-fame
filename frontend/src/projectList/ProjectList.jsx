import React, { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import axios from "axios"
import { backendURL } from "../../constants"
import PropTypes from "prop-types"

export default function ProjectList({
  projects,
  onEdit,
  onDelete,
  githubUsername,
  activeTab,
}) {
  const handleTitleClick = (projectId, setComments) => {
    axios
      .get(`${backendURL}/api/projects/${projectId}/comments/`)
      .then((response) => {
        setComments(response.data)
      })
  }

  return (
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
            tags={project.tags.split(", ")}
            githubRepos={project.githubRepos}
            liveProject={project.liveProject}
            imgFile={project.imgFile}
            likesCount={project.total_likes}
            commentsCount={project.comments.length}
            onTitleClick={handleTitleClick}
            onEdit={onEdit}
            onDelete={onDelete}
            githubUsername={githubUsername}
            project={project}
            activeTab={activeTab}
          />
        ))
      )}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  // githubUsername: PropTypes.string.isRequired,
}
