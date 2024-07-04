import React, { useState } from "react"
import { Modal, TextField, Button, Box, IconButton } from "@mui/material"
import PropTypes from "prop-types"
import CloseIcon from "@mui/icons-material/Close"
import FormInput from "./FormInput"
import FormTextField from "./FormTextField"
import UploadField from "./UploadFile"
import axios from "axios"
import { backendURL } from "../../constants"

const ModalAddProject = ({ open, onClose, onProjectAdded, className = "" }) => {
  const initialFormState = {
    projectTitle: "",
    authors: "",
    description: "",
    tags: "",
    githubRepos: "",
    liveProject: "",
    imgFile: null,
  }

  const [formData, setFormData] = useState(initialFormState)

  const handleFormReset = () => {
    setFormData(initialFormState)
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imgFile: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const token = localStorage.getItem("token") // Assuming the JWT token is stored in localStorage
    const userInfo = JSON.parse(localStorage.getItem("user"))
    // console.log("USER DURING POST", userInfo)

    // const accessToken = userInfo.refresh
    const accessToken = userInfo.token
    // const accessToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MDYyMjgzLCJpYXQiOjE3MTkwNTg2MjEsImp0aSI6ImZhZDcxYjIwODIxMDRiYTk5M2U4NjEwYjJiMDhkNzJiIiwidXNlcl9pZCI6M30.Jeg26Mxfh9GNdJTfWNgm62n4jcU-gd7qguLbYfSqWTk"

    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }

    // Debugging: Log the contents of formDataToSend
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1])
    }
    console.log("JWT TOKEN", accessToken)
    try {
      const response = await axios.post(
        `${backendURL}/api/projects/create_with_token/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log("AFTER POST", response)
      console.log("RESPONSE STATUS", response.status)
      if (response.status === 201) {
        console.log("Project added successfully:", response.data)
        handleFormReset()
        console.log("NEW PROJECT", response.data)
        onProjectAdded(response.data)
        onClose() // Close the modal on successful submission
      } else {
        console.error("Failed to add project:", response.statusText)
      }
    } catch (error) {
      console.error("Error adding project:", error)
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-white border-2 border-black dark:border-dark-black shadow-24 p-4 max-w-[90%] max-h-[85%] overflow-auto">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="w-[1092px] max-w-full flex flex-row items-start justify-center py-10 px-5 box-border">
          <form
            className="m-0 w-[586px] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-white dark:bg-dark-white box-border border-black dark:border-dark-black flex flex-col items-start justify-start pt-[22px] pb-[25px] pr-[57px] pl-[58px] gap-[20px] max-w-full border-[1px] border-solid border-gainsboro-100 mq750:py-5 mq750:pr-7 mq750:pl-[29px] mq750:box-border"
            onSubmit={handleSubmit}
            // onReset={handleFormReset}
          >
            <h2 className="m-0 flex-1 relative text-5xl tracking-[-0.6px] leading-[24px] font-normal font-inter text-gray-300 dark:text-dark-gray-300 text-left inline-block max-w-full shrink-0 mq450:text-lgi mq450:leading-[19px]">
              Add New Project
            </h2>
            <FormInput
              labelVal="Project title"
              idVal="projectTitle"
              placeholderVal="Enter project title"
              value={formData.projectTitle}
              onChange={handleInputChange}
            />
            <FormInput
              labelVal="Authors"
              idVal="authors"
              placeholderVal="Author names"
              value={formData.authors}
              onChange={handleInputChange}
            />
            <FormTextField
              labelVal="Short description"
              idVal="description"
              placeholderVal="Add project description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <FormInput
              labelVal="Tags"
              idVal="tags"
              placeholderVal="Add tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
            <FormInput
              labelVal="GitHub Repository"
              idVal="githubRepos"
              placeholderVal="GitHub repo link"
              value={formData.githubRepos}
              onChange={handleInputChange}
            />
            <FormInput
              labelVal="Live Project Link"
              idVal="liveProject"
              placeholderVal="Live project URL"
              value={formData.liveProject}
              onChange={handleInputChange}
            />
            <UploadField idVal={"imgFile"} onChange={handleFileChange} />

            <Button
              className="self-stretch h-10 mq450:pl-5 mq450:pr-5 mq450:box-border"
              disableElevation={true}
              variant="contained"
              type="submit"
            >
              Submit Project
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  )
}

ModalAddProject.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default ModalAddProject
