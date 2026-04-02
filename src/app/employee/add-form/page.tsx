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
import { Label } from "@/components/ui/label"
import z from "zod"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { addEmployee } from "@/lib/actions";
import { useTransition } from "react";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  age: z.coerce
    .number()
    .pipe(
      z.number().min(18, "Age must be at least 18")
    ),
  occupation: z.string().min(5, 'Occupation must be at least 5 characters long'),
})



export default function EmployeeAddForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 18,
      occupation: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await addEmployee(values);
      if (res.success) {
        toast.success(res.message);
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




            <Button type="submit" className="w-full">
              Submit
            </Button>

          </div>

        </form>
      </CardContent>

    </Card>
  )
}




// "use client"

// import * as React from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group"

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Bug title must be at least 5 characters.")
//     .max(32, "Bug title must be at most 32 characters."),
//   description: z
//     .string()
//     .min(20, "Description must be at least 20 characters.")
//     .max(100, "Description must be at most 100 characters."),
// })

// export function BugReportForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//     },
//   })

//   function onSubmit(data: z.infer<typeof formSchema>) {
//     toast("You submitted the following values:", {
//       description: (
//         <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
//           <code>{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//       position: "bottom-right",
//       classNames: {
//         content: "flex flex-col gap-2",
//       },
//       style: {
//         "--border-radius": "calc(var(--radius)  + 4px)",
//       } as React.CSSProperties,
//     })
//   }

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Bug Report</CardTitle>
//         <CardDescription>
//           Help us improve by reporting bugs you encounter.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             <Controller
//               name="title"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-title">
//                     Bug Title
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-title"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Login button not working on mobile"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               name="description"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-description">
//                     Description
//                   </FieldLabel>
//                   <InputGroup>
//                     <InputGroupTextarea
//                       {...field}
//                       id="form-rhf-demo-description"
//                       placeholder="I'm having an issue with the login button on mobile."
//                       rows={6}
//                       className="min-h-24 resize-none"
//                       aria-invalid={fieldState.invalid}
//                     />
//                     <InputGroupAddon align="block-end">
//                       <InputGroupText className="tabular-nums">
//                         {field.value.length}/100 characters
//                       </InputGroupText>
//                     </InputGroupAddon>
//                   </InputGroup>
//                   <FieldDescription>
//                     Include steps to reproduce, expected behavior, and what
//                     actually happened.
//                   </FieldDescription>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="horizontal">
//           <Button type="button" variant="outline" onClick={() => form.reset()}>
//             Reset
//           </Button>
//           <Button type="submit" form="form-rhf-demo">
//             Submit
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   )
// }
