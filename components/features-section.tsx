
import { CheckCircle2 } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            title: "ATS Compatibility Check",
            description: "Ensure your resume is readable by Applicant Tracking Systems.",
        },
        {
            title: "Keyword Optimization",
            description: "Identify missing keywords from the job description.",
        },
        {
            title: "Formatting Analysis",
            description: "Get feedback on your resume's layout and structure.",
        },
        {
            title: "AI-Powered Suggestions",
            description: "Receive personalized tips to improve your content.",
        },
    ]

    return (
        <section className="container py-8 md:py-12 lg:py-24 bg-muted/50">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Why use our Resume Analyzer?
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Stop guessing if your resume is good enough. Get data-driven insights to beat the bots and impress recruiters.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-2 rounded-lg border bg-background p-4">
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                            <h3 className="font-bold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
