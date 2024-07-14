import React, { useState } from "react"
import { MdOutlineFileUpload } from "react-icons/md"
import PropTypes from "prop-types"

function UploadField({ idVal, onChange, required }) {
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const maxSize = 1 * 1024 * 1024 // 1 MB in bytes

    if (file.size > maxSize) {
      setError("File size exceeds 1 MB. Please upload a smaller file.")
      setFileName("")
      onChange({ target: { id: idVal, files: [] } }) // Clear the file in the parent component
    } else {
      setError("")
      setFileName(file.name)
      onChange(event)
    }
  }

  return (
    <div className="flex flex-col items-start">
      <label className="flex items-center gap-2 cursor-pointer text-gray-300 dark:text-dark-gray-300">
        <MdOutlineFileUpload size={25} />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id={idVal}
        />
        {fileName ? (
          <>
            <strong>Uploaded image: </strong>
            {required && <span className="text-red-600 text-sm ml-1">*</span>}
          </>
        ) : (
          <>
            {"Upload a Project Image"}
            {required && <span className="text-red-600 text-sm ml-1">*</span>}
          </>
        )}
      </label>
      {fileName && (
        <span className="ml-2 text-gray-300 dark:text-dark-gray-300">
          {fileName}
        </span>
      )}
      {error && <span className="text-red-500 dark:text-red-300">{error}</span>}
    </div>
  )
}

UploadField.propTypes = {
  idVal: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

UploadField.defaultProps = {
  required: false,
}

export default UploadField

// import React, { useState } from "react"
// import { MdOutlineFileUpload } from "react-icons/md"

// function UploadField({ idVal, onChange }) {
//   const [fileName, setFileName] = useState("")

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0]
//     setFileName(file.name)
//     onChange(event)
//   }

//   return (
//     <div className="flex items-center">
//       <label className="flex items-center gap-2 cursor-pointer text-gray-300 dark:text-dark-gray-300">
//         <MdOutlineFileUpload size={25} />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           style={{ display: "none" }}
//           id={idVal}
//         />
//         {fileName ? (
//           <strong>Uploaded image: </strong>
//         ) : (
//           "Upload a Project Image"
//         )}
//       </label>
//       {fileName && (
//         <span className="ml-2 text-gray-300 dark:text-dark-gray-300">
//           {fileName}
//         </span>
//       )}
//     </div>
//   )
// }

// export default UploadField
