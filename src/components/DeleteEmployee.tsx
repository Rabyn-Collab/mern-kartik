'use client';

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { deleteEmployee } from "@/lib/actions";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function DeleteEmployee({ id }: { id: number }) {

  const [pending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const response = await deleteEmployee(id);
      if (response.success) {
        toast.success(response.message);

      } else {
        toast.error(response.message, { className: 'bg-red-500' });
      }
    })
  }

  return (
    <div>

      <Button
        disabled={pending}
        onClick={handleRemove}
        variant={'ghost'}>
        {pending ? <Spinner /> : <TrashIcon />}

      </Button>
    </div>
  )
}