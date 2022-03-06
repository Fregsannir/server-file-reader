import USDT_MAIN from "../abi/USDT-main.json";
import USDC_MAIN from "../abi/USDC-main.json";
import BUSD_MAIN from "../abi/BUSD-main.json";
import USDT_ROPSTEN from "../abi/USDT-ropsten.json";
import USDC_ROPSTEN from "../abi/USDC-ropsten.json";
import BUSD_ROPSTEN from "../abi/BUSD-ropsten.json";
import USDT_BSC from "../abi/USDT-bsc.json";
import USDC_BSC from "../abi/USDC-bsc.json";
import BUSD_BSC from "../abi/BUSD-bsc.json";
import USDT_BSCTEST from "../abi/USDT-bsctest.json";
import BUSD_BSCTEST from "../abi/BUSD-bsctest.json";
import USDT_POLYGON from "../abi/USDT-polygon.json";
import USDC_POLYGON from "../abi/USDC-polygon.json";
import BUSD_POLYGON from "../abi/BUSD-polygon.json";
import USDT_MUMBAI from "../abi/USDT-mumbai.json";
import USDC_MUMBAI from "../abi/USDC-mumbai.json";

export const rpcNetworks = {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum Mainnet
    3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum Ropsten Testnet
    56: "https://bsc-dataseed.binance.org/", // BSC Mainnet
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/", // BSC Testnet
    137: "https://polygon-rpc.com", // Polygon Mainnet
    80001: "https://rpc-mumbai.maticvigil.com", // Polygon Mumbai Testnet
};

export const tokens = {
    1: {
        USDT: {
            contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            abi: USDT_MAIN,
        },
        USDC: {
            contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            abi: USDC_MAIN,
        },
        BUSD: {
            contractAddress: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
            abi: BUSD_MAIN,
        },
    },
    3: {
        USDT: {
            contractAddress: "0x6EE856Ae55B6E1A249f04cd3b947141bc146273c",
            abi: USDT_ROPSTEN,
        },
        USDC: {
            contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
            abi: USDC_ROPSTEN,
        },
        BUSD: {
            contractAddress: "0x16c550a97Ad2ae12C0C8CF1CC3f8DB4e0c45238f",
            abi: BUSD_ROPSTEN,
        },
    },
    56: {
        USDT: {
            contractAddress: "0x55d398326f99059fF775485246999027B3197955",
            abi: USDT_BSC,
        },
        USDC: {
            contractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            abi: USDC_BSC,
        },
        BUSD: {
            contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            abi: BUSD_BSC,
        },
    },
    97: {
        USDT: {
            contractAddress: "0x33abF1498d52E521DcAE88f236DE5EFc720cF969",
            abi: USDT_BSCTEST,
        },
        BUSD: {
            contractAddress: "0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47",
            abi: BUSD_BSCTEST,
        },
    },
    137: {
        USDT: {
            contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            abi: USDT_POLYGON,
        },
        USDC: {
            contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            abi: USDC_POLYGON,
        },
        BUSD: {
            contractAddress: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
            abi: BUSD_POLYGON,
        },
    },
    80001: {
        USDT: {
            contractAddress: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
            abi: USDT_MUMBAI,
        },
        USDC: {
            contractAddress: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
            abi: USDC_MUMBAI,
        },
    },
};
