import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('xExchange')
    .setDescription({
      en: 'Decentralized exchange (DEX) on MultiversX. Swap tokens, provide liquidity, and earn rewards on the leading DeFi platform for the eGold ecosystem.',
      de: 'Dezentralisierte Börse (DEX) auf MultiversX. Tausche Token, stelle Liquidität bereit und verdiene Belohnungen auf der führenden DeFi-Plattform für das eGold-Ökosystem.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/xexchange.svg')
    .setColors({ primary: '#22F7DD' })
    .setUrls({ web: 'https://xexchange.com' })
    .build(),
  contracts: {
    'CONTRACT/PAIR/EGLD_MEX': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqzw0d0tj25qme9e4ukverjjjqle6xamay0n4s5r0v9g'
      return 'TODO'
    },
    'TOKEN/WEGLD': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'WEGLD-a28c59'
      return 'TODO'
    },
    'TOKEN/USDC': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'USDC-350c4e'
      return 'TODO'
    },
    'TOKEN/USDT': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'USDT-58d5d0'
      return 'TODO'
    },
    'TOKEN/BUSD': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'BUSD-866948'
      return 'TODO'
    },
    'TOKEN/UTK': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'UTK-14d57d'
      return 'TODO'
    },
    'TOKEN/HTM': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'HTM-23a1da'
      return 'TODO'
    },
    'TOKEN/ASH': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'ASH-e3d1b7'
      return 'TODO'
    },
    'TOKEN/WBTC': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'WBTC-05fd5b'
      return 'TODO'
    },
    'TOKEN/WETH': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'WETH-bbe4ab'
      return 'TODO'
    },
    'TOKEN/RIDE': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'RIDE-05b1bb'
      return 'TODO'
    },
    'TOKEN/ITHEUM': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'ITHEUM-fce905'
      return 'TODO'
    },
    'TOKEN/CRT': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'CRT-f55762'
      return 'TODO'
    },
    'TOKEN/EMR': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'EMR-6310dc'
      return 'TODO'
    },
    'TOKEN/KWAK': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'KWAK-b81409'
      return 'TODO'
    },
    'TOKEN/LEGLD': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'LEGLD-e8378b'
      return 'TODO'
    },
    'TOKEN/LXOXNO': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'LXOXNO-a00540'
      return 'TODO'
    },
    'TOKEN/XOXNO': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'XOXNO-589e09'
      return 'TODO'
    },
    'TOKEN/SUPER': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'SUPER-19c5c5'
      return 'TODO'
    },
    'TOKEN/PROTEO': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'PROTEO-6ca7c8'
      return 'TODO'
    },
    'TOKEN/MEX': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'MEX-a659d0'
      return 'TODO'
    },
    'CONTRACT/WEGLD_SHARD1': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp'
      return 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3'
    },
  },
  destinations: {},
})
