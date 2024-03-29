import { AiOutlineArrowRight } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useStoreContext } from "../context";
import { useEffect, useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { dateFn } from "../utils";

const Articles = () => {
  interface ArticlesProps {
    title: string;
    introduction: string;
    _id: string;
    slug: string;
    _createdAt: string;
  }
  const { lightTheme } = useStoreContext();

  const [articles, setArticles] = useState<ArticlesProps[]>([]);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();



  const getArticleData = async () => {
    try {
      const query = '*[_type == "articlesData"]';
      setLoading(true);
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          // Sort articles by _createdAt in descending order
          const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a._createdAt);
            const dateB = new Date(b._createdAt);
            return dateB.getTime() - dateA.getTime();
          });
          setArticles(sortedData);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticleData();
  }, []);

  return (
    <div className={`w-full ${lightTheme ? "bg-zinc-50" : "bg-black"}`}>
      <section
        className={`mx-auto ${
          lightTheme ? "bg-zinc-100" : "bg-zinc-900"
        } max-w-full md:max-w-6xl pb-14`}
      >
        <Navbar isVisible={true} />
        <div className="mt-[5rem] md:mt-[9rem] px-4 md:px-12 w-full">
          <div className="max-w-full md:max-w-5xl flex flex-col gap-6">
            <div className="w-full md:w-[70%]">
              <h1
                className={`text-3xl md:text-4xl font-semibold tracking-tight ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                Writing on web development, artificial intelligence, web 3.0 and
                the blockchain industry.
              </h1>
              <div
                className={`mt-6 space-y-7 text-base ${
                  lightTheme ? "text-zinc-600" : "text-zinc-400"
                } font-light`}
              >
                <p>
                  Chronological Collection: Advancing Concepts in Web
                  Development, AI, and Blockchain - Long-Form Thoughts on
                  Interesting Topics.
                </p>
              </div>
            </div>
            <div
              className={`mt-6 border-l-0 md:border-l ${
                lightTheme ? "border-zinc-200" : "border-zinc-600"
              } flex flex-col gap-4 w-full md:w-[90%] py-2 h-[90vh] overflow-y-scroll scrollbar-hide`}
            >
              {loading && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-[100%] rounded-xl">
                  <svg
                    aria-hidden="true"
                    className="inline w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#33A1FD]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
              {articles &&
                !loading &&
                articles.map((_el) => (
                  <div className="flex gap-4 px-0 md:px-9" key={_el?._id}>
                    <div className="text-sm text-zinc-500 hidden md:flex flex-[20%] w-full">
                      {dateFn(_el?._createdAt)}
                    </div>
                    <article
                      className={`flex flex-col flex-[80%] gap-4 relative items-start px-2 md:px-6 py-6 border ${
                        lightTheme
                          ? "border-zinc-200 hover:bg-zinc-200"
                          : "border-zinc-900 hover:bg-zinc-800"
                      } rounded-lg w-full transition-all ease-in-out duration-50 shadow`}
                    >
                      <p className="block md:hidden text-sm text-zinc-500 font-semibold">
                        | {dateFn(_el?._createdAt)}
                      </p>
                      <p
                        className={`${
                          lightTheme ? "text-zinc-800" : "text-zinc-100"
                        } text-base font-semibold tracking-tight`}
                      >
                        {_el?.title}
                      </p>
                      <p
                        className={`mt-0 md:mt-2 text-xs md:text-[.9rem] ${
                          lightTheme
                            ? "text-zinc-600 font-light"
                            : "text-zinc-400 font-extralight"
                        } tracking-wide`}
                      >
                        {_el?.introduction}
                      </p>
                      <div
                        className="flex items-center mt-1 md:mt-2 cursor-pointer gap-2"
                        onClick={() => Navigate(`/blog/${_el?.slug}`)}
                      >
                        <p className="text-xs font-medium text-[#33A1FD]">
                          Read article
                        </p>
                        <AiOutlineArrowRight className="text-[#33A1FD] text-xs" />
                      </div>
                    </article>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Articles;
