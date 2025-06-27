const CircleRadioIcon = ({ isActive, color='green' }: { isActive?: boolean, color?:string }) => {
  return (
    <div className={`w-4 h-4 border rounded-full relative flex justify-center items-center  ${isActive ? `border-${color}` : "border-grey-400"}`}>
      <div className={`w-2 h-2 rounded-full  start-[6px] z-10 ${isActive ? `bg-${color}` : "bg-grey-400"}`}></div>
    </div>
  );
};

export default CircleRadioIcon;
