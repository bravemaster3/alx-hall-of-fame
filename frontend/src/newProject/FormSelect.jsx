import { Select, MenuItem } from "@mui/material"

export default function FormSelect({
  labelVal,
  idVal,
  options,
  value,
  onChange,
}) {
  const fieldClassName =
    "self-stretch rounded-md bg-white dark:bg-dark-white text-black dark:text-dark-black flex flex-row items-start justify-start pt-1.5 px-[13px] pb-2.5 border-[1px] border-solid border-gainsboro-200 dark:border-dark-gainsboro-200 font-inter text-sm bg-transparent h-5 relative leading-[20px] text-black text-left p-0"

  const fieldDivClassName =
    "self-stretch flex flex-col items-start justify-start gap-[5px]"

  const fieldLabelClassName =
    "w-[256.8px] relative text-sm leading-[14px] font-inter text-gray-300 dark:text-dark-gray-300 text-left inline-block"

  const selectClassName =
    "bg-transparent outline-none border-none p-0 m-0 w-full text-gray-300 dark:text-dark-gray-300"

  return (
    <div className={fieldDivClassName}>
      <label className={fieldLabelClassName} htmlFor={idVal}>
        {labelVal}
      </label>
      <Select
        className={selectClassName}
        id={idVal}
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
