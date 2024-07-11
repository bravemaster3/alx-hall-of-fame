import React, { useState, useEffect } from "react"
import {
  FaGithub,
  FaExternalLinkAlt,
  FaThumbsUp,
  FaComment,
  FaEdit,
  FaTrash,
} from "react-icons/fa"
import { Box, Modal, Typography, Button } from "@mui/material"
import axios from "axios"
import { backendURL } from "../../constants"
import ProjectAuthorAvatar from "./ProjectAuthorAvatar"
import UserProfile from "../pages/UserProfile"
import { FaStar } from "react-icons/fa6"

const ProjectCard = ({
  id,
  title,
  authors,
  description,
  tags,
  githubRepos,
  liveProject,
  imgFile,
  likesCount,
  commentsCount,
  onTitleClick,
}) => {
  const starsCache = {}
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [likes, setLikes] = useState(likesCount) // State for likes count
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
  const [selectedUserProfile, setSelectedUserProfile] = useState(null)
  const [stars, setStars] = useState(0)

  useEffect(() => {
    if (isModalOpen) {
      fetchComments()
    }
  }, [isModalOpen])

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/projects/${id}/comments/`
      )
      if (Array.isArray(response.data)) {
        setComments(response.data)
      } else {
        console.error("Unexpected data format:", response.data)
        setComments([])
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      setComments([])
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token
    try {
      const response = await axios.post(
        `${backendURL}/api/projects/${id}/comments/`,
        { content: newComment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setComments([...comments, response.data])
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId)
    setEditContent(content)
  }

  const handleUpdateComment = async (e) => {
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token
    try {
      await axios.put(
        `${backendURL}/api/projects/${id}/comments/${editingCommentId}/`,
        { content: editContent },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: editContent }
            : comment
        )
      )
      setEditingCommentId(null)
      setEditContent("")
    } catch (error) {
      console.error("Error updating comment:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token
    try {
      await axios.delete(
        `${backendURL}/api/projects/${id}/comments/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setComments(comments.filter((comment) => comment.id !== commentId))
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  const handleLike = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token
    try {
      const response = await axios.post(
        `${backendURL}/api/projects/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setLikes(response.data.likes_count)
    } catch (error) {
      console.error("Error liking the project:", error)
    }
  }

  const handleOpenUserProfileModal = async (username) => {
    try {
      const response = await axios.get(`${backendURL}/users/github/${username}`)
      setSelectedUserProfile(response.data)
      console.log(response.data)
      setIsUserProfileModalOpen(true)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const handleCloseUserProfileModal = () => {
    setIsUserProfileModalOpen(false)
    setSelectedUserProfile(null)
  }

  // useEffect(() => {
  //   if (githubRepos) {
  //     fetchGithubStars()
  //   }
  // }, [githubRepos])

  // const fetchGithubStars = async () => {
  //   try {
  //     const repoName = githubRepos.split("/").pop()
  //     const owner = githubRepos.split("/")[3]
  //     const response = await axios.get(
  //       `https://api.github.com/repos/${owner}/${repoName}`
  //     )
  //     setStars(response.data.stargazers_count)
  //   } catch (error) {
  //     console.error("Error fetching GitHub stars:", error)
  //   }
  // }

  useEffect(() => {
    if (githubRepos && !starsCache[githubRepos]) {
      fetchGithubStars()
    } else if (githubRepos) {
      setStars(starsCache[githubRepos])
    }
  }, [githubRepos])

  const fetchGithubStars = async () => {
    try {
      const repoName = githubRepos.split("/").pop()
      const owner = githubRepos.split("/")[3]

      // Check cache first
      if (starsCache[githubRepos]) {
        setStars(starsCache[githubRepos])
        return
      }

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repoName}`
      )
      const starCount = response.data.stargazers_count

      // Save result to cache
      starsCache[githubRepos] = starCount
      setStars(starCount)
    } catch (error) {
      console.error("Error fetching GitHub stars:", error)
    }
  }

  // Split the authors string into an array
  const authorUsernames = authors.split(",").map((username) => username.trim())

  return (
    <>
      <div className="w-[350px] rounded-3xs box-border flex flex-col items-end justify-start pt-[22px] pb-4 pr-[23px] pl-[21px] gap-[14px] min-w-[332px] max-w-full text-left text-sm text-gray-400 dark:text-dark-gray-400 font-inter border-[1px] border-solid border-gainsboro dark:border-dark-gainsboro">
        <img
          className="self-stretch h-40 relative rounded-3xs max-w-full overflow-hidden shrink-0 object-cover cursor-pointer"
          loading="lazy"
          alt={title}
          src={imgFile}
          onClick={handleOpenModal}
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-[1px]">
          <div className="self-stretch h-[30px] flex flex-col items-start justify-start px-0 pb-px box-border gap-[2px] text-5xl">
            <h2
              className="ml-[-2.2000000000000455px] m-0 self-stretch relative text-inherit dark:text-dark-black tracking-[-0.6px] font-normal font-inherit shrink-0 cursor-pointer"
              onClick={handleOpenModal}
            >
              {title}
            </h2>
            {/* <div className="ml-[-1px] w-[309.1px] relative text-xs tracking-[-0.6px] leading-[21px] inline-block shrink-0">
              By: {authors}
            </div> */}
          </div>
          <div className="ml-[-1px] w-full relative text-xs tracking-[-0.6px] shrink-0 flex flex-wrap items-center gap-2 text-gray-300 dark:text-dark-gray-300 text-center">
            By:
            {authorUsernames.map((username) => (
              <ProjectAuthorAvatar
                key={username}
                username={username}
                onClick={() => handleOpenUserProfileModal(username.trim())}
              />
            ))}
          </div>
          <div className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1 text-dimgray dark:text-dark-dimgray">
            <div className="ml-[-2px] flex-1 relative leading-[20px] shrink-0">
              <p className="m-0 line-clamp-3">{description}</p>
            </div>
          </div>
          <div className="w-full self-stretch rounded-md flex flex-row items-start justify-left py-0 px-px gap-[20px] gap-y-2 text-3xs text-black dark:text-dark-black flex-wrap">
            <p>Tags:</p>
            {tags.map((tag, index) => (
              <div key={index} className="text-3xs text-white">
                <p className="h-[15px] rounded-3xs bg-steelblue dark:bg-dark-steelblue flex items-start justify-start py-0 px-2.5">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <div className="self-stretch rounded-md flex flex-row items-start justify-between py-2.5 pr-[9px] pl-0.5 gap-[20px] text-gray-200 dark:text-white mq450:flex-wrap">
            <a
              href={githubRepos}
              target="_blank"
              rel="noopener noreferrer"
              className="relative leading-[20px] whitespace-pre-wrap min-w-[113px] flex items-center gap-1"
            >
              <FaGithub /> View on GitHub
            </a>
            <a
              href={liveProject}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[90px] relative leading-[20px] text-right shrink-0 flex items-center gap-1"
            >
              <FaExternalLinkAlt /> Live Project
            </a>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between pt-2">
            <div className="flex items-center">
              <FaThumbsUp
                className="mr-2"
                onClick={handleLike}
                title="Number of likes"
              />{" "}
              {likes}
            </div>
            <div className="flex items-center">
              <FaStar className="mr-2" title="Github stargazers" /> {stars}
            </div>
            <div className="flex items-center">
              <FaComment
                className="mr-2"
                onClick={handleOpenModal}
                title="Number of comments"
              />{" "}
              {comments.length}
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box className=" w-[800px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-white border-2 border-black dark:border-dark-black shadow-24 p-4 max-w-[90%] max-h-[85%] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-300">
          <Typography
            variant="h6"
            gutterBottom
            className="text-black dark:text-dark-black"
          >
            Project Title: {title}
          </Typography>
          <img src={imgFile} alt={title} className="w-full rounded" />
          <Typography
            variant="body1"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            {description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-gray-300 dark:text-dark-gray-300"
          >
            Tags: {tags.join(", ")}
          </Typography>
          {/* <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            By: {authors}
          </Typography> */}
          <div className="flex flex-wrap gap-2 mt-4 text-gray-300 dark:text-dark-gray-300 text-center">
            By
            {authorUsernames.map((username) => (
              <ProjectAuthorAvatar
                key={username}
                username={username}
                onClick={() => handleOpenUserProfileModal(username.trim())}
              />
            ))}
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            <FaThumbsUp className="mr-2" onClick={handleLike} /> {likes}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            <FaComment className="mr-2" /> {comments.length}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            Comments
          </Typography>
          {comments && Array.isArray(comments) ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 mb-2 bg-gainsboro rounded">
                <Typography
                  variant="body2"
                  className="text-gray-300 dark:text-dark-gray-300"
                >
                  {comment.user.username}: {comment.content}
                </Typography>
                {localStorage.getItem("user") &&
                  comment.user.username ===
                    JSON.parse(localStorage.getItem("user")).username && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleEditComment(comment.id, comment.content)
                        }
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <Typography
              variant="body2"
              className="text-gray-300 dark:text-dark-gray-300"
            >
              No comments available
            </Typography>
          )}
          {localStorage.getItem("user") && (
            <form
              onSubmit={
                editingCommentId ? handleUpdateComment : handleAddComment
              }
              className="w-full"
            >
              <label
                className="block text-gray-300 dark:text-dark-gray-300 mb-2"
                htmlFor="comment"
              >
                {editingCommentId ? "Edit comment" : "Add a comment"}
              </label>
              <textarea
                id="comment"
                type="text"
                value={editingCommentId ? editContent : newComment}
                onChange={(e) =>
                  editingCommentId
                    ? setEditContent(e.target.value)
                    : handleCommentChange(e)
                }
                className="w-full h-10 p-2 mb-4 pr-[2px] border border-gray-300 dark:border-dark-gray-300 rounded bg-white dark:bg-dark-white text-gray-300 dark:text-dark-gray-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="submit"
                className="max-w-full flex-shrink-0 h-[41px] px-4 border-[1px] border-black dark:border-none bg-white dark:bg-dark-steelblue dark:text-dark-black shadow-0px-1px-2px-rgba(0,0,0,0.05) rounded cursor-pointer flex items-center justify-center"
              >
                {editingCommentId ? "Update" : "Submit"}
              </button>
            </form>
          )}
        </Box>
      </Modal>

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
            width: 600,
            bgcolor: "grey",
            boxShadow: 24,
            p: 2,
          }}
        >
          {selectedUserProfile && (
            <UserProfile userProfile={selectedUserProfile} editable={false} />
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ProjectCard
