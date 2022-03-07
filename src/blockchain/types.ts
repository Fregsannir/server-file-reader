import { checkFileExistenceAndReturnContent } from "../utils";

const USDT_MAIN = "abi/USDT-main" as const;
const USDC_MAIN = "abi/USDC-main" as const;
const BUSD_MAIN = "abi/BUSD-main" as const;
const USDT_ROPSTEN = "abi/USDT-ropsten" as const;
const USDC_ROPSTEN = "abi/USDC-ropsten" as const;
const BUSD_ROPSTEN = "abi/BUSD-ropsten" as const;
const USDT_BSC = "abi/USDT-bsc" as const;
const USDC_BSC = "abi/USDC-bsc" as const;
const BUSD_BSC = "abi/BUSD-bsc" as const;
const USDT_BSCTEST = "abi/USDT-bsctest" as const;
const BUSD_BSCTEST = "abi/BUSD-bsctest" as const;
const USDT_POLYGON = "abi/USDT-polygon" as const;
const USDC_POLYGON = "abi/USDC-polygon" as const;
const BUSD_POLYGON = "abi/BUSD-polygon" as const;
const USDT_MUMBAI = "abi/USDT-mumbai" as const;
const USDC_MUMBAI = "abi/USDC-mumbai" as const;

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
            contractAddress: "0x0882477e7895bdC5cea7cB1552ed914aB157Fe56",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(USDC_MAIN)).toString()
            ),
        },
        BUSD: {
            contractAddress: "0x5864c777697Bf9881220328BF2f16908c9aFCD7e",
            abi: JSON.parse(
                (await checkFileExistenceAndReturnContent(BUSD_MAIN)).toString()
            ),
        },
    },
    3: {
        name: "Ropsten",
        USDT: {
            contractAddress: "0x6EE856Ae55B6E1A249f04cd3b947141bc146273c",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_ROPSTEN)
                ).toString()
            ),
        },
        BUSD: {
            contractAddress: "0x16c550a97Ad2ae12C0C8CF1CC3f8DB4e0c45238f",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(BUSD_ROPSTEN)
                ).toString()
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
            contractAddress: "0xBA5Fe23f8a3a24BEd3236F05F2FcF35fd0BF0B5C",
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
    97: {
        name: "Binance Smart Chain Testnet",
        USDT: {
            contractAddress: "0x33abF1498d52E521DcAE88f236DE5EFc720cF969",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_BSCTEST)
                ).toString()
            ),
        },
        BUSD: {
            contractAddress: "0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(BUSD_BSCTEST)
                ).toString()
            ),
        },
    },
    137: {
        name: "Polygon Mainnet",
        USDT: {
            contractAddress: "0x42243231FB4a64a5BCFc7F4B7a9aD92576804046",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_POLYGON)
                ).toString()
            ),
        },
        USDC: {
            contractAddress: "0xDD9185DB084f5C4fFf3b4f70E7bA62123b812226",
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
