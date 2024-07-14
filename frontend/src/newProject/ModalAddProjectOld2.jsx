// src/newProject/ModalAddProject.jsx
import React, { useState, useEffect } from "react"
import { Modal, TextField, Button, Box, IconButton } from "@mui/material"
import PropTypes from "prop-types"
import CloseIcon from "@mui/icons-material/Close"
import FormInput from "./FormInput"
import FormTextField from "./FormTextField"
import UploadField from "./UploadFile"
import axios from "axios"
import { backendURL } from "../../constants"

const ModalAddProject = ({
  open,
  onClose,
  onProjectAdded,
  onProjectEdited,
  editProject,
}) => {
  const [projectTitle, setProjectTitle] = useState("")
  const [description, setDescription] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [repoLink, setRepoLink] = useState("")
  const [tags, setTags] = useState("")
  const [mediaFiles, setMediaFiles] = useState([])
  const [cohort, setCohort] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editProject) {
      setProjectTitle(editProject.projectTitle)
      setDescription(editProject.description)
      setProjectLink(editProject.projectLink)
      setRepoLink(editProject.repoLink)
      setTags(editProject.tags)
      setMediaFiles(editProject.mediaFiles)
      setCohort(editProject.cohort)
    } else {
      setProjectTitle("")
      setDescription("")
      setProjectLink("")
      setRepoLink("")
      setTags("")
      setMediaFiles([])
      setCohort("")
    }
  }, [editProject])

  const handleSubmit = (event) => {
    event.preventDefault()

    const userInfo = JSON.parse(localStorage.getItem("user"))
    const accessToken = userInfo.token

    const projectData = {
      projectTitle,
      authors,
      description,
      // projectLink,
      // repoLink,
      tags,
      githubRepos,
      liveProject,
      imgFile,
      // cohort,
    }

    setLoading(true)

    if (editProject) {
      axios
        .put(`${backendURL}/api/projects/${editProject.id}/`, projectData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          onProjectEdited(response.data)
          setLoading(false)
          onClose()
        })
        .catch((error) => {
          console.error("There was an error updating the project!", error)
          setLoading(false)
        })
    } else {
      axios
        .post(`${backendURL}/api/projects/`, projectData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          onProjectAdded(response.data)
          setLoading(false)
          onClose()
        })
        .catch((error) => {
          console.error("There was an error creating the project!", error)
          setLoading(false)
        })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        className="bg-white dark:bg-dark-bg-primary flex flex-col gap-4 p-4 shadow-lg rounded"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        onSubmit={handleSubmit}
      >
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <h2>{editProject ? "Edit Project" : "Add Project"}</h2>
        <TextField
          label="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
        />
        <TextField
          label="Github Repository"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Repository Link"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          fullWidth
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <UploadField mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
        {/* <TextField
          label="Cohort"
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
          fullWidth
        /> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {editProject ? "Save Changes" : "Add Project"}
        </Button>
      </Box>
    </Modal>
  )
}

ModalAddProject.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProjectAdded: PropTypes.func.isRequired,
  onProjectEdited: PropTypes.func.isRequired,
  editProject: PropTypes.object,
}

export default ModalAddProject
