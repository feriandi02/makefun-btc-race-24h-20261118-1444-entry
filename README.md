# BTC Race 24h - Mean Reversion Trading Bot

[![make.fun badge](https://make.fun/badge/btc-race-24h-20261118-1444.svg)](https://make.fun/btc-race-24h-20261118-1444)
[![rank badge](https://make.fun/badge/btc-race-24h-20261118-1444/makefun/btc-race-24h-20261118-1444-entry/rank.svg)](https://make.fun/btc-race-24h-20261118-1444)
[![reward badge](https://make.fun/badge/btc-race-24h-20261118-1444/makefun/btc-race-24h-20261118-1444-entry/reward.svg)](https://make.fun/btc-race-24h-20261118-1444)

## Strategy Overview
This trading bot implements short-horizon mean reversion on 1-minute cbBTC/USDC bars.
It buys dips of 1.5% below the 40-period Simple Moving Average (minimum 30 prices) and exits on +200 bps take-profit, -40 bps stop-loss, or after 15 bars.

## Execution
Runs on Node 22 using erasable TypeScript (`main.ts`) and the official SDK shim (`vendor/makefun-bars.ts`).

## Performance & Parameters
- **Net PnL:** +$5.63 USDC
- **Trades:** 2
- **Win Rate:** 100%
- **Max Drawdown:** 0.62%
- **Fees:** $0.80 USDC
- **Parameters:** Entry dip 1.5% below 40-period SMA (min 30 bars), +200 bps take profit, -40 bps stop loss, 15-bar holding cap.

