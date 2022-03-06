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
    3: {
        USDT: {
            contractAddress: "0x6EE856Ae55B6E1A249f04cd3b947141bc146273c",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_ROPSTEN)
                ).toString()
            ),
        },
        USDC: {
            contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDC_ROPSTEN)
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
    97: {
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
            contractAddress: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(BUSD_POLYGON)
                ).toString()
            ),
        },
    },
    80001: {
        USDT: {
            contractAddress: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDT_MUMBAI)
                ).toString()
            ),
        },
        USDC: {
            contractAddress: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
            abi: JSON.parse(
                (
                    await checkFileExistenceAndReturnContent(USDC_MUMBAI)
                ).toString()
            ),
        },
    },
});
