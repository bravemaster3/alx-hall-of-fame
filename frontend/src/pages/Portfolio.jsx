import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import {
  Typography,
  Container,
  Divider,
  Box,
  Link as MuiLink,
  Avatar,
} from "@mui/material"
import { GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material"
import PortfolioProjectCard from "./PortfolioProjectCard"
import { backendURL } from "../../constants"
// import { FaGithub, FaGithubAlt } from "react-icons/fa"
// import { FaSquareGithub } from "react-icons/fa6"

const Portfolio = () => {
  const { github_username } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/users/github/${github_username}`
        )
        setUserProfile(response.data)
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/projects/user/${github_username}`
        )
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchUserProfile()
    fetchProjects()
  }, [github_username])

  if (!userProfile) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div className="max-w-full flex flex-col justify-center items-center px-5 mql750:px-20">
      {/* <Box className="flex items-center mb-8"> */}
      <img
        src="../../src/assets/logo.png"
        alt="ALX Hall of Fame"
        className="w-[100px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   marginBottom: 20,
        //   width: "100%",
        // }}
        className="flex items-center mb-5 max-w-[1000px]"
      >
        {/* </div> */}
        <Avatar
          src={userProfile.avatar}
          alt={userProfile.full_name}
          style={{ width: 80, height: 80, marginRight: 20 }}
        />
        <div>
          <h2 className="text-black dark:text-dark-black">
            {userProfile.full_name}'s portfolio
          </h2>
          <p className="text-black dark:text-dark-black">
            {userProfile.bio || ""}
          </p>
        </div>
      </div>
      <Divider className="mb-8 w-full bg-gray-300 dark:bg-dark-gray-300" />
      {/* <div className="p-5 text-center w-full">
        <h1 className="text-3xl font-bold mb-8">
          {github_username}'s Portfolio
        </h1> */}
      <div className="flex flex-wrap pt-5 pb-5 gap-5 justify-center w-full">
        {projects.map((project) => (
          <PortfolioProjectCard
            key={project.id}
            id={project.id}
            title={project.projectTitle}
            authors={project.authors}
            description={project.description}
            tags={project.tags.split(", ")}
            githubRepos={project.githubRepos}
            liveProject={project.liveProject}
            imgFile={project.imgFile}
            likesCount={project.likesCount}
            commentsCount={project.commentsCount}
            onTitleClick={() => {}}
          />
        ))}
      </div>
      {/* </div> */}
      <Divider className="my-8 w-full  bg-gray-300 dark:bg-dark-gray-300" />
      <Box className="flex justify-center gap-4 mt-8">
        {userProfile.username && (
          <MuiLink
            href={`https://github.com/${userProfile.username}`}
            target="_blank"
            className="text-gray-600"
          >
            <GitHub fontSize="large" />
          </MuiLink>
        )}
        {userProfile.facebook && (
          <MuiLink href={userProfile.facebook} target="_blank">
            <Facebook fontSize="large" />
          </MuiLink>
        )}
        {userProfile.twitter && (
          <MuiLink href={userProfile.twitter} target="_blank">
            <Twitter fontSize="large" />
          </MuiLink>
        )}
        {userProfile.linkedin && (
          <MuiLink href={userProfile.linkedin} target="_blank">
            <LinkedIn fontSize="large" />
          </MuiLink>
        )}
      </Box>
    </div>
  )
}

export default Portfolio