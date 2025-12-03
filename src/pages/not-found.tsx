import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FileQuestion, ArrowLeft } from "lucide-react"

export function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
			<div className="space-y-2">
				<div className="flex justify-center">
					<div className="p-4 bg-muted rounded-full">
						<FileQuestion className="h-12 w-12 text-muted-foreground" />
					</div>
				</div>
				<h1 className="text-4xl font-bold tracking-tight">404 Not Found</h1>
				<p className="text-lg text-muted-foreground max-w-[500px]">
					Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
				</p>
			</div>

			<div className="flex gap-4">
				<Button asChild variant="default" size="lg">
					<Link to="/">
						<ArrowLeft className="mr-2 h-4 w-4" /> Go back home
					</Link>
				</Button>
				<Button asChild variant="outline" size="lg">
					<Link to="/projects">View Projects</Link>
				</Button>
			</div>
		</div>
	)
}
