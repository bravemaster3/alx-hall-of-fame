import React from "react"
import { allCohorts } from "../../constants"

export default function SimpleSelect({ selectedCohort, handleCohortChange }) {
  return (
    <select
      className="px-4 py-2 h-[40px] border border-dark-white rounded-lg w-[270.4px] max-w-[40%] font-inter text-sm text-black"
      value={selectedCohort}
      onChange={handleCohortChange}
    >
      <option value="" disabled>
        Filter by cohort
      </option>
      {Object.keys(allCohorts).map((cohort) => (
        <option key={cohort} value={cohort}>
          {allCohorts[cohort]}
        </option>
      ))}
    </select>
  )
}
