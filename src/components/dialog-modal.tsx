import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export type DialogModalProps = {
  children: React.ReactNode,
  isOpen: boolean,
  onPrimaryClick: () => void,
  description: string,
  primaryButtonText: string,
  triggerText: string,
  title: string,
  footerChildren: React.ReactNode
}

export const DialogModal = ({
  children,
  isOpen,
  onPrimaryClick,
  description,
  primaryButtonText,
  triggerText,
  title,
  footerChildren
}: DialogModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {children}
        </div>
        <DialogFooter>
          {footerChildren}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
