import React, { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";

// UI PART IMPORT
import { AiOutlineClose } from "react-icons/ai";
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from "components/Branding";
import { InputView } from "views";

export const CreateView: FC<{ setOpenCreateModal: any }> = ({
  setOpenCreateModal,
}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();
  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName: string, e: any) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  // CREATE TOKEN FUNCTION
  const createToken = useCallback(async (token) => {
    setIsLoading(true);
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const tokenATA = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      publicKey
    );
    try {
      const metadataUrl = await uploadMetadata(token);
      console.log(metadataUrl);

      const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
        metadata: PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
          ],
          PROGRAM_ID
        )[0],
        mint: mintKeypair.publicKey,
        mintAuthority: publicKey,
        payer: publicKey,
        updateAuthority: publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: token.name,
            symbol: token.symbol,
            uri: metadataUrl,
            creators: null,
            sellerFeeBasisPoints: 0,
            uses: null,
            collection: null,
          },
          isMutable: false,
          collectionDetails: null,
        }
      });

      const createNewTokenTransaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(token.decimals),
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(token.amount) * Math.pow(10, Number(token.decimals))
        ),
        createMetadataInstruction
      );

      const signature = await sendTransaction(
        createNewTokenTransaction,
        connection,
        {
          signers: [mintKeypair],
        }
      );

      setTokenMintAddress(mintKeypair.publicKey.toString());
      notify({
        type: "success",
        message: "Token creation successful",
        txid: signature,
      });
    } catch (error: any) {
      notify({ type: "error", message: "Token creation failed, try again" });
    }
    setIsLoading(false);
  }, [publicKey, connection, sendTransaction]);

  // IMAGE UPLOAD TO IPFS USING PINATA
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl });
    }
  };

  const uploadImagePinata = async (file: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "your_pinata_api_key",
          pinata_secret_api_key: "your_pinata_secret_api_key",
          "Content-Type": "multipart/form-data",
        },
      });
      const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return imgHash;
    } catch (error: any) {
      notify({ type: "error", message: "Image upload failed" });
      setIsLoading(false);
    }
  };

  const uploadMetadata = async (token: any) => {
    const { name, symbol, description, image } = token;
    if (!name || !symbol || !description || !image) {
      return notify({ type: "error", message: "Data is missing" });
    }
    const data = JSON.stringify({
      name,
      symbol,
      description,
      image,
    });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "your_pinata_api_key",
          pinata_secret_api_key: "your_pinata_secret_api_key",
          "Content-Type": "application/json",
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return url;
    } catch (error: any) {
      notify({ type: "error", message: "Upload to Pinata failed" });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}
      {tokenMintAddress ? (
        <section className="flex w-full item-center py-6 px-0 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <Branding
                  image="auth-img"
                  title="Your Solana Token"
                  message="Your token has been successfully created!"
                />
                <div className="lg:ps-0 flex flex-col p-10">
                  <div className="pb-10">
                    <a className="flex">
                      <img src="assets/images/logo1.png" alt="" className="h-10" />
                    </a>
                  </div>
                  <div className="my-auto pb-6 text-center">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Link to your new Token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm">
                      Your Solana Token is successfully created, check now on explorer.
                    </p>
                    <div className="flex item-start justify-center">
                      <img
                        src={token.image || "assets/images/logo1.png"}
                        alt="Token"
                        className="h-40"
                      />
                    </div>
                    <div className="mt-5 w-full text-center">
                      <p className="text-default-300 text-base font-medium leading-6">
                        <InputView
                          name="Token Address"
                          placeholder={tokenMintAddress}
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(tokenMintAddress)
                          }
                        >
                          📋
                        </span>
                      </p>
                    </div>
                    <div className="text-default-300 mt-2 text-center text-sm">
                      <a
                        href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        View on Solana Explorer
                      </a>
                    </div>
                    <div className="mt-2 flex w-full justify-between text-center">
                      <button
                        className="btn btn-outline btn-outline-white"
                        onClick={() => {
                          setOpenCreateModal(false);
                          setTokenMintAddress("");
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
  );
};
