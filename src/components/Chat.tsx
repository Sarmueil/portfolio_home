import { AiFillCloseCircle, AiFillMessage } from "react-icons/ai";
import { useStoreContext } from "../context";
import { useEffect, useRef, useState } from "react";
import Rafeal from "../assets/rafeal.jpg";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";
import Terms from "./Terms";
import { MobileTerms } from "./Terms";

const Chat = () => {
  const { lightTheme } = useStoreContext();
  const [open, setOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [chatLogs, setChatLogs] = useState<{ type: string; message: string }[]>(
    []
  );
  const [chatLoading, setChatLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    } 
  }, [chatLogs]);

  const sendMessage = async (message: string) => {
    try {
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      };
      const data = {
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: message }], // Wrap the message object in an array
      };

      setChatLoading(true);
      await axios.post(url, data, { headers: headers }).then((response) => {
        setChatLogs((prev) => [
          ...prev,
          {
            type: "Rafael",
            message: response?.data?.choices[0]?.message.content,
          },
        ]);
        setChatLoading(false);
      });
    } catch (error) {
      setChatLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatLogs((prev) => [...prev, { type: "user", message: inputVal }]);
    setInputVal("");
    sendMessage(inputVal);
  };

  return (
    <>
      {/* work need to be done on the meet rapheal button on mobile setting showTerms to true affecting the display on desktop */}
      {/* chat widget */}
      <div
        className={`${
          lightTheme ? "bg-zinc-800" : "bg-zinc-100"
        } cursor-pointer hover:shadow-lg hover:shadow-slate-600 rounded-full transition-all ease-in-out duration-500 fixed top-[87%] md:top-[85%] left-[80%] md:left-[94%] w-[3.5rem] md:w-[4.5rem] h-[3.5rem] md:h-[4.5rem] flex items-center justify-center z-[999]`}
        onClick={() => setOpen(true)}
      >
        <AiFillMessage className="text-[2rem] md:text-[2.5rem] text-[#33A1FD]" />
      </div>
      {/* chat widget */}

      {/* chat modal */}
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
              lightTheme ? "bg-zinc-100" : "bg-black"
            } px-3 md:px-8 py-6 md:py-8 rounded-2xl shadow-lg w-[98%] md:w-[980px]`}
          >
            <div className="w-full flex justify-end items-center gap-3">
              {showTerms ? (
                <button
                  className="md:hidden text-zinc-100 text-base bg-[#33A1FD] px-3 py-2 rounded-lg"
                  onClick={() => setShowTerms(false)}
                >
                  Chat me!
                </button>
              ) : (
                <button
                  className="md:hidden text-zinc-100 text-base bg-[#33A1FD] px-3 py-2 rounded-lg"
                  onClick={() => setShowTerms(true)}
                >
                  Meet Rafael
                </button>
              )}
              {!showTerms && (
                <AiFillCloseCircle
                  className={`text-[2rem] ${
                    lightTheme ? "text-zinc-900" : "text-[#33A1FD]"
                  } cursor-pointer`}
                  onClick={() => setOpen(false)}
                />
              )}
            </div>

            {showTerms ? (
              <MobileTerms />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-2">
                <div
                  className={`shadow-xl rounded-3xl flex flex-col ${
                    lightTheme ? "border-0" : "border"
                  } border-zinc-800`}
                >
                  <div className="py-7 px-4 bg-zinc-800 flex items-center w-full text-zinc-100 shadow-lg rounded-t-3xl gap-2">
                    <div className="w-full h-16 rounded-full flex-[15%] bg-black">
                      <img
                        src={Rafeal}
                        alt="logoimage"
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="px-3 flex-[85%] w-full">
                      <h2 className="text-zinc-100 text-lg font-semibold">
                        Chat me!
                      </h2>
                      <p className="text-zinc-100 font-light text-sm md:text-base">
                        Hi, I'm Rafael, your Personal AI Assistant. Need
                        answers? I'm here to assist you, particularly in the
                        world of tech.
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col">
                    <div
                      className="flex-grow p-6 h-[40vh] overflow-y-scroll scrollbar-hide"
                      ref={scrollContainerRef}
                    >
                      <div className="flex flex-col space-y-4">
                        {chatLogs.map((log, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              log?.type === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`${
                                log?.type === "user"
                                  ? "bg-[#33A1FD] text-zinc-100"
                                  : "bg-zinc-100 text-zinc-800"
                              } rounded-lg shadow-md p-3 md:p-4 max-w-sm text-sm md:text-base`}
                            >
                              <span className="text-[#33A1FD] font-bold">
                                {log.type !== "user" && `${log?.type}:`}
                              </span>{" "}
                              {log.message}
                            </div>
                          </div>
                        ))}
                        {chatLoading && (
                          <div
                            key={chatLogs.length}
                            className="flex justify-start"
                          >
                            <div className="bg-zinc-100 shadow-md rounded-lg p-4 text-zinc-800 max-w-sm">
                              <TypingAnimation />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-none p-6">
                      <div className="flex rounded-lg  shadow-md">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className={`border-none outline-none flex-grow px-4 py-2 bg-transparent ${
                            lightTheme ? "text-zinc-800" : "text-zinc-100"
                          }`}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="bg-[#33A1FD] text-zinc-100 px-4 py-2 rounded-lg focus:outline-none font-semibold hover:bg-zinc-800 transition-all ease-in-out duration-500"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {!showTerms && <Terms />}
              </div>
            )}
          </div>
        </div>
      )}
      {/* chat modal */}
    </>
  );
};

export default Chat;
