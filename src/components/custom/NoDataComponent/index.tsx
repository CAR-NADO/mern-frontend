import { ReactNode } from "react"
import { Button } from "@/components/ui/button" // Ensure you have the correct button import

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
}

const NoDataComponent = ({ icon, title, description, buttonText, onButtonClick }: EmptyStateProps) => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-4">
      <div className="h-24 w-24 min-w-24 rounded-full bg-blue-50 flex items-center justify-center text-grey-800">{icon}</div>
      <div className="text-lg font-semibold text-black">{title}</div>
      <div className="text-lg font-normal text-grey">{description}</div>
      {buttonText && onButtonClick && (
        <Button className="bg-blue text-white hover:bg-blue mt-1 min-w-80" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default NoDataComponent
