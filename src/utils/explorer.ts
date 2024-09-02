import { PublicKey, Transaction } from "@solana/web3.js";

export function getExploreURl (
  endpoint: string,
  viewTypeOrItemAddress: "inspector" | PublicKey | string,
  itemType ="address"
){
 const getClusterUrlParam = () =>{
  let cluster = "";
  if(endpoint === "localnet"){
    cluster =`custome&customeUrl=${encodeURIComponent(
      "http://192.168.29.201"
    )}`;
  } else if (endpoint  === "https://api.devnet.solana.com"){
    cluster ="devnet";
  }

  return cluster ? `?cluster=${cluster}` :"";};

 return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAddress}${getClusterUrlParam()}`;
}