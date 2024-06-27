import { useState } from "react"
import { TextField, Button } from "@mui/material"
import { FaPlusCircle } from "react-icons/fa"

export default function ProjectCategoryAdd({
  onFrameContainerClick,
  handleOpenModal,
  setActiveTab,
  activeTab,
  // fetchProjects,
  githubUsername,
}) {
  return (
    <div className="min-h-[41px] self-stretch flex flex-row flex-wrap items-center justify-center gap-[9.8px] min-w-[67%] max-w-full">
      {/* <div className="flex-1 rounded-md bg-gray-300 flex flex-row items-start justify-center py-1 px-[8.8px] box-border dark:border-white gap-[14.6px] min-w-[557px] max-w-full mq750:flex-wrap mq750:min-w-full"> */}

      <div className="flex-1 rounded-md bg-gray-300 flex flex-row items-start justify-center py-1 px-[8.8px] outline-b-[100px] gap-[14.6px] min-w-[557px] max-w-full mq750:flex-wrap mq750:min-w-full">
        <div
          className={`flex-1 rounded flex flex-row items-start justify-center py-1.5 box-border w-[50%] max-w-full min-h-[35px] cursor-pointer mq450:pl-5 mq450:pr-5 mq450:box-border ${
            activeTab === "All Projects" ? "bg-white" : "text-white bg-black"
          }`}
          onClick={() => {
            setActiveTab("All Projects")
            // fetchProjects()
            onFrameContainerClick()
          }}
        >
          All Projects
        </div>

        <div
          className={`flex-1 rounded flex flex-row items-start justify-center py-1.5 box-border w-[50%] max-w-full min-h-[35px] cursor-pointer mq450:pl-5 mq450:pr-5 mq450:box-border ${
            activeTab === "My Projects" ? "bg-white" : "text-white bg-black"
          }`}
          onClick={() => {
            setActiveTab("My Projects")
            // fetchProjects(githubUsername)
            onFrameContainerClick()
          }}
        >
          My Projects
        </div>
      </div>
      <button
        className=" max-w-full flex-shrink-0 h-[41px] px-4 border-[1px] border-black dark:border-none bg-white dark:bg-dark-steelblue dark:text-dark-black shadow-0px-1px-2px-rgba(0,0,0,0.05) rounded cursor-pointer flex items-center justify-center"
        onClick={handleOpenModal}
      >
        <FaPlusCircle className="mr-2" />
        <span>Add project</span>
      </button>
    </div>
  )
}
