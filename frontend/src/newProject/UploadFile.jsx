import React, { useState } from "react"
import { MdOutlineFileUpload } from "react-icons/md"

function UploadField({ idVal, onChange }) {
  const [fileName, setFileName] = useState("")

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setFileName(file.name)
    onChange(event)
  }

  return (
    <div className="flex items-center">
      <label className="flex items-center gap-2 cursor-pointer text-gray-300 dark:text-dark-gray-300">
        <MdOutlineFileUpload size={25} />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id={idVal}
        />
        {fileName ? "Uploaded image: " : "Upload a Project Image"}
      </label>
      {fileName && <span className="ml-2">{fileName}</span>}
    </div>
  )
}

export default UploadField
