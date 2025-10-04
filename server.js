const express = require('express');
const fs = require('fs');
const { ethers } = require('ethers');
const solc = require('solc');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// === NETWORK CONFIG ===
const NETWORK_URL = "https://testnet.dplabs-internal.com";
const CHAIN_ID = 688688;
const EXPLORER_URL = "https://testnet.pharosscan.xyz/tx/0x";
const WPHRS_ADDRESS = "0x76aaaDA469D23216bE5f7C596fA25F282Ff9b364";
const CONFT_NFT = "0x5a9525389B2c53c56BC3a2e4Fcdb4DC88326550d";
const GOTCHIPUS_CONTRACT = "0x0000000038f050528452D6Da1E7AACFA7B3Ec0a8";

// === UTILS ===
function loadFileLines(file) {
  try {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
  } catch (e) {
    return [];
  }
}

function saveContract(addr, file) {
  fs.appendFileSync(file, addr + '\n');
}

let provider;
async function getProvider() {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(NETWORK_URL);
    const net = await provider.getNetwork();
    if (net.chainId !== BigInt(CHAIN_ID)) throw new Error(`Wrong chain. Expected ${CHAIN_ID}`);
  }
  return provider;
}

// === LOGGING ===
const logs = [];
app.get('/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  logs.forEach(log => res.write(` ${JSON.stringify(log)}\n\n`));
  const interval = setInterval(() => {
    while (logs.length) {
      const log = logs.shift();
      res.write(` ${JSON.stringify(log)}\n\n`);
    }
  }, 100);
  req.on('close', () => clearInterval(interval));
});

function log(msg) {
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logs.push(line);
  console.log(line);
}

// === ACTIONS ===
async function sendNativeTx(pk, count, amount, useFile) {
  const prov = await getProvider();
  const wallet = new ethers.Wallet(pk, prov);
  const addrs = useFile ? loadFileLines('address.txt') : null;
  const amountWei = ethers.parseEther(amount);
  for (let i = 0; i < count; i++) {
    const to = addrs ? addrs[i % addrs.length] : ethers.Wallet.createRandom().address;
    const tx = await wallet.sendTransaction({ to, value: amountWei });
    await tx.wait();
    log(`✅ Sent ${amount} PHRS to ${to} | Tx: ${EXPLORER_URL}${tx.hash}`);
  }
}

async function mintConftNFT(pk) {
  const prov = await getProvider();
  const wallet = new ethers.Wallet(pk, prov);
  const nft = new ethers.Contract(CONFT_NFT, ["function mint()"], wallet);
  const tx = await nft.mint({ value: ethers.parseEther("0.0000001") });
  await tx.wait();
  log(`✅ Minted Conft NFT | Tx: ${EXPLORER_URL}${tx.hash}`);
}

async function mintGotchipus(pk, count) {
  const prov = await getProvider();
  const wallet = new ethers.Wallet(pk, prov);
  for (let i = 0; i < count; i++) {
    const tx = await wallet.sendTransaction({
      to: GOTCHIPUS_CONTRACT,
       "0x5b70ea9f"
    });
    await tx.wait();
    log(`✅ Minted Gotchipus NFT #${i+1} | Tx: ${EXPLORER_URL}${tx.hash}`);
  }
}

// === MAIN HANDLER ===
app.post('/start', async (req, res) => {
  logs.length = 0;
  const { action, params } = req.body;
  log(`✨ Starting action: ${action}`);
  try {
    const pks = loadFileLines('pvkey.txt');
    if (pks.length === 0) throw new Error("pvkey.txt is empty");
    for (let pk of pks) {
      switch(action) {
        case 'sendtx': await sendNativeTx(pk, params.count, params.amount, params.useFile); break;
        case 'mintconft': await mintConftNFT(pk); break;
        case 'mintgotchipus': await mintGotchipus(pk, params.count); break;
        default: throw new Error(`Unknown action: ${action}`);
      }
    }
    log("🏁 ALL TASKS COMPLETED SUCCESSFULLY");
    res.json({ ok: true });
  } catch (e) {
    log(`❌ ERROR: ${e.message}`);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✨ Pharos Bot GUI by Crypto Hunters`);
  console.log(`🌐 Open in browser: http://localhost:${PORT}\n`);
});
