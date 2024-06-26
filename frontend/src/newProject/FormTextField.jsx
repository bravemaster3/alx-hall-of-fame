export default function FormTextField({
  labelVal,
  idVal,
  placeholderVal,
  value,
  onChange,
}) {
  const fieldClassName =
    "self-stretch rounded-md bg-white dark:bg-dark-white text-black dark:text-dark-black flex flex-row items-start justify-start pt-1.5 px-[13px] pb-2.5 border-[1px] border-solid border-gainsboro-200 dark:border-dark-gainsboro-200 font-inter text-sm bg-transparent h-20 relative leading-[20px] text-black text-left p-0"

  const fieldDivClassName =
    "self-stretch flex flex-col items-start justify-start gap-[5px]"

  const fieldLabelClassName =
    "w-[256.8px] relative text-sm leading-[14px] font-inter text-gray-300 dark:text-dark-gray-300 text-left inline-block"
  return (
    <div className={fieldDivClassName}>
      <label className={fieldLabelClassName} htmlFor={idVal}>
        {labelVal}
      </label>
      <textarea
        className={fieldClassName}
        placeholder={placeholderVal}
        id={idVal}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
