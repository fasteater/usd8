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
- We are a team of security experts from reputable companies in the DeFi space
- We see the industry gap and hope to build a long-term protocol benefiting the security and adoption of defi

# Financial Projections
Here are a very rough projection based on 4 different sized stable coins currently in the industry, note this projection only consider expense of Cover Pool. It shows the Cover Pool size can be significant to provide the industry with a meaningful cushion once the size of USD8 is big enough.


| USD8 Supply | Eqv Size of | Reserve APY | Gross Rev | % Rev for Cover Pool | Cover Pool Size | Net Rev  |
| ----------- | ----------- | ----------- | --------- | -------------------- | --------------- | -------- |
| 100 mil     | FraxUSD     | 0.05        | 5 mil     | 50%                  | 2.5 mil         | 4 mil    |
| 840 mil     | crvUSD      | 0.05        | 42 mil    | 10%                  | 4.2 mil         | 37.8 mil |
| 60.6 bil    | USDC        | 0.03        | 1.8 bil   | 5%                   | 90 mil          | 1.71 bil |
| 155 bil     | USDT        | 0.02        | 3.1 bil   | 3%                   | 93 mil          | 3 bil    |


* % Rev for Cover Pool - how much rev USD8 put into the cover pool
* Cover Pool - assume cover pool will be exhausted all the time and requires replenish, but in reality its more likely there will be enough in the pool, USD8 does not need to replenish to maintain the balance, this give us more net revenue.


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
