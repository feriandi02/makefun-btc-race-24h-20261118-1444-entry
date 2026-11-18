import { runBars, BarsState } from './vendor/makefun-bars.ts';

interface BotMemory {
  prices: bigint[];
  entryPrice: bigint | null;
  entrySeq: number;
}

const mem: BotMemory = {
  prices: [],
  entryPrice: null,
  entrySeq: -1,
};

await runBars({
  onHello(state) {
    console.error(`Bot starting with capital: ${state.cash}`);
  },
  onBatch(state, batch): OrderInput[] {
    const symbol = 'CBBTC';
    const closePrice = state.close(symbol);
    if (closePrice === null) return [];

    mem.prices.push(closePrice);
    if (mem.prices.length > 40) mem.prices.shift();

    const hasPosition = state.positions.has(symbol) && state.positions.get(symbol)!.qty > 0n;
    const orders: OrderInput[] = [];

    if (mem.prices.length >= 30 && !hasPosition) {
      const sma = mem.prices.reduce((a, b) => a + b, 0n) / BigInt(mem.prices.length);
      const current = mem.prices[mem.prices.length - 1];
      if (current < (sma * 985n) / 1000n) {
        const notional = state.cash;
        if (notional >= 1_000_000n && notional <= state.cash) {
          orders.push({
            side: 'buy',
            symbol,
            notional_quote_units: notional,
            max_slippage_bps: 100,
          });
          mem.entryPrice = current;
          mem.entrySeq = batch.seq;
        }
      }
    }

    if (hasPosition) {
      const current = mem.prices[mem.prices.length - 1];
      const pos = state.positions.get(symbol)!;
      const profitBps = mem.entryPrice ? ((current - mem.entryPrice) * 10000n) / mem.entryPrice : 0n;
      const holdingBars = batch.seq - mem.entrySeq;

      if (profitBps >= 200n || profitBps <= -40n || holdingBars > 15) {
        orders.push({
          side: 'sell',
          symbol,
          qty: pos.qty,
          max_slippage_bps: 100,
        });
        mem.entryPrice = null;
      }
    }

    return orders;
  },
});


