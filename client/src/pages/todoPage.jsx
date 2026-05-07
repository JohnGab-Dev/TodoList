import React from "react";
import {
  ClipboardList,
  Bell,
  LogOut,
  Search,
  Plus,
  CheckCircle2,
  Clock3,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TitleRender } from "@/utils/titleRender"
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import api from "@/axiosInstance/api";
import toast from 'react-hot-toast'
import { AddModal } from "@/components/modals/AddTodo"
import { EditModal } from "@/components/modals/EditTodo"
import { DeleteModal } from "@/components/modals/DelTodo"
import { useState, useEffect, useMemo } from "react";
import { formatDateMDY } from "@/utils/dateFormatter"

function TodoPage() {
    TitleRender("TodoFlow | Dashboard")
    const navigate = useNavigate()
    const user  = JSON.parse(localStorage.getItem("user"))

    //states
    const [todos, setTodos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [totalTask, setTotalTask] = useState(0)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [totalPending, setTotalPending] = useState(0)

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const [selectedRow, setSelectedRow] = useState()

    const getTodos = async ()=> {
        try {
            const response = await api.get('/getTodos');
            console.log(response.data)
            setTodos(response.data.data)
            setTotalTask(response.data.total_tasks)
            setTotalCompleted(response.data.total_completed)
            setTotalPending(response.data.total_pending)
        } catch (error) {
            console.error(error);
        }
    }

    const filteredTodos = useMemo(() => {
      if (!searchTerm.trim()) return todos;

      const term = searchTerm.toLowerCase();
      return todos.filter((todo) => {
        return [todo.task, todo.status, todo.priority]
          .join(" ")
          .toLowerCase()
          .includes(term);
      });
    }, [searchTerm, todos]);

    useEffect(()=>{
        getTodos()
    }, [])

    const handleLogout = async (e)=> {
        e.preventDefault
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        // Clear axios auth headers
        if (api.defaults.headers) {
        delete api.defaults.headers.common['Authorization'];
        }

        toast.success("Logout Successfull!",{
            duration: 4000,
            position: 'top-right',
        });
        
        navigate('/login', { replace: true });
    }

  return (
    <div className="min-h-screen bg-muted/30">
        <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} row={selectedRow} fetchTodos={getTodos}/>
        <DeleteModal openDel={openDel} setOpenDel={setOpenDel} row={selectedRow} fetchTodos={getTodos}/>
      {/* NAVBAR */}
      <header className="w-full border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <ClipboardList size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                TodoFlow
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage your daily tasks
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {user.name[0]}
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-medium">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={handleLogout}>
              <LogOut size={60} className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h2 className="text-4xl font-black tracking-tight">
              My Tasks
            </h2>

            <p className="text-muted-foreground mt-2">
              Stay productive and organized with TodoFlow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />

              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>

            <Button onClick={(e)=>{setOpenAdd(true)}}> 
                <Plus className="mr-2 h-4 w-4" />
                Add Task
            </Button>
            <AddModal openAdd={openAdd} setOpenAdd={setOpenAdd} fetchTodos={getTodos} />
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Tasks
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {totalTask}
                </h3>
              </div>

              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <ClipboardList className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Completed
                </p>

                <h3 className="text-3xl font-bold mt-2">
                   {totalCompleted}
                </h3>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending
                </p>

                <h3 className="text-3xl font-bold mt-2">
                   {totalPending}
                </h3>
              </div>

              <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600">
                <Clock3 className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TODO TABLE */}
        <Card className="rounded-3xl border shadow-sm">
          <CardContent className="p-0 overflow-hidden">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 gap-4 bg-muted/50 px-6 py-4 border-b font-semibold text-sm">
              <div>Task</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Due Date</div>
              <div className="text-center">Actions</div>
            </div>

            {/* TABLE BODY */}
            <div className="divide-y">
              {filteredTodos.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No tasks match your search.
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="grid grid-cols-5 gap-4 items-center px-6 py-5 hover:bg-muted/40 transition"
                  >
                  <div className="font-medium">
                    {todo.task}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        todo.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : todo.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {todo.status}
                    </span>
                  </div>

                  <div>{todo.priority}</div>

                  <div className="text-muted-foreground text-sm">
                    {formatDateMDY(todo.due_date)}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" onClick={()=> {setOpenEdit(true); setSelectedRow(todo)}}>
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={()=> {setOpenDel(true); setSelectedRow(todo)}}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default TodoPage;
