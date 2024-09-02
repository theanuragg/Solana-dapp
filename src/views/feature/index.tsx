import React, {FC} from "react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { MdGeneratingTokens, MdToken } from "react-icons/md";
import {RiTokenSwapFill} from "react-icons/ri";
import {RxTokens} from "react-icons/rx";


const index =({ setOpenAirdrop, setOpenContact, setOpencreatemodal, setOpenSendTransaction, setOpenTokenMetaData,}) => {
   
  const features =[{
     name:"Token Generator",
     icon: <MdGeneratingTokens />,
     description:"start Working with solana token creator, It allow you to create solana token by creating, deploying, airdrop, transfering and updating token",
     function: setOpencreatemodal,
    },{
      name:"Get Airdrop",
      icon: <MdToken />,
      description:"start Working with solana token creator, It allow you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenAirdrop,
    },{
      name:"Transfer SoL",
      icon: <RiTokenSwapFill/>,
      description:"start Working with solana token creator, It allow you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenSendTransaction,
    },{
        name:"Token MetaData",
        icon: <RxTokens />,
        description:"start Working with solana token creator, It allow you to create solana token by creating, deploying, airdrop, transfering and updating token",
        function: setOpenTokenMetaData,
    },
  ];

  return <section className="py-20">
    <div className="container">
      <div className="mb-10 flex items-end justify-between">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-medium capitalize text-white"> choose solana blockcchain</h2>
          <p className="text-default-200 text-sm font-medium"> Now you can create Solana Token to Without code instantly</p>
        </div>
      </div>
      <div className="bg-deafult-950/40 flex flex-wrap item-center rounded-3xl backdrop-blur-3xl">{
        features.map((list, index) =>(
          <div  key ={index}className={`w-auto grow broder-b broder-white/10 md:w-1/2 ${index ==0 ?"md:broder-e": index==1?"": index==2? "":""}`}>
            <div className="p-8 sm:p-10">
              <div className="bg-primary/10 text-primary mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl">
               <i data-lucide="framer">{list.icon}</i>
              </div>
              <h2 className="mb-4 text-2xl font-medium text-white">{list.name}</h2>
              <p className="text-default-200 mb-6 text-base">{list.description}</p>
              <a onClick={() => list.function (true)} className="hover:bg-primary inline-flex items-center hustify-center gap-2 rounded-full broder broder-white/10 px-6 py-2 text-white transition-all duration-300"> Use Tools
                <i>
                  <LuArrowRightFromLine />
                </i>
              </a>          </div>
          </div>
        ))
      }</div>
    </div>
  </section> 
}