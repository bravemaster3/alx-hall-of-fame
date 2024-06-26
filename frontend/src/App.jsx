import { useCallback, useState } from "react"
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material"
import ProjectCard from "./ProjectCard"
import Navbar from "./navbar/Navbar"
import axios from "axios"

import ProjectCategoryAdd from "./ProjectCategoryAdd"
import Filters from "./filters/Filters"
import ModalAddProject from "./newProject/ModalAddProject"
import Footer from "./footer/Footer"

const App = () => {
  const [activeTab, setActiveTab] = useState("All Projects")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("user"))[
      "is_authenticated"
    ]
    console.log("AUTH STATUS", isAuthenticated)
    if (isAuthenticated) {
      setIsModalOpen(true)
    } else {
      window.confirm("Login with Github to proceed")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onGithubLogoIconClick = useCallback(() => {
    // Please sync "All projects" to the project
  }, [])

  const onLoginClick = useCallback(() => {
    // Please sync "My projects" to the project
  }, [])

  const onFrameContainerClick = useCallback(() => {
    // Please sync "All projects" to the project
  }, [])

  return (
    <div className="m-0 w-full bg-white dark:bg-dark-white flex flex-col items-end justify-start box-border gap-[28px] leading-[normal] tracking-[normal]">
      <Navbar onLoginClick={onLoginClick} />
      <main className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[15px] box-border max-w-full shrink-0">
        <section className="w-[1112px] flex flex-col items-start justify-start gap-[56px] max-w-full mq750:gap-[28px]">
          <div className="self-stretch flex flex-col items-end justify-start gap-[30.5px] max-w-full mq750:gap-[15px]">
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[23px]">
              <h3 className="m-0 relative text-[20px] leading-[24px] font-normal font-inter text-black dark:text-dark-black text-center mq450:text-base mq450:leading-[19px]">
                Get inspired by Projects made by ALX learners and alumni
              </h3>
            </div>
            <ProjectCategoryAdd
              onFrameContainerClick={onFrameContainerClick}
              handleOpenModal={handleOpenModal}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <Filters activeTab={activeTab} />
          </div>
          <ModalAddProject open={isModalOpen} onClose={handleCloseModal} />
          <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[33px_29px] min-h-[933px] max-w-full">
            <ProjectCard image2="/src/assets/waterfall.png" />
            <ProjectCard image2="/src/assets/waterfall.png" />
            <ProjectCard image2="/src/assets/waterfall.png" />
            <ProjectCard image2="/src/assets/waterfall.png" />
            <ProjectCard image2="/src/assets/waterfall.png" />
            <ProjectCard image2="/src/assets/waterfall.png" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
