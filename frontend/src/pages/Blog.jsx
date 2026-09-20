import { Footer } from "../components/Footer";

const Blog = () => {
    return (
        <>
            <section className="relative isolate min-h-112 w-full overflow-hidden bg-[#f0f8ff] px-5 pt-10 sm:px-10 lg:px-14">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-4xl font-bold text-[#071d55] sm:text-5xl lg:text-6xl">
                        Our Blog
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 sm:text-xl lg:text-2xl">
                        Stay updated with the latest news, insights, and stories from Apna School.
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export { Blog };
export default Blog;