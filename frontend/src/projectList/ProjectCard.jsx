import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  FaGithub,
  FaExternalLinkAlt,
  // FaComment,
  FaEdit,
  FaTrash,
  FaComment,
} from "react-icons/fa"
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material"
import axios from "axios"
import { backendURL } from "../../constants"
import ProjectAuthorAvatar from "./ProjectAuthorAvatar"
import UserProfile from "../pages/UserProfile"
import { FaStar } from "react-icons/fa6"
import {
  Close,
  Comment,
  Delete,
  Edit,
  Favorite,
  Star,
} from "@mui/icons-material"

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
  onEdit,
  onDelete,
  githubUsername,
  project,
  activeTab,
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
        // Sort comments by created_at in descending order
        const sortedComments = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        setComments(sortedComments)
        // setComments(response.data)
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
      const response = await axios.get(
        `${backendURL}/api/users/github/${username}`
      )
      setSelectedUserProfile(response.data)
      // console.log(response.data)
      setIsUserProfileModalOpen(true)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const handleCloseUserProfileModal = () => {
    setIsUserProfileModalOpen(false)
    setSelectedUserProfile(null)
  }

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
  // console.log("AUTHORS", authors)
  const authorUsernames = authors.split(",").map((username) => username.trim())

  return (
    <>
      <div className="w-[350px] rounded-3xs box-border flex flex-col items-end justify-start pt-[22px] pb-4 pr-[23px] pl-[21px] gap-[14px] min-w-[332px] max-w-full text-left text-sm text-gray-400 dark:text-dark-gray-400 font-inter border-[1px] border-solid border-gainsboro dark:border-dark-gainsboro">
        {/* <div> */}
        <img
          className="self-stretch h-40 relative rounded-3xs max-w-full overflow-hidden shrink-0 object-cover cursor-pointer"
          loading="lazy"
          alt={title}
          src={imgFile}
          onClick={handleOpenModal}
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-[1px]">
          <div className="self-stretch min-h-[30px] flex flex-col items-start justify-start px-0 pb-px box-border gap-[2px] text-5xl">
            <h2
              className="ml-[-2.2000000000000455px] m-0 self-stretch relative text-inherit dark:text-dark-black tracking-[-0.6px] font-normal font-inherit shrink-0 cursor-pointer line-clamp-2 "
              onClick={handleOpenModal}
            >
              {title}
            </h2>
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
              className="text-gray-300 dark:text-dark-gray-300 relative leading-[20px] whitespace-pre-wrap min-w-[113px] flex items-center gap-1"
            >
              <FaGithub /> View on GitHub
            </a>
            {liveProject && (
              <a
                href={liveProject}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-dark-gray-300 w-[90px] relative leading-[20px] text-right shrink-0 flex items-center gap-1"
              >
                <FaExternalLinkAlt /> Live Project
              </a>
            )}
          </div>
          <div className="self-stretch flex flex-row items-center justify-between pt-2">
            <div className="flex items-center">
              {/* <FaThumbsUp
                className="mr-2"
                onClick={handleLike}
                title="Number of likes"
              />{" "} */}
              <Favorite
                className=" mr-2 text-red-500 cursor-pointer"
                onClick={handleLike}
                titleAccess="Number of likes"
              />{" "}
              {likes}
            </div>
            <div className="flex items-center">
              <Star
                className="mr-2 text-[#d4af37]"
                titleAccess="Github stargazers"
              />{" "}
              {stars}
            </div>
            <div className="flex items-center">
              <Comment
                className="text-gray-600 mr-2 cursor-pointer"
                onClick={handleOpenModal}
                titleAccess="Number of comments"
              />{" "}
              {commentsCount}
              {/* <FaComment
                className="mr-2"
                onClick={handleOpenModal}
                title="Number of comments"
              />{" "}
              {comments.length} */}
            </div>
          </div>
        </div>
        {/* </div> */}
        {project.user?.username.toLowerCase() ===
          githubUsername?.toLowerCase() &&
          activeTab === "My Projects" && (
            <div className="flex w-full justify-between mt-auto">
              <Button onClick={() => onEdit(project)}>Edit</Button>
              <Button
                onClick={() => {
                  const confirmed = window.confirm(
                    "This project will be deleted forever. Proceed?"
                  )
                  if (confirmed) {
                    onDelete(project.id)
                  }
                }}
              >
                <span className="text-red-600">Delete</span>
              </Button>
            </div>
          )}
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box className=" w-[800px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-white border-2 border-black dark:border-dark-black shadow-24 p-4 max-w-[90%] max-h-[85%] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-300">
          <IconButton
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-700 dark:text-gray-50"
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            gutterBottom
            className="text-black dark:text-dark-black"
          >
            Project title: {title}
          </Typography>
          <img
            src={imgFile}
            alt={title}
            className="self-stretch h-[300px] relative rounded-3xs w-full overflow-hidden shrink-0 object-cover cursor-pointer"

            // className="w-full rounded"
          />
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
            {/* <FaThumbsUp className="mr-2" onClick={handleLike} /> {likes} */}
            <Favorite
              className=" mr-2 text-red-500 cursor-pointer"
              onClick={handleLike}
              titleAccess="Number of likes"
            />{" "}
            {likes}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            className="text-gray-300 dark:text-dark-gray-300"
          >
            {/* <FaComment className="mr-2" /> */}
            <Comment
              className="text-gray-600 mr-2"
              titleAccess="Number of comments"
            />{" "}
            {comments.length}
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
                  <strong>
                    {comment.user.full_name || comment.user.username}
                  </strong>{" "}
                  {`[${format(new Date(comment.created_at), "PPPpp")}]`}{" "}
                  {`: ${comment.content}`}
                </Typography>
                {localStorage.getItem("user") &&
                  comment.user.username ===
                    JSON.parse(localStorage.getItem("user")).username && (
                    <div className="flex gap-2 w-full justify-end">
                      <Edit
                        titleAccess="Edit comment"
                        className="mr-2 text-gray-500 cursor-pointer"
                        onClick={() =>
                          handleEditComment(comment.id, comment.content)
                        }
                      />
                      <Delete
                        titleAccess="Delete comment"
                        className="mr-2 text-red-500 cursor-pointer"
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                      {/* <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleEditComment(comment.id, comment.content)
                        }
                      >
                        <FaEdit /> Edit
                      </Button> */}
                      {/* <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <FaTrash /> Delete
                      </Button> */}
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
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px", // Replacing theme.spacing(4)
            borderRadius: "8px", // Replacing theme.spacing(1)
            minHeight: `calc(100vh - 60px - 54px)`, // Simplified height calculation
            boxSizing: "border-box",
            boxShadow: "24px",
            outline: "None",
          }}
        >
          <Box
            sx={{
              border: `10px solid #9e9e9e`, // Replacing theme.palette.grey[500]
            }}
          >
            {selectedUserProfile && (
              <UserProfile
                userProfile={selectedUserProfile}
                editable={false}
                onCloseClick={handleCloseUserProfileModal}
              />
            )}
          </Box>
        </Container>
      </Modal>
    </>
  )
}

export default ProjectCard
