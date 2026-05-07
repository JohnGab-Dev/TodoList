import { SignupForm } from "@/components/signup-form"
import { TitleRender } from "@/utils/titleRender"
export default function SignupPage() {
    TitleRender("TodoFlow | Signup")
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
