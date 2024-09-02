
import React,{useState} from "react";
import type {NextPage} from "next";
import Head  from "next/head";

import { HomeView, ToolView, FeatureView, OfferView, FaqView, CreateView, TokenMetadata, AirdropView, DonateView, InputView } from "../views";

const Home: NextPage =(props) => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openTokenMetaData, setOpenTokenMetaData] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [openAirdrop, setOpenAirdrop] = useState(false);
    const [openSendTransaction, setOpenSendTransaction] =useState(false);

    return (
        <>
        <Head>
            <title>Solana Token Creator</title>
            <meta  name="solana Token creator" content="Build and Create Solana Token"/>
            < HomeView setOpenCreateModal= {setOpenCreateModal} />
            <ToolView setOpenAirdrop ={setOpenAirdrop} setOpenContact={setOpenContact} setOpenCreateModal={setOpenCreateModal} setOpenSendTransaction={setOpenSendTransaction} setOpenTokenMetaData={setOpenTokenMetaData}/>
            <FeatureView setOpenAirdrop ={setOpenAirdrop} setOpenContact={setOpenContact} setOpenCreateModal={setOpenCreateModal} setOpenSendTransaction={setOpenSendTransaction} setOpenTokenMetaData={setOpenTokenMetaData}/>
            <OfferView setOpenAirdrop ={setOpenAirdrop} setOpenContact={setOpenContact} setOpenCreateModal={setOpenCreateModal} setOpenSendTransaction={setOpenSendTransaction} setOpenTokenMetaData={setOpenTokenMetaData} />
            <FaqView setOpenAirdrop ={setOpenAirdrop} setOpenContact={setOpenContact} setOpenCreateModal={setOpenCreateModal} setOpenSendTransaction={setOpenSendTransaction} setOpenTokenMetaData={setOpenTokenMetaData}/>
        </Head>
            {/* DYNAMIC COMPONANT*/}
            {openCreateModal && (<div className="new_loader relative h-ful bg-slate-900">
                <CreateView setOpenCreateModal={setOpenCreateModal} />
            </div>)}
            {
                openTokenMetaData && (
                <div className="new_loader relative h-full bg-slate-900">
                    <TokenMetadat setOpenCreateModal={setOpenCreateModal} />

                </div>)}
            {openContact && (
                <div className="new_loader relative h-full bg-slate-900">
                    <contactView setOpenContact={setOpenContact} />
                </div>
            )}
            {openAirdrop && (
                <div className="new_loader relative h-full bg-slate-900">
                    <AirdropView setOpenAirdrop={setOpenAirdrop} />
                </div>
            )}
            {openSendTransaction && (
                <div className="new_loader relative h-full bg-slate-900">
                    <DonateView setOpenSendTransaction={setOpenSendTransaction} />
                </div>
            )}
        </>
    )
};

export default Home;

