import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { allCohorts } from "../../constants"

export default function SimpleSelect({ selectedCohort, handleCohortChange }) {
  return (
    <FormControl
      className="h-10 w-[270.4px] font-inter text-sm text-black"
      variant="standard"
      sx={{
        borderColor: "#e4e4e7",
        borderStyle: "SOLID",
        borderTopWidth: "1px",
        borderRightWidth: "1px",
        borderBottomWidth: "1px",
        borderLeftWidth: "1px",
        backgroundColor: "#fff",
        borderRadius: "6px",
        width: "24.316546762589937%",
        height: "40px",
        m: 0,
        p: 0,
        "& .MuiInputBase-root": {
          m: 0,
          p: 0,
          minHeight: "40px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        },
        "& .MuiInputLabel-root": {
          m: 0,
          p: 0,
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiMenuItem-root": {
          m: 0,
          p: 0,
          height: "40px",
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-select": {
          m: 0,
          p: 0,
          height: "40px",
          alignItems: "center",
          display: "inline-flex",
        },
        "& .MuiInput-input": { m: 0, p: 0 },
        "& .MuiInputBase-input": {
          color: "#000",
          fontSize: 14,
          fontWeight: "Regular",
          fontFamily: "Inter",
          textAlign: "left",
          p: "0 !important",
          // marginLeft: "10.299999999999956px",
        },
      }}
    >
      <InputLabel
        id="cohortSelect"
        color="secondary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        // style={{ margin: "auto" }}
      >
        {/* Filter by cohort */}
      </InputLabel>
      <Select
        labelId="cohortSelect"
        color="secondary"
        disableUnderline
        displayEmpty
        // IconComponent={() => (
        //   <img
        //     width="16px"
        //     height="16px"
        //     src="/frame-2.svg"
        //     style={{ marginRight: "10px", display: "flex" }}
        //   />
        // )}
        value={selectedCohort}
        onChange={handleCohortChange}
      >
        <MenuItem disabled className="text-darkgray">
          Filter by cohort
        </MenuItem>

        {Object.keys(allCohorts).map((cohort) => (
          <MenuItem value={cohort} key={cohort}>
            {allCohorts[cohort]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}