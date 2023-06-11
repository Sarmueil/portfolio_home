import { useStoreContext } from "../context";

export const MobileTerms = () => {
  const { lightTheme } = useStoreContext();

  return (
    <div
      className={`${
        lightTheme ? "border-2" : "border-0"
      }  rounded-lg mt-5 px-4 py-4 md:hidden flex flex-col`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-[#33A1FD]">Meet Refael</h1>
        {/* <p className="text-zinc-800 text-sm">
        Code Simplified: Unraveling complexity, providing clear
        explanations for intricate lines of code.
      </p> */}
      </div>
      <div className="mt-3 w-full h-[60vh] overflow-y-scroll p-4 scrollbar-hide">
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          Meet Rafael, our AI-powered chatbot, powered by the advanced OpenAI
          Chat 3.5 Turbo model. Rafael offers intelligent and engaging
          conversations, providing quick and effortless access to the
          information you need. Whether you have questions, need
          recommendations, or simply want to chat, Rafael is here to assist you.
          It understands and responds to your queries in a natural and
          human-like manner, ensuring personalized interactions.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          Please remember that Rafael is designed for informational and
          entertainment purposes only. It should not replace professional advice
          or expertise. For specific queries or concerns, it is always
          recommended to consult a qualified professional. While Rafael utilizes
          the state-of-the-art OpenAI Chat 3.5 Turbo model, it is important to
          be aware that AI models have limitations. Therefore, use the
          information provided by Rafael at your own discretion.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          We strive to maintain the accuracy and reliability of Rafael's
          responses, but we cannot guarantee their correctness or timeliness. We
          do not accept responsibility for any actions taken based on Rafael's
          responses. Your interactions with Rafael may be recorded and monitored
          to enhance the chatbot's performance. By using Rafael, you consent to
          the collection and analysis of your interactions.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          To ensure a positive user experience, we have a zero-tolerance policy
          for abusive, offensive, or inappropriate language or behavior. Any
          violations may result in the termination of access to Rafael. We
          reserve the right to periodically update and improve Rafael's
          functionality, which may lead to changes in its behavior or responses.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          By using Rafael, you agree to indemnify and hold us harmless from any
          liabilities, damages, or losses arising from your use of the chatbot.
          We also reserve the right to modify or discontinue Rafael, either
          partially or entirely, without prior notice.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          By engaging with Rafael, you acknowledge that you have read and
          understood these terms of use and agree to comply with them during
          your interactions with the AI chatbot.
        </p>
      </div>
    </div>
  );
};

const Terms = () => {
  const { lightTheme } = useStoreContext();

  return (
    <div
      className={`${
        lightTheme ? "border-2" : "border-0"
      }  rounded-lg mt-5 px-4 py-4 md:flex flex-col hidden`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-[#33A1FD]">Meet Refael</h1>
        {/* <p className="text-zinc-800 text-sm">
        Code Simplified: Unraveling complexity, providing clear
        explanations for intricate lines of code.
      </p> */}
      </div>
      <div className="mt-3 w-full h-[60vh] overflow-y-scroll p-4 scrollbar-hide">
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          Meet Rafael, our AI-powered chatbot, powered by the advanced OpenAI
          Chat 3.5 Turbo model. Rafael offers intelligent and engaging
          conversations, providing quick and effortless access to the
          information you need. Whether you have questions, need
          recommendations, or simply want to chat, Rafael is here to assist you.
          It understands and responds to your queries in a natural and
          human-like manner, ensuring personalized interactions.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          Please remember that Rafael is designed for informational and
          entertainment purposes only. It should not replace professional advice
          or expertise. For specific queries or concerns, it is always
          recommended to consult a qualified professional. While Rafael utilizes
          the state-of-the-art OpenAI Chat 3.5 Turbo model, it is important to
          be aware that AI models have limitations. Therefore, use the
          information provided by Rafael at your own discretion.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          We strive to maintain the accuracy and reliability of Rafael's
          responses, but we cannot guarantee their correctness or timeliness. We
          do not accept responsibility for any actions taken based on Rafael's
          responses. Your interactions with Rafael may be recorded and monitored
          to enhance the chatbot's performance. By using Rafael, you consent to
          the collection and analysis of your interactions.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          To ensure a positive user experience, we have a zero-tolerance policy
          for abusive, offensive, or inappropriate language or behavior. Any
          violations may result in the termination of access to Rafael. We
          reserve the right to periodically update and improve Rafael's
          functionality, which may lead to changes in its behavior or responses.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          By using Rafael, you agree to indemnify and hold us harmless from any
          liabilities, damages, or losses arising from your use of the chatbot.
          We also reserve the right to modify or discontinue Rafael, either
          partially or entirely, without prior notice.
        </p>
        <p
          className={`${
            lightTheme ? "text-zinc-800" : "text-zinc-100"
          }  text-sm font-light`}
        >
          By engaging with Rafael, you acknowledge that you have read and
          understood these terms of use and agree to comply with them during
          your interactions with the AI chatbot.
        </p>
      </div>
    </div>
  );
};

export default Terms;
