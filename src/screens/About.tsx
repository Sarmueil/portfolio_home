import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
import { useStoreContext } from "../context";
import { useEffect, useState } from "react";
import { client, urlFor } from "../client";

const About = () => {
  interface HeroDataProps {
    aboutMeTitle: string;
    aboutMedescription: string[];
    aboutPagePicture: string;
    // Add other properties here if available
  }

  const { lightTheme } = useStoreContext();

  const [heroData, setHeroData] = useState<HeroDataProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const query = '*[_type == "heroData"]';
      setLoading(true);
      client.fetch(query).then((data: HeroDataProps[]) => {
        if (data?.length > 0) {
          setHeroData(data);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  return (
    <div className={`w-full ${lightTheme ? "bg-zinc-50" : "bg-black"}`}>
      <section
        className={`mx-auto ${
          lightTheme ? "bg-zinc-100" : "bg-zinc-900"
        } max-w-full md:max-w-6xl pb-2 md:pb-14`}
      >
        <Navbar isVisible={true} />
        <div className="mt-[5rem] md:mt-[9rem] px-4 md:px-12 w-full">
          <div className="max-w-full md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="w-full">
              {/* mobile-image */}
              <div className="w-[90%] h-[300px] rounded-xl mx-auto mb-[3.5rem] md:hidden block">
                <img
                  src={
                    heroData[0]?.aboutPagePicture &&
                    urlFor(heroData[0]?.aboutPagePicture)
                  }
                  loading="lazy"
                  alt="image"
                  className="w-full h-full object-cover rounded-xl aspect-square rotate-3"
                />
              </div>
              <h1
                className={`text-3xl md:text-4xl font-semibold tracking-tight ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                {heroData[0]?.aboutMeTitle}
              </h1>
              <div
                className={`mt-6 space-y-7 text-base ${
                  lightTheme ? "text-zinc-600" : "text-zinc-400"
                } font-light`}
              >
                {heroData[0]?.aboutMedescription?.map((_el, _i) => (
                  <p key={_i}>{_el}</p>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-7">
              <div className="w-[85%] h-[400px] rounded-xl mx-auto hidden md:block">
                <img
                  src={
                    heroData[0]?.aboutPagePicture &&
                    urlFor(heroData[0]?.aboutPagePicture)
                  }
                  loading="lazy"
                  alt="image"
                  className="w-full h-full object-cover rounded-xl aspect-square rotate-3"
                />
              </div>
              <div className="w-[80%] mt-6 mx-0 md:mx-auto space-y-5">
                <div className="flex items-center gap-3">
                  <AiFillTwitterCircle
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                  <a
                    className={`flex text-sm font-medium transition ${
                      lightTheme ? "text-zinc-600" : "text-zinc-200"
                    } hover:text-[#33A1FD]`}
                    href="https://twitter.com/VirgHSARM"
                    target="_blank"
                  >
                    Follow on Twitter
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <AiFillInstagram
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                  <a
                    className={`flex text-sm font-medium transition ${
                      lightTheme ? "text-zinc-600" : "text-zinc-200"
                    } hover:text-[#33A1FD]`}
                    href="https://www.instagram.com/sarmuiel/"
                    target="_blank"
                  >
                    Follow on Instagram
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <AiFillGithub
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                  <a
                    className={`flex text-sm font-medium transition ${
                      lightTheme ? "text-zinc-600" : "text-zinc-200"
                    } hover:text-[#33A1FD]`}
                    href="https://github.com/Sarmueil"
                    target="_blank"
                  >
                    Follow on GitHub
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <AiFillLinkedin
                    className={`text-[2rem] ${
                      lightTheme ? "text-zinc-600" : "text-zinc-400"
                    } cursor-pointer`}
                  />
                  <a
                    className={`flex text-sm font-medium transition ${
                      lightTheme ? "text-zinc-600" : "text-zinc-200"
                    } hover:text-[#33A1FD]`}
                    href="https://www.linkedin.com/in/adedoyin-samuel-adebisi-b8a72b191/"
                    target="_blank"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
              <div
                className={`border-t ${
                  lightTheme ? "border-zinc-300" : "border-zinc-700"
                }  mt-4`}
              >
                <div className="flex items-center gap-3 w-full justify-center mx-auto my-5">
                  <AiFillMail className="text-[1.5rem] text-zinc-400 cursor-pointer" />
                  <a
                    className={`flex text-sm font-medium transition ${
                      lightTheme ? "text-zinc-600" : "text-zinc-200"
                    } hover:text-[#33A1FD]`}
                    href="mailto:sarmuelypmd@gmail.com"
                  >
                    sarmuelypmd@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
