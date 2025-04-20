// PageProps - Defines the shape of the route parameters passed to this page
interface PageProps {
  params: Promise<{ category: string }>; // Route parameter for the selected category
}

// Page - Displays content based on the selected category
const Page = async ({ params }: PageProps) => {
  const { category } = await params; // Await the resolved category param
  return <div>Category: {category}</div>; // Render category name
};

export default Page;
