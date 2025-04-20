// PageProps - Defines the shape of the route parameters passed to this page
interface PageProps {
  params: Promise<{
    category: string; // Main category from the route
    subcategory: string; // Subcategory from the route
  }>;
}

// Page - Displays content based on the selected subcategory
const Page = async ({ params }: PageProps) => {
  const { category, subcategory } = await params; // Await the resolved params

  return (
    <div>
      <p>Category: {category}</p>
      <p>Subcategory: {subcategory}</p>
    </div>
  );
};

export default Page;
