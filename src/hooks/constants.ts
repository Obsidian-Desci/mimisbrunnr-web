
export const RSCWETH = "0xeC2061372a02D5e416F5D8905eea64Cab2c10970"
export const GROWWETH = "0x61847189477150832D658D8f34f84c603Ac269af"
export const HAIRWETH = "0x94DD312F6Cb52C870aACfEEb8bf5E4e28F6952ff"
export const LAKEWETH = "0xeFd69F1FF464Ed673dab856c5b9bCA4D2847a74f"
export const VITAWETH ="0xcBcC3cBaD991eC59204be2963b4a87951E4d292B"
export const MIMISWETH='0x0000000000000000000000000000000000000000'

export const GROW_ADDR="0x761A3557184cbC07b7493da0661c41177b2f97fA"
export const HAIR_ADDR="0x9Ce115f0341ae5daBC8B477b74E83db2018A6f42"
export const LAKE_ADDR="0xF9Ca9523E5b5A42C3018C62B084Db8543478C400"
export const VITA_ADDR="0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321"
export const RSC_ADDR="0xD101dCC414F310268c37eEb4cD376CcFA507F571"
export const WETH_ADDR="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
export const MIMIS_ADDR="0x8c117C89225baA3d2be118892aAfAe0f89fb9f6f" 


export enum Token {
    'RSC'=RSC_ADDR,
    'GROW'=GROW_ADDR,
    'HAIR'=HAIR_ADDR,
    'LAKE'=LAKE_ADDR,
    'VITA'=VITA_ADDR,
    'MIMIS'=MIMIS_ADDR,
    "WETH"=WETH_ADDR
}

export enum Pool {
    "RSC"=RSCWETH,
    "GROW"=GROWWETH,
    "HAIR"=HAIRWETH,
    "LAKE"=LAKEWETH,
    "VITA"=VITAWETH,
    "MIMIS"=MIMISWETH,
}

export interface PoolInfo {
    pool: `0x${string}`;
    fee: number;
    wethIsToken0: number;
    protocolOwnedLiquidity: number;
    mimisPosition: number;
}

export interface Position {
    nonce: number;
    operator: `0x${string}`;
    token0: `0x${string}`;
    token1: `0x${string}`;
    fee: number;
    tickLower: number;
    tickUpper: number;
    liquidity: number;
    feeGrowthInside0LastX128: number;
    feeGrowthInside1LastX128: number;
    tokensOwed0: number;
    tokensOwed1: number;
}

export const structPoolInfo = (info: any[]): PoolInfo => {
    const poolInfo: PoolInfo = {
        pool: info[0],
        fee: info[1],
        wethIsToken0: info[2],
        protocolOwnedLiquidity: info[3],
        mimisPosition: info[4]
    }
    return poolInfo
}

export const structPosition = (data: any[]): Position => {
    const position: Position = {
        nonce: data[0],
        operator: data[1],
        token0: data[2],
        token1: data[3],
        fee: data[4],
        tickLower: data[5],
        tickUpper: data[6],
        liquidity: data[7],
        feeGrowthInside0LastX128: data[8],
        feeGrowthInside1LastX128: data[9],
        tokensOwed0: data[10],
        tokensOwed1: data[11]
        
    }
    return position 
}