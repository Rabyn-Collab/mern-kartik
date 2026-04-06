'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import z from "zod"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateEmployee } from "@/lib/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Employee } from "@/models/Employee";
const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  age: z.coerce.number<number>(),
  occupation: z.string().min(5, 'Occupation must be at least 5 characters long'),
})



export default function EditEmployee({ employee }: { employee: Employee }) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee.name,
      age: employee.age,
      occupation: employee.occupation
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await updateEmployee({
        ...values,
        id: employee.id
      });
      if (res.success) {
        toast.success(res.message);
        router.back();
      } else {
        toast.error(res.message, { className: 'bg-red-500' });
      }

    });


  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Employees</CardTitle>
        <CardDescription>
          Enter details of the employee
        </CardDescription>

      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">


            <FieldGroup>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="age">Age</FieldLabel>
                    <Input
                      id="age"
                      aria-invalid={fieldState.invalid}
                      placeholder="number only"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="occupation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
                    <Input
                      id="occupation"
                      aria-invalid={fieldState.invalid}
                      placeholder="postion"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />








            </FieldGroup>




            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <Spinner /> : 'Submit'}

            </Button>

          </div>

        </form>
      </CardContent>

    </Card>
  )
}



