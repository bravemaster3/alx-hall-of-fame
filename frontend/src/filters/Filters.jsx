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
import { FaSearch } from "react-icons/fa"
import SimpleSelect from "./SimpleSelect"

export default function Filters({ activeTab }) {
  return (
    <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[13.1px] max-w-full">
      {activeTab === "All Projects" ? <SimpleSelect /> : null}
      <TextField
        className="[border:none] bg-[transparent] h-10 flex-1 font-inter text-sm text-darkgray min-w-[300px] max-w-full"
        placeholder="Search by project name or tag..."
        variant="outlined"
        sx={{
          "& fieldset": { borderColor: "#e4e4e7" },
          "& .MuiInputBase-root": {
            height: "40px",
            backgroundColor: "#fff",
            borderRadius: "6px",
            fontSize: "14px",
          },
          "& .MuiInputBase-input": { color: "#b2b2b2" },
        }}
      />
      <Button
        className="flex items-center justify-center bg-white w-[56.6px] h-[41px] shadow cursor-pointer"
        startIcon={<FaSearch />}
        variant="outlined"
        sx={{
          color: "#09090b", // Text color
          fontSize: "14px", // Adjust font size as needed
          background: "#fff", // White background
          border: "#e4e4e7 solid 1px",
          borderRadius: "4px",
          "&:hover": { background: "#fff" },
        }}
      />
    </div>
  )
}
