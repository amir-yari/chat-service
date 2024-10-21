import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  svgPath: ReactNode;
  buttonClassName?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const HeaderButton = ({
  type = "button",
  children,
  svgPath,
  buttonClassName,
}: Props) => {
  return (
    <button
      type={type}
      className={`relative text-gray-500 bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-transparent dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${buttonClassName}`}
    >
      <svg
        className="w-6 h-6 text-gray-800 dark:text-gray"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        {svgPath}
      </svg>
      {children}
    </button>
  );
};

export default HeaderButton;
