
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import api from "@/axiosInstance/api"

export function EditModal({openEdit, setOpenEdit, row, fetchTodos}) {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)

  const [id, setId] = useState()
  useEffect(()=> {
    if(row){
        reset({
            task: row.task,
            status: row.status,
            priority: row.priority,
            dueDate: row.due_date?.split("T")[0]
        })
        setId(row.id)
    }
  }, [row, reset])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.post(`/editTodo?id=${id}`, data)     
    // console.log(data)
      if(response.status === 200){
        toast.success(`${response.data.message}`,{
          duration: 4000,
          position: 'top-right',
        });
        
        reset()
        setOpenEdit(false)
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
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Edit todo</DialogTitle>
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
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>
  )
}

