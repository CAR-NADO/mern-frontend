import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import LogoImg from "@/assets/images/MCMLogo.png"
import { Button } from "@/components/ui/button"

interface ModalProps {
  title?: string
  children?: React.ReactNode
  footerComponent?: React.ReactNode
  width?: keyof typeof widthClasses
  isOpen?: boolean
  extraClasses?: string
  handleClose: () => void
}

const widthClasses = {
  xxs: "min-w-[20%]",
  xs: "min-w-[30%]",
  sm: "min-w-[45%]",
  md: "min-w-[65%]",
  lg: "min-w-[75%]",
  xl: "min-w-[90%]",
}

export const Modal: React.FC<ModalProps> = ({ title = "", children, width = "md", isOpen = false, extraClasses = "", footerComponent = null, handleClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent className={`w-full ${widthClasses[width]} rounded-md ${extraClasses}`} onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {/* <img src={LogoImg} alt="Logo" width={100} /> */}
            {title && <h2 className="text-lg font-semibold ml-4">{title}</h2>}
          </DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        {footerComponent && (
          <DialogFooter
            className=""
            // onClick={(e) => e.stopPropagation()}
          >
            {footerComponent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

type ModalButtonProps = {
  cb: () => void
  label?: string
  type?: "button" | "submit" | "reset"
  className?: string
}

export const ModalCancelButton = ({ cb, className = "", label = "Cancel" }: ModalButtonProps) => {
  return (
    <Button type="button" className={className} onClick={cb}>
      {label}
    </Button>
  )
}

export const ModalConfirmButton = ({ cb, label = "OK", className = "", type = "button", ...rest }: ModalButtonProps) => {
  return (
    <Button type={type} color="white" className={className} onClick={cb} {...rest}>
      {label}
    </Button>
  )
}
