import Logo from "../assets/portLogo.png";
import { ImSun } from "react-icons/im";
import { AiOutlineDown } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useStoreContext } from "../context";
import { BsFillMoonFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { client, urlFor } from "../client";

interface navBarProps {
  isVisible: boolean;
}

const Navbar: React.FC<navBarProps> = ({ isVisible }) => {
  interface HeroDataProps {
    profilePicture: string;
    // Add other properties here if available
  }

  const location = useLocation();

  const [heroData, setHeroData] = useState<HeroDataProps[]>([]);

  useEffect(() => {
    const query = '*[_type == "heroData"]';
    client.fetch(query).then((data: HeroDataProps[]) => {
      if (data?.length > 0) {
        setHeroData(data);
      }
    });
  }, []);

  const {
    lightTheme,
    switchLightTheme,
    switchDarkTheme,
    open,
    openModal,
    closenModal,
  } = useStoreContext();

  return (
    <>
      {open && (
        <div
          className={`w-[100vw] ${
            lightTheme ? "bg-zinc-800/40" : "bg-black/80"
          } h-screen fixed inset-0 z-50 backdrop-blur-sm`}
        >
          <div
            className={`fixed inset-x-4 top-8 z-50 origin-top rounded-3xl p-8 ring-1 ${
              lightTheme
                ? "ring-zinc-900/5 bg-white"
                : "ring-zinc-800 bg-zinc-900"
            }  opacity-100 scale-100`}
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <button
                aria-label="Close menu"
                className="-m-1 p-1"
                type="button"
                onClick={() => closenModal()}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-6 w-6 ${
                    lightTheme ? "text-zinc-500" : "text-zinc-400"
                  }`}
                >
                  <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <h2
                className={`text-sm font-medium ${
                  lightTheme ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul
                className={`my-2 divide-y text-base ${
                  lightTheme
                    ? "divide-zinc-100 text-zinc-800"
                    : "divide-zinc-100/5 text-zinc-300"
                }`}
                onClick={() => closenModal()}
              >
                <Link to="/about">
                  {" "}
                  <li className="block py-2">About</li>
                </Link>
                <Link to="/articles">
                  {" "}
                  <li className="block py-2">Articles</li>
                </Link>
                <Link to="/projects">
                  {" "}
                  <li className="block py-2">Projects</li>
                </Link>
                <Link to="/skills">
                  {" "}
                  <li className="block py-2">Skillset</li>
                </Link>
                <Link to="/uses">
                  {" "}
                  <li className="block py-2">Uses</li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <div className="text-white px-4 md:px-12 pt-6 w-full">
        <div className="max-w-5xl flex justify-between gap-4 mx-auto">
          <div className="flex-1 w-full">
            {isVisible && (
              <Link to="/">
                <div className="w-10 h-10 rounded-full bg-black cursor-pointer">
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
              </Link>
            )}
          </div>
          <div
            className={`hidden md:flex flex-1 w-full rounded-full items-center justify-center shadow-md ${
              lightTheme
                ? "bg-zinc-100 text-zinc-800"
                : "bg-zinc-800  text-zinc-100"
            } gap-5 px-8 text-base font-medium`}
          >
            <Link
              to="/about"
              className={`cursor-pointer ${
                location?.pathname === "/about" && "text-[#33A1FD]"
              } hover:text-[#33A1FD] transition-all ease-in-out duration-300`}
            >
              About
            </Link>
            <Link
              to="/articles"
              className={`cursor-pointer ${
                location?.pathname === "/articles" && "text-[#33A1FD]"
              } hover:text-[#33A1FD] transition-all ease-in-out duration-300`}
            >
              Articles
            </Link>
            <Link
              to="/projects"
              className={`cursor-pointer ${
                location?.pathname === "/projects" && "text-[#33A1FD]"
              } hover:text-[#33A1FD] transition-all ease-in-out duration-300`}
            >
              Projects
            </Link>
            <Link
              to="/skills"
              className={`cursor-pointer ${
                location?.pathname === "/skills" && "text-[#33A1FD]"
              } hover:text-[#33A1FD] transition-all ease-in-out duration-300`}
            >
              Skillset
            </Link>
            <Link
              to="/uses"
              className={`cursor-pointer  ${
                location?.pathname === "/uses" && "text-[#33A1FD]"
              } hover:text-[#33A1FD] transition-all ease-in-out duration-300`}
            >
              Uses
            </Link>
          </div>
          <div className="flex-1 w-full justify-end flex items-center gap-2">
            <div
              className={`md:hidden flex items-center px-4 py-2 rounded-2xl ${
                lightTheme ? "bg-zinc-100" : "bg-zinc-800"
              } gap-2 cursor-pointer border shadow ${
                lightTheme ? "border-zinc-100" : "border-zinc-800"
              }`}
              onClick={() => openModal()}
            >
              <p
                className={`text-sm ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                Menu
              </p>
              <AiOutlineDown className="text-[10px] text-zinc-500" />
            </div>
            {lightTheme ? (
              <div
                className="bg-zinc-100 p-2 cursor-pointer hover:shadow-lg hover:shadow-slate-600 rounded-full transition-all ease-in-out duration-500 border"
                onClick={() => switchDarkTheme()}
              >
                <ImSun className="text-[20px] md:text-[25px] text-[#33A1FD]" />
              </div>
            ) : (
              <div
                className="bg-zinc-800 p-2 cursor-pointer hover:shadow-lg hover:shadow-slate-600 rounded-full transition-all ease-in-out duration-500"
                onClick={() => switchLightTheme()}
              >
                <BsFillMoonFill className="text-[20px] md:text-[25px] text-zinc-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
