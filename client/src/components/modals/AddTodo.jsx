import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import api from "@/axiosInstance/api"

export function AddModal({openAdd, setOpenAdd, fetchTodos}) {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.post('/addTodo', data)     
    // console.log(data)
      if(response.status === 200){
        toast.success(`${response.data.message}`,{
          duration: 4000,
          position: 'top-right',
        });
        
        reset()
        setOpenAdd(false)
        setLoading(false)
        fetchTodos()
      }

    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`,{
          duration: 4000,
          position: 'top-right',
        });
        console.error("Server Error:", error.response.data.message)
      } else if (error.request) {
        console.error("No response from server")
      } else {
        console.error("Request error:", error.message)
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <Dialog open={openAdd} onOpenChange={setOpenAdd}>

        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Add todo</DialogTitle>
                <DialogDescription>
                Make sure to fill all fields.
                </DialogDescription>
            </DialogHeader>
            <FieldGroup>
                <Field>
                <Label htmlFor="task">Task</Label>
                <Input id="task" name="task"
                {...register("task", {
                    required: "Task field is required",
                    })}
                />
                {errors.task && <p className="text-red-600 text-xs">{errors.task.message}</p>}
                </Field>
                <Field>
                    <NativeSelect 
                    {...register("status", {
                        required: "Status is required",
                        })}
                    >
                        <NativeSelectOption value="">Select status</NativeSelectOption>
                        <NativeSelectOption value="In-progress">In Progress</NativeSelectOption>
                        <NativeSelectOption value="Completed">Completed</NativeSelectOption>
                        <NativeSelectOption value="Pending">Pending</NativeSelectOption>
                    </NativeSelect>
                    {errors.status && <p className="text-red-600 text-xs">{errors.status.message}</p>}
                </Field>

                <Field>
                    <NativeSelect
                        {...register("priority", {
                        required: "Priority level is required",
                        })}
                    >
                        <NativeSelectOption value="">Select priority level</NativeSelectOption>
                        <NativeSelectOption value="high">High</NativeSelectOption>
                        <NativeSelectOption value="medium">Medium</NativeSelectOption>
                        <NativeSelectOption value="low">Low</NativeSelectOption>
                    </NativeSelect>
                    {errors.priority && <p className="text-red-600 text-xs">{errors.priority.message}</p>}
                </Field>

                <Field>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="date"
                        {...register("dueDate", {
                            required: "Due date is required",
                        })}
                    />
                    {errors.dueDate && <p className="text-red-600 text-xs">{errors.dueDate.message}</p>}
                </Field>
            </FieldGroup>
            <DialogFooter>
                <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>
  )
}

