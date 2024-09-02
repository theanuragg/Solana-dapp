import {FC} from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration }from "../contexts/NetworkConfigurationProvider";
import { promises } from "dns";

const NetworkSwitcher: FC = () => {
  const {networkConfiguration, setNetworkConfiguration }= useNetworkConfiguration();



  return (
    <>
     <input type="checkbox" id="checkbox" />
     <label className="swtich">
      <select value={networkConfiguration}  onChange={(e) => setNetworkConfiguration(e.target.value || "devent")} className="select max-w-xs border-none bg-transparent outline-0">
        <option value="mainnet-beta">mian</option>
        <option value="devnet" >devent</option>
        <option value ="testnet-beta">testnet</option>
      </select>
     </label>
    </>
  )
}

export default dynamic(() =>  Promise.resolve(NetworkSwitcher),{
  ssr: false,
});
