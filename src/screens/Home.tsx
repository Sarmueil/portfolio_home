import Navbar from "../components/Navbar";
import Logo from "../assets/portLogo.png";
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineArrowRight,
  AiFillMail,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { useStoreContext } from "../context";
import { useEffect, useRef, useState } from "react";
import { client, urlFor } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { dateFn, shortenString } from "../utils";
import emailjs from "@emailjs/browser";
import Resume from '../assets/Resume-new.pdf'

const Home = () => {
  interface HeroDataProps {
    title: string;
    description: string;
    profilePicture: string;
    // Add other properties here if available
  }

  interface WorkDataProps {
    workplaceName: string;
    workplaceRole: string;
    workplaceDate: string;
    workplaceLogo: string;
  }

  interface ArticlesProps {
    title: string;
    introduction: string;
    _id: string;
    slug: string;
    _createdAt: string;
  }

  const { lightTheme } = useStoreContext();

  const Navigate = useNavigate();

  const [heroData, setHeroData] = useState<HeroDataProps[]>([]);

  const [toolsData, setToolsData] = useState([]);

  const [workData, setWorkData] = useState<WorkDataProps[]>([]);

  const [articles, setArticles] = useState<ArticlesProps[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  const getHeroData = async () => {
    try {
      const query = '*[_type == "heroData"]';
      await client.fetch(query).then((data: HeroDataProps[]) => {
        if (data?.length > 0) {
          setHeroData(data);
        }
      });
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const getToolsData = async () => {
    try {
      const query = '*[_type == "toolsData"]';
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          setToolsData(data[0]?.toolPicture);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getWorkData = async () => {
    try {
      const query = '*[_type == "workData"]';
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          setWorkData(data);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getArticleData = async () => {
    try {
      const query = '*[_type == "articlesData"]';
      setDataLoading(true);
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          // Sort articles by _createdAt in descending order
          const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a._createdAt);
            const dateB = new Date(b._createdAt);
            return dateB.getTime() - dateA.getTime();
          });
          setArticles(sortedData);
          setDataLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getHeroData();
    getToolsData();
    getWorkData();
    getArticleData();
  }, []);

  const form = useRef<HTMLFormElement>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (form.current) {
      emailjs
        .sendForm(
          "service_lu5dkso",
          "template_o266zio",
          form.current,
          "kdA4B9CXCgH0gJ2oD"
        )
        .then(
          (result) => {
            console.log(result.text);
            setDone(true);
            setLoading(false);
            if (form.current) {
              form.current.reset();
              setLoading(false);
              // Set done back to false after 3 seconds
              setTimeout(() => {
                setDone(false);
              }, 3000);
            }
          },
          (error) => {
            console.log(error.text);
            setLoading(false);
            setDone(false);
          }
        );
    }
  };

  return (
    <>
      <div className={`w-full ${lightTheme ? "bg-zinc-50" : "bg-black"}`}>
        <section
          className={`mx-auto ${
            lightTheme ? "bg-zinc-100" : "bg-zinc-900"
          } max-w-full md:max-w-6xl pb-14`}
        >
          <Navbar isVisible={false} />
          <div className="mt-[4rem] px-4 md:px-12 w-full">
            <div className="max-w-full md:max-w-5xl mx-auto">
              {dataLoading && (
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
              <div className="w-16 h-16 rounded-full bg-black cursor-pointer">
                <img
                  src={
                    heroData[0]?.profilePicture
                      ? urlFor(heroData[0]?.profilePicture)
                      : Logo
                  }
                  alt="logoimage"
                  className="object-cover w-full rounded-full"
                />
              </div>
              <div className="mt-7 w-full md:w-[70%]">
                <h1
                  className={`text-3xl md:text-[3rem] leading-1 md:leading-[4rem] ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  } font-semibold tracking-tight`}
                >
                  {heroData[0]?.title ||
                    "Software Engineer, Tech writer and UI/UX designer"}
                </h1>
              </div>
              <div className="mt-6 w-full md:w-[70%]">
                <p
                  className={`${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } text-sm md:text-[18px] tracking-wide font-extralight md:font-light`}
                >
                  {heroData[0]?.description ||
                    "Hi, I'm Samuel, a software engineer, tech content writer, and UI/UX designer based in Lagos, Nigeria. With a strong emphasis on smooth user experience and responsive user interfaces, I specialize in delivering high-quality frontend development work that ensures an exceptional user experience."}
                </p>
              </div>
              <div className="flex items-center gap-6 mt-6 text-white w-[70%]">
                <Link to="https://twitter.com/VirgHSARM">
                  <AiFillTwitterCircle
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                </Link>
                <Link to="https://github.com/Sarmueil">
                  <AiFillGithub
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                </Link>
                <Link to="https://www.instagram.com/sarmuiel/">
                  <AiFillInstagram
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                </Link>
                <Link to="https://www.linkedin.com/in/adedoyin-samuel-adebisi-b8a72b191/">
                  <AiFillLinkedin
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className={lightTheme ? "bg-zinc-50" : "bg-black"}>
          <div
            className={`mx-auto ${
              lightTheme
                ? "bg-zinc-100 text-zinc-800"
                : "bg-zinc-900 text-zinc-100"
            } max-w-full md:max-w-6xl pb-[30rem] font-semibold px-7 md:px-12 w-full`}
          >
            <div className="max-w-full md:max-w-5xl text-[1.5rem] md:text-[2rem]">
              Stacks Spolight
            </div>
          </div>
          <Carousel data={toolsData} />
        </section>
        <section className={lightTheme ? "bg-zinc-50" : "bg-black"}>
          <div
            className={`mx-auto ${
              lightTheme ? "bg-zinc-100" : "bg-zinc-900"
            } max-w-full md:max-w-6xl pb-[5rem] md:pb-[8rem]`}
          >
            <div className="mx-auto max-w-full md:max-w-5xl">
              <div
                className={`text-[1.5rem] md:text-[2rem] ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                } font-semibold py-6 pl-7 md:pl-0`}
              >
                Articles
              </div>
              <div className="mt-2 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 md:gap-7">
                  {articles &&
                    articles?.slice(0, 3).map((_el) => (
                      <article
                        className={`flex flex-col gap-4 relative items-start px-6 md:px-6 py-6 border ${
                          lightTheme
                            ? "border-zinc-200 hover:bg-zinc-200"
                            : "border-zinc-900 hover:bg-zinc-800"
                        } rounded-lg w-full transition-all ease-in-out duration-500 shadow-md`}
                        key={_el?._id}
                      >
                        <p
                          className={`text-sm ${
                            lightTheme ? "text-zinc-400" : "text-zinc-500"
                          } font-semibold`}
                        >
                          | {dateFn(_el?._createdAt)}
                        </p>
                        <p
                          className={` ${
                            lightTheme ? "text-zinc-800" : "text-zinc-100"
                          } text-base font-semibold tracking-tight`}
                        >
                          {_el?.title}
                        </p>
                        <p
                          className={`mt-2 text-xs md:text-[0.9rem] ${
                            lightTheme
                              ? "text-zinc-600 font-light"
                              : "text-zinc-400 font-extralight"
                          } tracking-wide`}
                        >
                          {shortenString(_el?.introduction, 300)}
                        </p>
                        <div
                          className="flex items-center mt-1 md:mt-2 cursor-pointer gap-2"
                          onClick={() => Navigate(`/blog/${_el?.slug}`)}
                        >
                          <p className="text-sm font-medium text-[#33A1FD]">
                            Read article
                          </p>
                          <AiOutlineArrowRight className="text-[#33A1FD] text-sm" />
                        </div>
                      </article>
                    ))}
                </div>

                <div className="flex flex-col gap-4 md:gap-8 w-full">
                  <div
                    className={`border ${
                      lightTheme ? "border-zinc-200" : "border-zinc-700"
                    }  rounded-2xl w-[95%] md:w-[80%] p-6 ml-0 md:ml-[1rem] self-center md:self-end`}
                  >
                    <div className="flex items-center gap-3">
                      <BsFillBriefcaseFill className="text-[1.5rem] text-zinc-500" />
                      <h2
                        className={`${
                          lightTheme ? "text-zinc-800" : "text-zinc-100"
                        } text-base`}
                      >
                        Work experience
                      </h2>
                    </div>
                    <div className="flex flex-col gap-9 mt-7 w-full overflow-y-scroll scrollbar-hide h-[75%]">
                      {workData &&
                        workData?.map((_el, _i) => (
                          <section className="flex items-center gap-4" key={_i}>
                            <div className="w-10 h-10 rounded-full cursor-pointer">
                              <img
                                src={
                                  _el?.workplaceLogo &&
                                  urlFor(_el?.workplaceLogo)
                                }
                                alt="logoimage"
                                className="object-contain w-full h-full rounded-full"
                              />
                            </div>
                            <div className="w-full text-center">
                              <p
                                className={`text-sm ${
                                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                                } font-medium`}
                              >
                                {_el?.workplaceName}
                              </p>
                              <div className="flex items-center flex-col w-full">
                                <p
                                  className={`text-sm ${
                                    lightTheme
                                      ? "text-zinc-500"
                                      : "text-zinc-600"
                                  }`}
                                >
                                  {_el?.workplaceRole}
                                </p>
                                <p
                                  className={`text-sm ${
                                    lightTheme
                                      ? "text-zinc-500"
                                      : "text-zinc-600"
                                  }`}
                                >
                                  {_el?.workplaceDate}
                                </p>
                              </div>
                            </div>
                          </section>
                        ))}
                    </div>

                    <div
                      className={`${
                        lightTheme ? "bg-zinc-200" : "bg-zinc-800"
                      }  w-full rounded-xl text-center mt-2 py-3 shadow-md`}
                    >
                      <a href={Resume} target="_blank">
                        {" "}
                        <p
                          className={`${
                            lightTheme ? "text-zinc-800" : "text-zinc-100"
                          } text-sm font-medium cursor-pointer`}
                        >
                          {" "}
                          Download CV{" "}
                        </p>
                      </a>
                    </div>
                  </div>

                  <div
                    className={`relative border ${
                      lightTheme ? "border-zinc-200" : "border-zinc-700"
                    } rounded-2xl w-[95%] md:w-[80%] p-6 ml-0 md:ml-[1rem] self-center md:self-end`}
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

                    <div className="flex items-center gap-3">
                      <AiFillMail className="text-[1.5rem] text-zinc-500" />
                      <h2
                        className={`${
                          lightTheme ? "text-zinc-800" : "text-zinc-100"
                        } text-base`}
                      >
                        Get in touch.
                      </h2>
                    </div>
                    <p
                      className={`mt-2 ${
                        lightTheme ? "text-zinc-600" : "text-zinc-400"
                      } text-sm font-light`}
                    >
                      Exploring collaborative opportunities to bring my software
                      design expertise in solving real-world business problems.
                      Let's create something great!
                    </p>

                    {!done && (
                      <form ref={form} onSubmit={sendEmail}>
                        <div className="mt-4 flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              name="user_name"
                              className={`border ${
                                lightTheme
                                  ? "border-zinc-200 text-zinc-800"
                                  : "border-zinc-700 text-zinc-100"
                              } rounded-lg p-3 text-xs  bg-transparent w-full outline-none`}
                              placeholder="Name"
                            />
                            <input
                              type="email"
                              name="user_email"
                              className={`border ${
                                lightTheme
                                  ? "border-zinc-200 text-zinc-800"
                                  : "border-zinc-700 text-zinc-100"
                              } rounded-lg p-3 text-xs bg-transparent w-full outline-none`}
                              placeholder="Email"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              name="message"
                              className={`w-full border ${
                                lightTheme
                                  ? "border-zinc-200 text-zinc-800"
                                  : "border-zinc-700 text-zinc-100"
                              } rounded-lg p-3 text-xs text-zinc-100 bg-transparent outline-none flex-[70%] shadow-md`}
                              placeholder="Your message"
                            />
                            <button
                              className="flex-[30%] w-full bg-zinc-800 text-zinc-100 text-xs font-medium p-3 rounded-lg"
                              type="submit"
                              disabled={loading}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                    {done && !loading && (
                      <div className="my-8 flex gap-2 items-center w-full">
                        <h2
                          className={`text-base text-zinc-100 ${
                            lightTheme ? "text-zinc-600" : "text-zinc-400"
                          }`}
                        >
                          Message received. Will reply shortly. Thanks!
                        </h2>
                        <AiFillCheckCircle className="text-[#33A1FD] text-5xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
