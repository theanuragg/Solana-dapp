import React, { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";

interface ToolViewProps {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpencreatemodal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
  setOpenTokenMetaData: (open: boolean) => void;
}

export const ToolView: FC<ToolViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpencreatemodal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const tools = [
    {
      name: "Create token",
      icon: <MdGeneratingTokens />,
      action: setOpencreatemodal,
    },
    {
      name: "Token MetaData",
      icon: <MdGeneratingTokens />,
      action: setOpenTokenMetaData,
    },
    {
      name: "Contact Us",
      icon: <MdGeneratingTokens />,
      action: setOpenContact,
    },
    {
      name: "Airdrop",
      icon: <MdGeneratingTokens />,
      action: setOpenAirdrop,
    },
    {
      name: "Send Transaction",
      icon: <MdGeneratingTokens />,
      action: setOpenSendTransaction,
    },
    {
      name: "Buddy token",
      icon: <MdGeneratingTokens />,
      action: setOpencreatemodal,
    },
    {
      name: "Top token",
      icon: <MdGeneratingTokens />,
      action: setOpencreatemodal,
    },
    {
      name: "Solana explorer",
      icon: <MdGeneratingTokens />,
      action: setOpencreatemodal,
    },
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">Solana tools</h2>
            <p className="text-default-200 text-sm font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias fuga inventore <br />
              nulla minima? Ipsa, veniam, totam accusantium unde cumque incidunt rem in id quia tenetur at nam? Incidunt, ratione dignissimos!
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-default-950/40 rounded-xl backdrop-blur-3xl cursor-pointer"
              onClick={() => tool.action(true)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 ${
                      index === 0 ? "text-red-500"
                      : index === 1 ? "text-red-500"
                      : index === 2 ? "text-indigo-500"
                      : index === 3 ? "text-yellow-500"
                      : "text-teal-500"
                    }`}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="text-default-200 text-xl font-medium">{tool.name}</h3>
                </div>
                <a className="text-primary group relative inline-flex items-center gap-2">
                  <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-500 group-hover:w-full"></span>
                  Select & Try
                  <i data-lucide={"move-right"}>
                    <LuArrowRightFromLine />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a className="hover:bg-primary-hover bg-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-white transition-all duration-500">
            <IoIosArrowForward />
          </a>
        </div>
      </div>
    </section>
  );
};
