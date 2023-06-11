import Navbar from "../components/Navbar";
import Logo from "../assets/portLogo.png";
import { AiOutlineLink } from "react-icons/ai";
import Footer from "../components/Footer";
import { useStoreContext } from "../context";
import { useEffect, useState } from "react";
import { client, urlFor } from "../client";
import { shortenString } from "../utils";
import { Link } from "react-router-dom";

const Projects = () => {
  interface ProjectDataProps {
    projectLogoImage: string;
    projectOverview: string;
    projectName: string;
    projectDemoImage: string;
    projectDescription: string;
    projectCodeLink: string;
    projectLiveLink: string;
    projectStacks: string[];
    projectHighlight: string;
  }

  interface ProjectFeatureProps {
    projectFeatureTitle: string;
    projectType: string;
    _id: string;
    projectFeatureDescription: string;
    projectFeatureImage: string;
  }

  const { lightTheme } = useStoreContext();
  const [open, setOpen] = useState(false);
  const [projectdata, setProjectData] = useState<ProjectDataProps[]>([]);
  const [project, setProject] = useState<ProjectDataProps | null>(null);
  const [projectFeatures, setProjectFeatures] = useState<ProjectFeatureProps[]>(
    []
  );
  const [features, setFeatures] = useState<ProjectFeatureProps[]>([]);
  const [loading, setLoading] = useState(false);

  const getProjectData = async () => {
    try {
      const query = '*[_type == "projectsData"]';
      setLoading(true);
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          setProjectData(data);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getProjectFeatures = async () => {
    try {
      const query = '*[_type == "projectFeatures"]';
      await client.fetch(query).then((data) => {
        if (data?.length > 0) {
          setProjectFeatures(data);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filterProjectName = (name: string) => {
    const filteredData = projectdata?.find((_el) => _el?.projectName === name);
    if (filteredData) setProject(filteredData);
    return;
  };

  const filterProjectFeatures = (name: string) => {
    const filteredData = projectFeatures?.filter(
      (_el) => _el?.projectType === name.toLowerCase()
    );
    if (filteredData) setFeatures(filteredData);
    return;
  };

  useEffect(() => {
    getProjectData();
    getProjectFeatures();
  }, []);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className={`absolute inset-0 ${
              lightTheme ? "bg-zinc-800/40" : "bg-black/80"
            } backdrop-blur-sm`}
            onClick={() => setOpen(false)}
          ></div>
          <div
            className={`relative z-10 ${
              lightTheme ? "bg-white" : "bg-black"
            } px-8 py-6 md:py-8 rounded-lg shadow-lg w-[90%] md:w-[800px] h-[80vh] overflow-y-scroll scrollbar-hide`}
          >
            <div className="flex flex-col gap-4">
              <h2
                className={`text-xl md:text-2xl font-bold tracking-wide ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                {project?.projectName || ""}
              </h2>
              <div
                className={`rounded-xl w-full h-[20vh] md:h-[40vh] ${
                  lightTheme ? "bg-black" : "bg-zinc-100"
                }`}
              >
                <img
                  src={
                    project?.projectDemoImage &&
                    urlFor(project?.projectDemoImage)
                  }
                  alt="image"
                  className="object-contain w-full h-full rounded-xl"
                />
              </div>
              <p
                className={`text-sm md:text-base font-semibold ${
                  lightTheme ? "text-zinc-600" : "text-zinc-100"
                }`}
              >
                {project?.projectOverview}
              </p>
              <p
                className={`text-sm md:text-base font-extralight ${
                  lightTheme ? "text-zinc-600" : "text-zinc-100"
                }`}
              >
                {project?.projectDescription || ""}
              </p>
              <div className="ml-2">
                <h2
                  className={`text-sm md:text-base font-bold tracking-wide ${
                    lightTheme ? "text-zinc-800" : "text-zinc-100"
                  }`}
                >
                  Explore project at
                </h2>
                <div
                  className={`flex items-center ${
                    lightTheme ? "text-zinc-500" : "text-zinc-100"
                  } text-sm md:text-base font-medium gap-2 cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-500`}
                >
                  <AiOutlineLink className="text-lg" />
                  <a href={project?.projectCodeLink || "#"} target="_blank">
                    {project?.projectCodeLink}
                  </a>
                </div>
                <div
                  className={`flex items-center ${
                    lightTheme ? "text-zinc-500" : "text-zinc-100"
                  } text-sm md:text-base font-medium gap-2 cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-500`}
                >
                  <AiOutlineLink className="text-lg" />
                  <a href={project?.projectLiveLink || "#"} target="_blank">
                    {project?.projectLiveLink}
                  </a>
                </div>
              </div>
              <h2
                className={`text-base md:text-xl font-bold tracking-wide ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                Technologies used
              </h2>
              {project?.projectStacks &&
                project?.projectStacks.map((_el, _i) => (
                  <ul
                    className={`${
                      lightTheme ? "text-[#33A1FD]" : "text-[#33A1FD]"
                    } font-medium text-sm md:text-base`}
                    key={_i}
                  >
                    <li>{_el}</li>
                  </ul>
                ))}
              <h2
                className={`text-base md:text-xl font-bold tracking-wide ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                Project Features
              </h2>
              {features &&
                features?.map((_el) => (
                  <div className="w-full flex flex-col gap-3" key={_el?._id}>
                    <div
                      className={`rounded-xl w-full h-[20vh] md:h-[40vh] ${
                        lightTheme ? "bg-black" : "bg-zinc-100"
                      }`}
                    >
                      <img
                        src={
                          _el?.projectFeatureImage &&
                          urlFor(_el?.projectFeatureImage)
                        }
                        alt="image"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <h2
                      className={`text-sm md:text-base font-bold tracking-wide ${
                        lightTheme ? "text-zinc-800" : "text-zinc-100"
                      }`}
                    >
                      {_el?.projectFeatureTitle}
                    </h2>
                    <p
                      className={`text-sm md:text-base font-extralight ${
                        lightTheme ? "text-zinc-600" : "text-zinc-100"
                      }`}
                    >
                      {_el?.projectFeatureDescription}
                    </p>
                  </div>
                ))}

              <h2
                className={`text-base md:text-xl font-bold tracking-wide ${
                  lightTheme ? "text-zinc-800" : "text-zinc-100"
                }`}
              >
                Major Highlights
              </h2>
              <p
                className={`text-sm md:text-base font-extralight  ${
                  lightTheme ? "text-zinc-600" : "text-zinc-100"
                }`}
              >
                {project?.projectHighlight}
              </p>
            </div>
          </div>
        </div>
      )}
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
                  Striving for impactful outcomes, my projects span diverse
                  domains.
                </h1>
                <div
                  className={`mt-6 space-y-7 text-base ${
                    lightTheme ? "text-zinc-600" : "text-zinc-400"
                  } font-light`}
                >
                  <p>
                    Throughout the years, I've devoted myself to numerous small
                    and large projects, but these are the ones that fill me with
                    the greatest pride. Many of them are open-source, so feel
                    free to explore the code and contribute your ideas for
                    further enhancements.
                  </p>
                </div>
              </div>

              <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto py-2 h-full">
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
                {projectdata &&
                  projectdata.map((_el, _i) => (
                    <div
                      className={`${
                        lightTheme ? "hover:bg-zinc-200" : "hover:bg-zinc-800"
                      } rounded-2xl flex flex-col gap-2 px-6 py-4 transition-all ease-in-out duration-500 shadow-md`}
                      key={_i}
                    >
                      <Link to={_el?.projectLiveLink}>
                        <div className="w-12 h-12 rounded-full bg-black cursor-pointer">
                          <img
                            src={
                              _el?.projectLogoImage
                                ? urlFor(_el?.projectLogoImage)
                                : Logo
                            }
                            alt="logoimage"
                            className="object-contain w-full h-full rounded-full"
                          />
                        </div>
                      </Link>
                      <h2
                        className={`text-base font-medium ${
                          lightTheme ? "text-zinc-800" : "text-zinc-100"
                        }`}
                      >
                        {_el?.projectName}
                      </h2>
                      <p
                        className={`text-sm font-light ${
                          lightTheme ? "text-zinc-600" : "text-zinc-400"
                        }`}
                      >
                        {shortenString(_el?.projectOverview, 200) || ""}
                      </p>
                      <button
                        className="outline-none border-none px-4 py-2 text-zinc-100 bg-[#33A1FD] text-sm rounded-xl mt-2"
                        onClick={() => {
                          setOpen(true);
                          filterProjectName(_el?.projectName);
                          filterProjectFeatures(_el?.projectName);
                        }}
                      >
                        View more about project
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
