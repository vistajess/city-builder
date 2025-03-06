import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export type BaseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  description: string;
  title: string;
  footerChildren: React.ReactNode;
  setIsOpen: (open: boolean) => void;
};

export const BaseModal = ({
  children,
  isOpen,
  description,
  title,
  footerChildren,
  setIsOpen,
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{footerChildren}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
