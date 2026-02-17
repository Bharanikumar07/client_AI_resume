import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Optimize Your Resume for ATS <br className="hidden sm:inline" />
                    and Land Your Dream Job.
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    Our AI-powered tool analyzes your resume against job descriptions, identifies missing keywords, and provides actionable feedback to increase your interview chances.
                </p>
            </div>
            <div className="flex gap-4">
                <Link href="#upload">
                    <Button size="lg">Analyze Resume</Button>
                </Link>
                <Link href="/resume-builder">
                    <Button variant="outline" size="lg">Build Resume</Button>
                </Link>
            </div>
        </section>
    )
}
