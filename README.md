<img src="./assets/logo.png" width="300px" />

# USD8 - a new stablecoin covers crypto hacks

USD8 is a stablecoin that offers cover for crypto hacks by operating a Cover Pool from its own revenue, allowing victims to claim any token losses from covered protocol hacks.

Get in early - [join telegram](https://t.me/+sl4knzNQFE8xYmE1), [follow on X](https://x.com/USD8_official) 

<img src="./assets/3d8.png" width="500px"/>      

# TLDR;
Like USDC, but set aside a % treasury yield to cover defi hacks.

# Why
- Crypto hacks remain a major roadblock for DeFi adoption
- Current industry solutions focus on preventing hacks with audits, but this does not guarantee security and thus does not solve users' pain points

# How
- Users mint USD8 with USDC, USDC goes into treasury for yield. Part of the yield profit is set aside into a Cover Pool to cover potential hacks
- Users use/hold/LP/yield with USD8 to accumulate Cover Credits (non-transferrable) which they can use to claim any type of hacking loss from covered protocols for any tokens (not limited to USD8 positions)
- Claims are limited by:
    - the user's total loss
    - the overall Cover Pool size
    - the coverage rate for the hacked protocol
- A committee of third party industry KOLs determines if a hack is legit and should be covered
- Claiming process is permissionless and non-reversible, users might need to trade in their hacked protocol LP token if applicable. 

# Fine Details - wip
### USD8
- hard pegged to USDC(potential switch to fiat USD in the future), anyone can mint and burn USD8 with USDC as collateral. Dynamic mint/burn fees might apply.
- holding and using USD8 in yield/LP will accumulate non-transferrable Cover Credits for the owner. Cover Credits can be used to claim hack loss.
- Seeded USD8/USDC AMM pool to provide liquidity

### Cover Credits
- non-transferable, automatically accumulates as user uses USD8 - hold/LP/Yield, accumulate rates varies depending on the protocol's need to encourage USD8 liquidity
- determine the payout rate on every dollar user lost, the higher the score, the more payout
- user needs send an initial tx onchain as registration to accumulate credits -> avoid smart contract accumulates credit and can't use them due to non-transferrable
- all user credit burnt when claiming a loss
- claiming lost does not require credits, making USD8 a potential universal cover. However the more credits, the better coverage.

### Cover Pool
- plenished by USD8 on a monthly basis, using profit generated from reserve, in USD8
- reserve is never used for Cover Pool, only the yield profit, so user's money is always safe
- once payout pool is exhausted from a claim, it will be slowly replenished on a monthly basis


### Claims
-  An independent committee decides if a hack is covered via multi sig, under the following conditions
	- must become a covered protocol 30 days before the hack
	- must not be an obvious inside job / correlated job / hacked by the team or any coverage scams
	- total payout is limited to the Cover Pool balance * protocol Cover Type

- Claim process 
	- committee votes in favour of claim
	- user initiates a claim before deadline, this will transfer user LP token to USD8
	- USD8 calculates the payout amount individually based on 
        - user's loss
        - user's Cover Credit amount, if 0 still eligible
        - total claim amount is <= CoverPool * ProtocolCoverPlan
	- user finalises claim and get paid in USD8
	- user forfeit their LP token to USD8 during this process
	- payout process is non-reversible


### Covered Protocols
- Only verified protocols will be covered
- 5 Cover Types, covers up to a % of the current Cover Pool balance
	1. Platinum - up to 100% 
	2. Gold - up to 80%
	3. Silver - up to 50%
	4. Bronze - up to 20%
	5. Iron - up to 5%
- USD8 is in charge of verifying and assigning cover types -  this process involves internal reviews, due diligence, audits etc.
- Protocol can increase their coverage by building their Cover Score(wip)



# About Us
- We are a team of security experts in the DeFi space
- We hope to build a long-term protocol benefiting the security and adoption of crypto

# Partners & Initial Coverage (Tentative)
- OpenZeppelin
- Uniswap
- Aave
- Sky
- Curve
- Morpho
- Lido
- EigenLayer
- Ethena
- Pendle
- Rocket Pool
- Frax

more to add...

# Join The Team
We are looking for growth hackers / marketers to join the ride, please ping @youeattoomuch on telegram.

[Join telegram](https://t.me/+sl4knzNQFE8xYmE1), [Follow on X](https://x.com/USD8_official) 

<br/>
<br/>
<br/>
<img src="./assets/logo.png" width="100px" />

Disclaimer : Feel free to share this doc privately but be aware that the protocol is currently under heavy development, and the design might change.  
