import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { BsFillClipboard2Fill, BsFillCheckCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useStoreContext } from "../context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { client, urlFor } from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillLeftCircle } from "react-icons/ai";
import { dateFn } from "../utils";

const Blogpost = () => {
  interface ArticlesProps {
    title: string;
    introduction: string;
    _id: string;
    slug: string;
    conclusion: string;
    introImage: string;
    CodeA: {
      code: string;
    }[];
    CodeB: {
      code: string;
    }[];
    CodeC: {
      code: string;
    }[];
    CodeD: {
      code: string;
    }[];
    CodeE: {
      code: string;
    }[];
    mainTitleA: string;
    mainTitleB: string;
    mainTitleC: string;
    mainTitleD: string;
    mainTitleE: string;
    mainImageA: string;
    mainImageB: string;
    mainImageC: string;
    mainImageD: string;
    mainImageE: string;
    mainTextA: string;
    mainTextB: string;
    mainTextC: string;
    mainTextD: string;
    mainTextE: string;
    _createdAt: string;
  }

  const { lightTheme } = useStoreContext();

  const Navigate = useNavigate();

  const [article, setArticle] = useState<ArticlesProps | undefined>();
  const [loading, setLoading] = useState(false);

  const { title } = useParams<{ title: string }>();

  const getArticleData = async () => {
    try {
      const query = '*[_type == "articlesData"]';
      setLoading(true);
      await client.fetch(query).then((data) => {
        if (data?.length > 0 && title) {
          const filteredData = data?.filter(
            (_el: ArticlesProps) => _el?.slug === title
          );
          setArticle(filteredData[0]);
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

  const [copied, setCopied] = useState(false);

  return (
    <div className={`w-full ${lightTheme ? "bg-zinc-50" : "bg-black"}`}>
      <section
        className={`mx-auto ${
          lightTheme ? "bg-zinc-100" : "bg-zinc-900"
        } max-w-full md:max-w-6xl pb-14`}
      >
        <Navbar isVisible={true} />
        <div className="mx-auto max-w-full md:max-w-2xl px-4 py-8 mt-[5rem] flex flex-col gap-5">
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
          <div className={`flex items-center gap-2 cursor-pointer`}>
            <AiFillLeftCircle
              className={`text-[2.7rem] ${
                lightTheme ? "text-zinc-800" : "text-zinc-800"
              } shadow-lg rounded-full`}
              onClick={() => Navigate(-1)}
            />
          </div>
          <header className="flex flex-col gap-4">
            <div className="text-base text-zinc-500 w-full">
              | {dateFn(article?._createdAt)}
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold ${
                lightTheme ? "text-zinc-800" : "text-zinc-100"
              }`}
            >
              {article && article?.title}
            </h1>
          </header>

          {/* image ==> text ==> snippet */}

          {/* images */}
          {article?.introImage && (
            <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
              <img
                src={article?.introImage && urlFor(article?.introImage)}
                loading="lazy"
                alt="image"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          )}

          {article?.introduction && (
            <div
              className={`text-sm md:text-base ${
                lightTheme ? "text-zinc-600" : "text-zinc-400"
              } mt-2`}
            >
              {article && article?.introduction}
            </div>
          )}

          <div className="w-full">
            <div className="flex flex-col gap-3">
              {article?.mainTitleA && (
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } mt-4`}
                >
                  {article && article?.mainTitleA}
                </h2>
              )}
              {article?.mainImageA && (
                <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
                  <img
                    src={article?.mainImageA && urlFor(article?.mainImageA)}
                    loading="lazy"
                    alt="image"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              )}
              {article?.mainTextA && (
                <div
                  className={`text-sm md:text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } mt-2`}
                >
                  {article && article?.mainTextA}
                </div>
              )}
              {article?.CodeA && (
                <div className="prose mt-8">
                  {/* code snipet */}
                  <div className="max-w-full md:max-w-2xl min-w-[100%] md:min-w-[25rem] bg-transparent rounded-md overflow-y-scroll h-[50vh] scrollbar-hide">
                    {article?.CodeA &&
                      article.CodeA.map((_el, _i) => (
                        <div key={_i}>
                          <div
                            className={`flex justify-between px-4 text-white text-xs items-center py-1 ${
                              lightTheme
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-500 text-black"
                            }`}
                          >
                            <p className="text-sm">Code snippet</p>
                            {copied ? (
                              <button className="py-1 inline-flex items-center gap-1">
                                <span className="text-base text-white">
                                  <BsFillCheckCircleFill />
                                </span>
                                copied
                              </button>
                            ) : (
                              <button
                                className="py-1 inline-flex items-center gap-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(_el?.code);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                }}
                              >
                                <span className="text-base text-white">
                                  <BsFillClipboard2Fill />
                                </span>
                                Copy code
                              </button>
                            )}
                          </div>
                          <SyntaxHighlighter
                            language="jsx"
                            style={atomOneDark}
                            wrapLongLines={true}
                          >
                            {_el?.code}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {article?.mainTitleB && (
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } mt-4`}
                >
                  {article && article?.mainTitleB}
                </h2>
              )}
              {article?.mainImageB && (
                <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
                  <img
                    src={article?.mainImageB && urlFor(article?.mainImageB)}
                    loading="lazy"
                    alt="image"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              )}
              {article?.mainTextB && (
                <div
                  className={`text-sm md:text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } mt-2`}
                >
                  {article && article?.mainTextB}
                </div>
              )}
              {article?.CodeB && (
                <div className="prose mt-8">
                  {/* code snipet */}
                  <div className="max-w-full md:max-w-2xl min-w-[100%] md:min-w-[25rem] bg-transparent rounded-md overflow-y-scroll h-[50vh] scrollbar-hide">
                    {article?.CodeB &&
                      article.CodeB.map((_el, _i) => (
                        <div key={_i}>
                          <div
                            className={`flex justify-between px-4 text-white text-xs items-center py-1 ${
                              lightTheme
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-500 text-black"
                            }`}
                          >
                            <p className="text-sm">Code snippet</p>
                            {copied ? (
                              <button className="py-1 inline-flex items-center gap-1">
                                <span className="text-base text-white">
                                  <BsFillCheckCircleFill />
                                </span>
                                copied
                              </button>
                            ) : (
                              <button
                                className="py-1 inline-flex items-center gap-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(_el?.code);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                }}
                              >
                                <span className="text-base text-white">
                                  <BsFillClipboard2Fill />
                                </span>
                                Copy code
                              </button>
                            )}
                          </div>
                          <SyntaxHighlighter
                            language="jsx"
                            style={atomOneDark}
                            wrapLongLines={true}
                          >
                            {_el?.code}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {article?.mainTitleC && (
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } mt-4`}
                >
                  {article && article?.mainTitleC}
                </h2>
              )}
              {article?.mainImageC && (
                <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
                  <img
                    src={article?.mainImageC && urlFor(article?.mainImageC)}
                    loading="lazy"
                    alt="image"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              )}
              {article?.mainTextC && (
                <div
                  className={`text-sm md:text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } mt-2`}
                >
                  {article && article?.mainTextC}
                </div>
              )}
              {article?.CodeC && (
                <div className="prose mt-8">
                  {/* code snipet */}
                  <div className="max-w-full md:max-w-2xl min-w-[100%] md:min-w-[25rem] bg-transparent rounded-md overflow-y-scroll h-[50vh] scrollbar-hide">
                    {article?.CodeC &&
                      article.CodeC.map((_el, _i) => (
                        <div key={_i}>
                          <div
                            className={`flex justify-between px-4 text-white text-xs items-center py-1 ${
                              lightTheme
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-500 text-black"
                            }`}
                          >
                            <p className="text-sm">Code snippet</p>
                            {copied ? (
                              <button className="py-1 inline-flex items-center gap-1">
                                <span className="text-base text-white">
                                  <BsFillCheckCircleFill />
                                </span>
                                copied
                              </button>
                            ) : (
                              <button
                                className="py-1 inline-flex items-center gap-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(_el?.code);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                }}
                              >
                                <span className="text-base text-white">
                                  <BsFillClipboard2Fill />
                                </span>
                                Copy code
                              </button>
                            )}
                          </div>
                          <SyntaxHighlighter
                            language="jsx"
                            style={atomOneDark}
                            wrapLongLines={true}
                          >
                            {_el?.code}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {article?.mainTitleD && (
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } mt-4`}
                >
                  {article && article?.mainTitleD}
                </h2>
              )}
              {article?.mainImageD && (
                <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
                  <img
                    src={article?.mainImageD && urlFor(article?.mainImageD)}
                    loading="lazy"
                    alt="image"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              )}
              {article?.mainTextD && (
                <div
                  className={`text-sm md:text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } mt-2`}
                >
                  {article && article?.mainTextD}
                </div>
              )}
              {article?.CodeD && (
                <div className="prose mt-8">
                  {/* code snipet */}
                  <div className="max-w-full md:max-w-2xl min-w-[100%] md:min-w-[25rem] bg-transparent rounded-md overflow-y-scroll h-[50vh] scrollbar-hide">
                    {article?.CodeD &&
                      article.CodeD.map((_el, _i) => (
                        <div key={_i}>
                          <div
                            className={`flex justify-between px-4 text-white text-xs items-center py-1 ${
                              lightTheme
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-500 text-black"
                            }`}
                          >
                            <p className="text-sm">Code snippet</p>
                            {copied ? (
                              <button className="py-1 inline-flex items-center gap-1">
                                <span className="text-base text-white">
                                  <BsFillCheckCircleFill />
                                </span>
                                copied
                              </button>
                            ) : (
                              <button
                                className="py-1 inline-flex items-center gap-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(_el?.code);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                }}
                              >
                                <span className="text-base text-white">
                                  <BsFillClipboard2Fill />
                                </span>
                                Copy code
                              </button>
                            )}
                          </div>
                          <SyntaxHighlighter
                            language="jsx"
                            style={atomOneDark}
                            wrapLongLines={true}
                          >
                            {_el?.code}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {article?.mainTitleE && (
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } mt-4`}
                >
                  {article && article?.mainTitleE}
                </h2>
              )}
              {article?.mainImageE && (
                <div className="bg-transparent w-full mx-auto h-[30vh] md:h-[40vh] mt-2 rounded-xl">
                  <img
                    src={article?.mainImageE && urlFor(article?.mainImageE)}
                    loading="lazy"
                    alt="image"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              )}
              {article?.mainTextE && (
                <div
                  className={`text-sm md:text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } mt-2`}
                >
                  {article && article?.mainTextE}
                </div>
              )}
              {article?.CodeE && (
                <div className="prose mt-8">
                  {/* code snipet */}
                  <div className="max-w-full md:max-w-2xl min-w-[100%] md:min-w-[25rem] bg-transparent rounded-md overflow-y-scroll h-[50vh] scrollbar-hide">
                    {article?.CodeE &&
                      article.CodeE.map((_el, _i) => (
                        <div key={_i}>
                          <div
                            className={`flex justify-between px-4 text-white text-xs items-center py-1 ${
                              lightTheme
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-500 text-black"
                            }`}
                          >
                            <p className="text-sm">Code snippet</p>
                            {copied ? (
                              <button className="py-1 inline-flex items-center gap-1">
                                <span className="text-base text-white">
                                  <BsFillCheckCircleFill />
                                </span>
                                copied
                              </button>
                            ) : (
                              <button
                                className="py-1 inline-flex items-center gap-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(_el?.code);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                }}
                              >
                                <span className="text-base text-white">
                                  <BsFillClipboard2Fill />
                                </span>
                                Copy code
                              </button>
                            )}
                          </div>
                          <SyntaxHighlighter
                            language="jsx"
                            style={atomOneDark}
                            wrapLongLines={true}
                          >
                            {_el?.code}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <h2
            className={`text-xl md:text-2xl font-bold ${
              lightTheme ? "text-zinc-800" : "text-zinc-100"
            } mt-4`}
          >
            Conclusion
          </h2>

          <div
            className={`text-sm md:text-base ${
              lightTheme ? "text-zinc-600" : "text-zinc-400"
            } mt-2`}
          >
            <p>{article && article?.conclusion}</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blogpost;
