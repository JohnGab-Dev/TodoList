import { LoginForm } from "@/components/login-form"
import { TitleRender } from "@/utils/titleRender"
export default function LoginPage() {
    TitleRender("TodoFlow | Login")
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
