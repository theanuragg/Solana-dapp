import React, {FC} from "react";
import { useForm } from "@formspree/react";
import{TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import index from "pages";

export  const Footer: FC = ()=> {
  const [state, handleSubmit] = useForm("mzbnzpqr");

  if (state.succeeded) {
    return (
      <h1 className ="md:text-5xl/tight my-4 wax-w-lg text-4xl font-medium text-white">
       thanks for sending messae!
      </h1>
    );
  }
   const MenuOne = ["support center", "customer support", "About me"];
   const MenuTwo =["socail media", "Image & B-roll", "Site Map"];


  return(
    <footer className="bg-default-950/40 backdrop-blur-3xl">
      <div className="conatiner py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-3">
              <h5 className="text-default-200 mb-2 font-medium lg:text-lg xl:text-xl">
                About Us
              </h5>
              { MenuOne.map((item, index) =>{
                <li>
                  <a href="#" className="text=default-300 text-base transition-all hover:text-white">
                    <i data-lucide ="gauge-circle" className="me-2 incline-block h-4 w-4">
                    </i>
                    {item}
                  </a>
                </li>
              })}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-3">
              <h5 className="text-default-200 mb-2 font-medium lg:text-lg xl:text-xl">
                My Account
              </h5>
              {
                MenuTwo.map((item, index) =>{
                  <li key={index}>
                    <a href="#"className="text=default-300 text-base transition-all hover:text-white">
                     <i data-lucide ="gauge-circle" className="me-2 incline-block h-4 w-4">
                     </i>
                     {item}
                    </a>
                  </li>
                })
              }
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-6">
            <div className="bg-primary/20 rounded-xl">
              <div className="p-10">
                <h6 className="md-4 text-xl text-white">NewsLeter</h6>
                <p className="text-default-200 mb-6 text-base font-medium"> signup and recevied the latest Tips</p>

                <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                  <label htmlFor="email" className="bg-default-950/60 pe-40 ps-4 h-12 w-full rounded-lg border-white/10 py-4 tex-white backfrop-blur-3xl focus:border-white/10 focus:ring-0" />
                  <button type="submit" disabled ={state.submitting} className="hover:bg-primary-hover hover:border-primary-hover broder-primary bg-primary end-[6px] absolute top-[6px] incline-flexh-9 item-center justify-center gap-2 rounded-md px-6 text-white transition-all"> Subscribe </button>
                </form>
                <div>
                  <h6 className="mb-4 text-base text-white">Follow me </h6>
                  <ul className="flex flex-wrap item-center gap-1">{[
                    <TiSocialInstagram />,
                    <TiSocialTwitter />,
                    <TiSocialLinkedin /> 
                  ].map((social, index)=> (
                    <li key={index}>
                      <a href="#" className="hover:bg-primary group inline-flex h-10 w-10 items-center justify-center rounded-lg broder broder-white/10 transition-all duration-500">
                        <i data-lucide="instagram" className="test-default-300 group-hver:text-white">{social}</i>
                      </a>
                    </li>
                  ))}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*COPYRIGHT*/}
      <div className="broder-t broder-white/10 py-6">
      <div className="md:text-start container flex h-full flex-wrap items-center justify-center gap-4 text-center md:justify-between lg:px-20">
        <p className="text-default-400 text-base font-medium"> @ SOLANA
          <a href="#"> Design & Created 
            <i data-lucide=" heart" className="inline h-4 w-4 fill-red-500 tedxt-red-500"></i>
            by @theanurag
          </a> 
        </p>
        <p className="text-default-400 text-base font-meduim"> Terms & Condition </p>
      </div>
      </div>
    </footer>
  );

};

export default Footer