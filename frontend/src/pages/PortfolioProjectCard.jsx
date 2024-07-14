import React from "react"
import {
  GitHub,
  Link as LinkIcon,
  Favorite,
  Comment,
} from "@mui/icons-material"
import { FaGithub, FaLink } from "react-icons/fa"

const PortfolioProjectCard = ({
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
  return (
    <div className=" flex border-2 border-gray-500 p-3 w-full shadow-lg mb-2 rounded-3xs bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center flex-row w-full mq450:flex-wrap">
        {/* <div className="flex flex-col lg:flex-row lg:items-start mb-4"> */}{" "}
        <img
          src={imgFile}
          alt={title}
          // className="w-32 h-32 object-cover mr-4"
          className="h-[150px] w-[330px] max-w-[100%] object-cover mr-4 rounded-3xs"
        />
        <div className="flex flex-col">
          <h3
            className="text-2xl font-semibold mb-1 cursor-pointer text-black dark:text-dark-black"
            onClick={onTitleClick}
          >
            {title}
          </h3>
          <p className="text-gray-700 mb-1 dark:text-dark-black">
            {description}
          </p>
          {/* <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div> */}
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
          {/* <div className="text-sm text-gray-600">`Authors: {authors}`</div> */}
          <div className="flex gap-4 ">
            {githubRepos && (
              <a
                href={githubRepos}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-dark-steelblue"
              >
                <FaGithub />
              </a>
            )}

            {liveProject && (
              <a
                href={liveProject}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-dark-steelblue"
              >
                <FaLink />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioProjectCard
