import { checkFileExistenceAndReturnContent } from "../utils";

const USDT_MAIN = "abi/USDT-main" as const;
const USDC_MAIN = "abi/USDC-main" as const;
const BUSD_MAIN = "abi/BUSD-main" as const;
const USDT_BSC = "abi/USDT-bsc" as const;
const USDC_BSC = "abi/USDC-bsc" as const;
const BUSD_BSC = "abi/BUSD-bsc" as const;
const USDT_POLYGON = "abi/USDT-polygon" as const;
const USDC_POLYGON = "abi/USDC-polygon" as const;
const BUSD_POLYGON = "abi/BUSD-polygon" as const;
const USDT_MUMBAI = "abi/USDT-mumbai" as const;

export const rpcNetworks = {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum Mainnet
    3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum Ropsten Testnet
    56: "https://bsc-dataseed.binance.org/", // BSC Mainnet
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/", // BSC Testnet
    137: "https://polygon-rpc.com", // Polygon Mainnet
    80001: "https://rpc-mumbai.maticvigil.com", // Polygon Mumbai Testnet
};

export const tokens = async () => ({
    1: {
        name: "Ethereum Mainnet",
        USDT: {
            contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(USDT_MAIN)).toString()
            ),
        },
        USDC: {
            contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(USDC_MAIN)).toString()
            ),
        },
        BUSD: {
            contractAddress: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(BUSD_MAIN)).toString()
            ),
        },
    },
    56: {
        name: "Binance Smart Chain Mainnet",
        USDT: {
            contractAddress: "0x55d398326f99059fF775485246999027B3197955",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(USDT_BSC)).toString()
            ),
        },
        USDC: {
            contractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(USDC_BSC)).toString()
            ),
        },
        BUSD: {
            contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(BUSD_BSC)).toString()
            ),
        },
    },
    137: {
        name: "Polygon Mainnet",
        USDT: {
            contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_POLYGON)
                ).toString()
            ),
        },
        USDC: {
            contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDC_POLYGON)
                ).toString()
            ),
        },
        BUSD: {
            contractAddress: "0x9fB83c0635De2E815fd1c21b3a292277540C2e8d",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(BUSD_POLYGON)
                ).toString()
            ),
        },
    },
    80001: {
        name: "Polygon Mumbai",
        USDT: {
            contractAddress: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_MUMBAI)
                ).toString()
            ),
        },
    },
});
