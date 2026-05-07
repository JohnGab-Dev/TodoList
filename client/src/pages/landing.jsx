import {
  CheckCircle2,
  ClipboardList,
  Rocket,
  Star,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom"


function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="border-b backdrop-blur sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <ClipboardList size={20} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              TodoFlow
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/login"><Button>Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-sm">
              <Star className="h-4 w-4" />
              Organize your day effortlessly
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                Manage Your Tasks
                <span className="text-primary"> Smarter</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                Stay productive with a modern todo list app built to help you
                organize tasks, track progress, and focus on what matters most.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
                <Link to='/signup'>
                  <Button size="lg" className="rounded-2xl">
                    Start Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">

              <div>
                <h3 className="text-3xl font-bold">99%</h3>
                <p className="text-muted-foreground text-sm">
                  Productivity Boost
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-muted-foreground text-sm">
                  Task Access
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

            <Card className="relative rounded-3xl border shadow-2xl overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Today's Tasks
                  </h2>

                  <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                    5 Tasks
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Finish UI Design",
                    "Study React Hooks",
                    "Build Todo API",
                    "Deploy Website",
                    "Team Meeting at 5PM",
                  ].map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border p-4 hover:bg-muted/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-primary h-5 w-5" />
                        <span className="font-medium">{task}</span>
                      </div>

                      <div className="text-xs bg-secondary px-3 py-1 rounded-full">
                        Pending
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full rounded-2xl">
                  Add New Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            Why Choose TodoFlow?
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay organized and productive in one
            beautifully designed app.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Rocket className="h-8 w-8" />,
              title: "Fast Productivity",
              desc: "Create and manage tasks instantly with a smooth and modern interface.",
            },
            {
              icon: <CheckCircle2 className="h-8 w-8" />,
              title: "Task Tracking",
              desc: "Monitor completed and pending tasks with real-time progress updates.",
            },
            {
              icon: <ClipboardList className="h-8 w-8" />,
              title: "Organized Workflow",
              desc: "Categorize and prioritize your tasks to stay focused every day.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="rounded-3xl border hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 space-y-5">
                <div className="w-fit rounded-2xl bg-primary/10 p-4 text-primary">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">
        <Card className="rounded-[2rem] overflow-hidden border shadow-xl">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl font-black">
              Ready to boost your productivity?
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start organizing your tasks today with a beautiful and powerful
              todo management experience.
            </p>

            <Link to="/signup">
              <Button size="lg" className="rounded-2xl">
                Get Started Free
              </Button></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default LandingPage
