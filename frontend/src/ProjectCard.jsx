const ProjectCard = ({ image2 }) => {
  return (
    <div className="w-[350px] rounded-3xs box-border flex flex-col items-end justify-start pt-[22px] pb-4 pr-[23px] pl-[21px] gap-[14px] min-w-[332px] max-w-full text-left text-sm text-gray-400 dark:text-dark-gray-400 font-inter border-[1px] border-solid border-gainsboro dark:border-dark-gainsboro">
      <img
        className="self-stretch h-40 relative rounded-3xs max-w-full overflow-hidden shrink-0 object-cover"
        loading="lazy"
        alt=""
        src={image2}
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
        <div className="self-stretch h-[45px] flex flex-col items-start justify-start pt-[23px] px-0 pb-px box-border gap-[2px] text-5xl">
          <h2 className="mt-[-26px] ml-[-2.2000000000000455px] m-0 self-stretch relative text-inherit dark:text-dark-black tracking-[-0.6px] leading-[24px] font-normal font-inherit shrink-0 [debug_commit:1de1738] mq450:text-lgi mq450:leading-[19px]">
            Project Title
          </h2>
          <div className="ml-[-1px] w-[309.1px] relative text-xs tracking-[-0.6px] leading-[21px] inline-block shrink-0 [debug_commit:1de1738]">
            By: Author’s name
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-2 text-dimgray dark:text-dark-dimgray">
          <div className="ml-[-2px] flex-1 relative leading-[20px] shrink-0 [debug_commit:1de1738]">
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              hendrerit ex et ipsum ullamcorper aliquam. Nullam et ipsum quis
              libero molestie rutrum. Nulla facilisi. Quisque augue orci,
              condimentum eget tortor eu, iaculis lacinia est. Vivamus hendrerit
              sem a enim sodales tincidunt.
            </p>
          </div>
        </div>
        <div className="self-stretch rounded-md flex flex-row items-start justify-start py-2.5 px-px gap-[20px] text-3xs text-black dark:text-dark-black mq450:flex-wrap">
          <p>Tags:</p>
          <div className="text-3xs text-white">
            <p className="h-[15px] rounded-3xs bg-steelblue dark:bg-dark-steelblue flex items-start justify-start py-0 px-2.5">
              Portfolio
            </p>
          </div>
          <div className="text-3xs text-white">
            <p className="h-[15px] rounded-3xs bg-steelblue dark:bg-dark-steelblue flex items-start justify-start py-0 px-2.5">
              ALX
            </p>
          </div>
          <div className="text-3xs text-white">
            <p className="h-[15px] rounded-3xs bg-steelblue dark:bg-dark-steelblue flex items-start justify-start py-0 px-2.5">
              Fintech
            </p>
          </div>
        </div>
        <div className="self-stretch rounded-md flex flex-row items-start justify-between py-2.5 pr-[9px] pl-0.5 gap-[20px] text-gray-200 dark:text-white mq450:flex-wrap">
          <div className="relative leading-[20px] whitespace-pre-wrap inline-block min-w-[113px]">
            View on github
          </div>
          <div className="w-[90px] relative leading-[20px] text-right inline-block shrink-0">
            Live project
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard