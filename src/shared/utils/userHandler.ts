import axios from 'axios';

type BalanceResponse = {
  status: string;
  message: string;
  result: string;
};

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_UNAI_TOKENS_ADDRESS;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

const DECIMALS = 18;

export const getUserBalance = async (walletAddress: string) => {
  if (!walletAddress) throw new Error('Wallet address not found');

  const { data, status, statusText } = await axios.request<BalanceResponse>({
    method: 'GET',
    url: 'https://api.etherscan.io/api',
    params: {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: TOKEN_ADDRESS,
      address: walletAddress,
      tag: 'latest',
      apikey: ETHERSCAN_API_KEY,
    },
  });

  if (status !== 200 || data.status !== '1') throw new Error(statusText);

  const userBalance = Math.trunc(parseFloat(data.result) / Math.pow(10, DECIMALS));

  return userBalance;
};
