import { Button } from "@/components/ui/button"
import { FileText, Github, Youtube, Share2, ArrowLeft } from "lucide-react"
import { useParams, Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { NotFoundPage } from "./not-found"

export function ProjectDetail() {
	const { slug } = useParams()

	const project = projects.find((p) => p.slug === slug)

	if (!project) {
		return (
			<NotFoundPage />
		)
	}

	// 3. Render Dynamic Data
	return (
		<article className="max-w-4xl mx-auto space-y-12 pb-12 animate-in fade-in duration-500">

			{/* Navigation Back */}
			<div>
				<Link to="/projects" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
				</Link>
			</div>

			{/* Header */}
			<div className="text-center space-y-6">
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
					{project.title}
				</h1>

				{/* Authors - split string by comma to style individually */}
				<div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg text-muted-foreground">
					{project.authors.split(',').map((author, index) => (
						<span key={index} className="cursor-pointer hover:text-primary underline decoration-dotted underline-offset-4 transition-colors">
							{author.trim()}
						</span>
					))}
				</div>

				<div className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
					{project.venue}
				</div>

				{/* Links */}
				<div className="flex flex-wrap justify-center gap-4">
					<Button className="rounded-full" size="lg" asChild>
						<a href={project.links.paper || "#"} target="_blank">
							<FileText className="mr-2 h-4 w-4" /> Paper
						</a>
					</Button>
					<Button variant="outline" className="rounded-full" size="lg" asChild>
						<a href={project.links.code || "#"} target="_blank">
							<Github className="mr-2 h-4 w-4" /> Code
						</a>
					</Button>
					{project.links.video && (
						<Button variant="outline" className="rounded-full" size="lg" asChild>
							<a href={project.links.video} target="_blank">
								<Youtube className="mr-2 h-4 w-4" /> Video
							</a>
						</Button>
					)}
					<Button variant="ghost" className="rounded-full" size="lg" onClick={() => navigator.clipboard.writeText(project.bibtex)}>
						<Share2 className="mr-2 h-4 w-4" /> Copy BibTeX
					</Button>
				</div>
			</div>

			{/* Teaser Image */}
			<figure className="rounded-xl border bg-muted overflow-hidden shadow-sm">
				<img
					src={project.thumbnail}
					alt={`Teaser for ${project.title}`}
					className="w-full h-auto max-h-[600px] object-cover"
				/>
				<figcaption className="p-4 text-center text-sm text-muted-foreground bg-background/50 backdrop-blur">
					Figure 1: {project.description}
				</figcaption>
			</figure>

			{/* Abstract */}
			<section className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
				<h2 className="text-2xl font-bold mb-4 text-center">Abstract</h2>
				<p className="text-justify text-card-foreground leading-relaxed text-lg">
					{project.abstract}
				</p>
			</section>

			{/* Main Content (Static for now, but layout prepared for MDX/Content) */}
			<div className="prose prose-slate dark:prose-invert max-w-none mx-auto">
				<h2 className="text-center">Methodology</h2>
				<p>
					Our pipeline consists of three main stages. First, we estimate initial camera poses using
					Structure-from-Motion (SfM). Second, we train a coarse Gaussian Splatting model to capture
					the scene geometry. Finally, we refine the model using our proposed diffusion regularization.
				</p>

				{/* Placeholder for architecture diagram */}
				<div className="my-8 rounded-lg border border-dashed p-12 flex items-center justify-center bg-muted/30 text-muted-foreground">
					[ Architecture Diagram Placeholder ]
				</div>

				<h2 className="text-center">Results</h2>
				<p>
					We compare our method against NeRF-W and Gaussian Splatting. As shown in the video,
					our approach achieves significantly better temporal stability and fewer artifacts in
					occluded regions.
				</p>
			</div>

			{/* Citation */}
			<section>
				<h3 className="text-xl font-bold mb-4">Citation</h3>
				<pre className="bg-slate-950 text-slate-50 p-6 rounded-lg overflow-x-auto text-sm font-mono border shadow-inner">
					{project.bibtex}
				</pre>
			</section>
		</article>
	)
}
