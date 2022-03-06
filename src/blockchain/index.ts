import Web3 from "web3";
import { rpcNetworks } from "../blockchain/types";

export class Web3Provider extends Web3 {
    web3: Web3;

    constructor(chainId: number) {
        super();
        this.web3 = new Web3(
            new Web3.providers.HttpProvider(rpcNetworks[chainId])
        );
    }
}
