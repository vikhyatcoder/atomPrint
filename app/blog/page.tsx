import type { Metadata } from "next"
import ClientBlogPage from "./ClientBlogPage"

export const metadata: Metadata = {
  title: "Blog | Atom Print",
  description: "Read our latest articles on 3D printing tips, project stories, industry trends, and student projects.",
}

export default function BlogPage() {
  return <ClientBlogPage />
}
