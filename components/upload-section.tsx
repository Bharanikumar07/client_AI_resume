"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function UploadSection() {
    const router = useRouter()
    const [file, setFile] = React.useState<File | null>(null)
    const [jobDescription, setJobDescription] = React.useState("")
    const [isAnalyzing, setIsAnalyzing] = React.useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);

        // In a real app, you would upload the file here.
        // For this demo, we'll read the text content directly if it's a text file,
        // or just simulate it. 

        // Since we can't easily parse PDF in the browser without libraries efficiently 
        // in this snippet, let's assume we send the text content if possible or just the file name.

        // Simulating file read for demo purposes if it's text/markdown
        let content = "";
        if (file.type === "text/plain" || file.name.endsWith(".md") || file.name.endsWith(".txt")) {
            content = await file.text();
        } else {
            content = "Simulated resume content for " + file.name;
        }

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileContent: content,
                    jobDescription
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Store result in local storage or context to display on result page
                // For now, simpler to just pass ID if we saved it, but API returns analysis directly logic
                // Let's assume we redirect to a result page.
                // Since we don't have a state management set up for passing data between pages easily without ID,
                // we'll just redirect to a demo result page or similar.
                // But wait, the API saves to DB if logged in.

                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle>Upload Your Resume</CardTitle>
                    <CardDescription>
                        Upload your resume (PDF, DOCX, TXT) and the job description you're applying for.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="resume">Resume</Label>
                        <div className="flex items-center gap-2">
                            <Input id="resume" type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="job-desc">Job Description (Optional)</Label>
                        <Textarea
                            id="job-desc"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleAnalyze} disabled={!file || isAnalyzing} className="w-full">
                        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}
