import React, { FC, useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
// Internal import components
import { InputView } from "../input";
import Branding from "../../components/Branding";

interface TokenMetadataProps {
  setOpenTokenMetaData: (open: boolean) => void;
}

export const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<any>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getMetadata = useCallback(async (form: string) => {
    setIsLoading(true);
    try {
      const tokenMint = new PublicKey(form);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          tokenMint.toBuffer(),
        ],
        PROGRAM_ID
      )[0];

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      if (!metadataAccount) {
        throw new Error("Metadata account not found");
      }

      const [metadata] = Metadata.deserialize(metadataAccount.data);
      const logoRes = await fetch(metadata.data.uri);
      const logoJson = await logoRes.json();
      const { image } = logoJson;

      setTokenMetadata({ ...metadata.data });
      setLogo(image);
      setIsLoading(false);
      setLoaded(true);
      setTokenAddress("");
      notify({
        type: "success",
        message: "Successfully fetched token metadata",
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Token Metadata fetch failed: ${error.message}`,
      });
      setIsLoading(false);
    }
  }, [connection]);

  const closeModal = () => {
    setOpenTokenMetaData(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <CloseModalButton onClick={closeModal} />
        <InputView
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="Enter token address"
        />
        <button onClick={() => getMetadata(tokenAddress)} disabled={isLoading}>
          {isLoading ? <ClipLoader size={20} /> : "Fetch Metadata"}
        </button>
        {loaded && tokenMetadata && (
          <div>
            <img src={logo ?? ""} alt="Token logo" />
            <pre>{JSON.stringify(tokenMetadata, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const CloseModalButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <a
    onClick={onClick}
    className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60"
  >
    <i className="text-2xl text-white group-hover:text-white">
      <AiOutlineClose />
    </i>
  </a>
);
 return <>
 {isLoading && (
   <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
     <ClipLoader />
   </div>
 )}
   <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
     <div className="container">
       <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
         <div className="grid gap-10 lg:grid-cols-2">
           <Branding
             image="auth-img"
             title="Create Solana Token"
             message="Fill in the form to create your own Solana token"
           />
           <div className="lg:ps-0 flex flex-col p-10">
             <div className="pb-10">
               <button
                 className="cursor-pointer transition-all hover:translate-x-1 hover:animate-pulse"
                 onClick={() => setOpenCreateModal(false)}
               >
                 <AiOutlineClose className="text-default-400 h-6 w-6" />
               </button>
             </div>
             <div className="my-auto pb-6 text-center">
               <h4 className="mb-4 text-2xl font-bold text-white">
                 Create Your Token
               </h4>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Name</p>
                 <InputView
                   name="name"
                   placeholder="Token Name"
                   onChange={(e) => handleFormFieldChange("name", e)}
                 />
               </div>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Symbol</p>
                 <InputView
                   name="symbol"
                   placeholder="Token Symbol"
                   onChange={(e) => handleFormFieldChange("symbol", e)}
                 />
               </div>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Decimals</p>
                 <InputView
                   name="decimals"
                   placeholder="Decimals"
                   onChange={(e) => handleFormFieldChange("decimals", e)}
                 />
               </div>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Amount</p>
                 <InputView
                   name="amount"
                   placeholder="Amount"
                   onChange={(e) => handleFormFieldChange("amount", e)}
                 />
               </div>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Image</p>
                 <input
                   className="mb-3"
                   type="file"
                   accept="image/*"
                   onChange={handleImageChange}
                 />
               </div>
               <div className="text-default-300 mx-auto mb-5 max-w-sm">
                 <p>Token Description</p>
                 <InputView
                   name="description"
                   placeholder="Description"
                   onChange={(e) => handleFormFieldChange("description", e)}
                 />
               </div>
               <div className="mt-8 text-center">
                 <button
                   className="btn btn-primary"
                   onClick={() => createToken(token)}
                 >
                   Create Token
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
 )}
</>

