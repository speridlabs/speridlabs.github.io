import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HomePage } from "@/pages/home"
import { ProjectsPage } from "@/pages/projects"
import { ProjectDetail } from "@/pages/project-detail"
import { NotFoundPage } from "@/pages/not-found"

function RootLayout() {
	return (
		<div className="min-h-screen flex flex-col font-sans">
			<Navbar />
			<main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	)
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "projects",
				element: <ProjectsPage />,
			},
			{
				path: "projects/:slug",
				element: <ProjectDetail />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
