Ch schedule:
# 🌌 PharosV2 Auto Bot — Testnet Automation Suite

> Product of Crypto Hunters  
> ✨ Automate Pharos Testnet tasks with style, speed, and simplicity.

[![Tutorial](https://img.shields.io/badge/📖_Full_Tutorial-Visit-blue?style=for-the-badge)](https://pharos-bot-tutorial.vercel.app/)

---

## 🔥 Features

The PharosV2 Bot supports 16+ automation actions, including:

- ✅ Send Native PHRS (to random or file-based addresses)  
- ✅ Deploy & Send Custom ERC20 Tokens  
- ✅ Wrap/Unwrap PHRS ↔ WPHRS  
- ✅ Mint 10+ Testnet Badges:  
  - Pharos Badge  
  - FaroSwap x2  
  - Gotchipus  
  - OmniHub Studio  
  - Spout, Zentra, PNS, and more  
- ✅ Register PNS Domains (.phrs)  
- ✅ Send Primus Tips to X, TikTok, Google  
- ✅ Add Liquidity on Zenith DEX  
- ✅ Verify Social Tasks (X, Discord)  
- ✅ Deploy NFT Collections  
- ✅ Daily Check-in & Social Verification  
- ✅ Real-time Web GUI with live log streaming  

All actions run locally on Termux and are controlled via a beautiful browser interface at http://localhost:3000.

---

## 📁 Configuration Files

Place these files in the root of the project (pharos-bot/):

### pvkey.txt
One private key per line (must start with 0x):
0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba
> ⚠️ Never share this file. Keep it private.

---

### proxies.txt *(Optional)*
One proxy per line (SOCKS5/HTTP supported):
socks5://user:pass@192.168.1.10:1080
http://10.0.0.5:8080
If left empty or missing, the bot runs without proxy.

---

### address.txt
Used by Send Native PHRS (sendtx action).  
One wallet address per line:
0xAbC123...def456
0x789Xyz...000aaa
---

### addressERC20.txt
Used by Send ERC20 Token (sendtoken action).  
One recipient address per line:
0xRecipient1...abc
0xRecipient2...xyz
---

### username.txt
Used by Primus Tipping (primussend action).  
One username or email per line:
@crypto_user
user@example.com
---

### Output Files (Auto-Generated)

- contractERC20.txt → Stores deployed ERC20 contract addresses  
- contractNFT.txt → Stores deployed NFT collection addresses  

These are appended to after each deployment.

---

## 🚀 Quick Start (Termux)

1. Install Termux from [F-Droid](https://f-droid.org/packages/com.termux/)
2. Run in Termux:
  
   pkg update && pkg upgrade -y
   pkg install nodejs git -y
   git clone https://github.com/EfajTahamidRifat/pharos-bot.git
   cd pharos-bot
   
3. Create your config files (see above)
4. Start the bot:
  
   npm install
   node server.js
   
5. Open in your phone’s browser:  
   👉 http://localhost:3000

---

## 🌐 Full Tutorial

For a step-by-step visual guide, visit:  
🔗 [https://pharos-bot-tutorial.vercel.app/](https://pharos-bot-tutorial.vercel.app/)

Includes:
- Screenshots
- File examples
- Troubleshooting tips
- Ethical usage guidelines

---

## ⚠️ Ethical Notice

> This tool is designed only to simplify your own daily repetitive tasks on the Pharos Testnet.  
> Do NOT use it to:
> - Spam the network  
> - Harm other users  
> - Gain unfair advantage  
> - Abuse faucets or social tasks  

Use responsibly. Automation should enhance, not exploit.

---

## 👨‍💻 Developer

Efaj Tahamid Rifat  
- 📩 Telegram: [@EfajTahamidRIFAT](https://t.me/EfajTahamidRIFAT)  
- 🐙 GitHub: [EfajTahamidRifat](https://github.com/EfajTahamidRifat)  
- ❌ X (Twitter): [@Rifat1680](https://x.com/Rifat1680)

> 🔒 Note: I will never DM you first. Beware of impersonators.

---

## 🤝 Collaboration

Are you a community admin or influencer?  
Need a custom bot for your token, NFT, or testnet?

👉 DM me: [@EfajTahamidRIFAT](https://t.me/EfajTahamidRIFAT)

---

## 🚀 Join Crypto Hunters

Stay updated with new tools, scripts, and alpha:  
🔥 [https://t.me/cryptoHunters_247](https://t.me/cryptoHunters_247)

---

> ✨ Pharos Bot GUI — Made with ❤️ by Crypto Hunters  
> © 2025 Efaj Tahamid Rifat. All rights reserved.
