/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface VestingContractInterface extends ethers.utils.Interface {
  functions: {
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "getVestingSchedule()": FunctionFragment;
    "init(tuple)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVestingSchedule",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [
      {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVestingSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Withdrawal(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export class VestingContract extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  listeners<T, G>(
    eventFilter?: TypedEventFilter<T, G>
  ): Array<TypedListener<T, G>>;
  off<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  on<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  once<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeListener<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeAllListeners<T, G>(eventFilter: TypedEventFilter<T, G>): this;

  queryFilter<T, G>(
    event: TypedEventFilter<T, G>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<T & G>>>;

  interface: VestingContractInterface;

  functions: {
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "balanceOf(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    "decimals()"(overrides?: CallOverrides): Promise<[number]>;

    getVestingSchedule(
      overrides?: CallOverrides
    ): Promise<
      [
        [
          string,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ] & {
          genesis: string;
          beneficiary: string;
          startVesting: BigNumber;
          totalBlocks: BigNumber;
          consumedBlocks: BigNumber;
          releaseType: BigNumber;
          unlockAmountPerBlock: BigNumber;
          remain: BigNumber;
        }
      ]
    >;

    "getVestingSchedule()"(
      overrides?: CallOverrides
    ): Promise<
      [
        [
          string,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ] & {
          genesis: string;
          beneficiary: string;
          startVesting: BigNumber;
          totalBlocks: BigNumber;
          consumedBlocks: BigNumber;
          releaseType: BigNumber;
          unlockAmountPerBlock: BigNumber;
          remain: BigNumber;
        }
      ]
    >;

    init(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "init((address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))"(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    "name()"(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    "symbol()"(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    "totalSupply()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(overrides?: Overrides): Promise<ContractTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  "balanceOf(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  "decimals()"(overrides?: CallOverrides): Promise<number>;

  getVestingSchedule(
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      genesis: string;
      beneficiary: string;
      startVesting: BigNumber;
      totalBlocks: BigNumber;
      consumedBlocks: BigNumber;
      releaseType: BigNumber;
      unlockAmountPerBlock: BigNumber;
      remain: BigNumber;
    }
  >;

  "getVestingSchedule()"(
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      genesis: string;
      beneficiary: string;
      startVesting: BigNumber;
      totalBlocks: BigNumber;
      consumedBlocks: BigNumber;
      releaseType: BigNumber;
      unlockAmountPerBlock: BigNumber;
      remain: BigNumber;
    }
  >;

  init(
    term: {
      genesis: string;
      token: string;
      beneficiary: string;
      unlockAtTGE: BigNumberish;
      cliffDuration: BigNumberish;
      startCliff: BigNumberish;
      vestingDuration: BigNumberish;
      releaseType: BigNumberish;
      amount: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "init((address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))"(
    term: {
      genesis: string;
      token: string;
      beneficiary: string;
      unlockAtTGE: BigNumberish;
      cliffDuration: BigNumberish;
      startCliff: BigNumberish;
      vestingDuration: BigNumberish;
      releaseType: BigNumberish;
      amount: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  "name()"(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  "symbol()"(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(overrides?: Overrides): Promise<ContractTransaction>;

  "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    "decimals()"(overrides?: CallOverrides): Promise<number>;

    getVestingSchedule(
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        genesis: string;
        beneficiary: string;
        startVesting: BigNumber;
        totalBlocks: BigNumber;
        consumedBlocks: BigNumber;
        releaseType: BigNumber;
        unlockAmountPerBlock: BigNumber;
        remain: BigNumber;
      }
    >;

    "getVestingSchedule()"(
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        genesis: string;
        beneficiary: string;
        startVesting: BigNumber;
        totalBlocks: BigNumber;
        consumedBlocks: BigNumber;
        releaseType: BigNumber;
        unlockAmountPerBlock: BigNumber;
        remain: BigNumber;
      }
    >;

    init(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<boolean>;

    "init((address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))"(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    "name()"(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    "symbol()"(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(overrides?: CallOverrides): Promise<boolean>;

    "withdraw()"(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    Withdrawal(
      beneficiary: null,
      blocks: null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { beneficiary: string; blocks: BigNumber; amount: BigNumber }
    >;
  };

  estimateGas: {
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;

    getVestingSchedule(overrides?: CallOverrides): Promise<BigNumber>;

    "getVestingSchedule()"(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "init((address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))"(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    "name()"(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    "symbol()"(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(overrides?: Overrides): Promise<BigNumber>;

    "withdraw()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVestingSchedule(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getVestingSchedule()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    init(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "init((address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))"(
      term: {
        genesis: string;
        token: string;
        beneficiary: string;
        unlockAtTGE: BigNumberish;
        cliffDuration: BigNumberish;
        startCliff: BigNumberish;
        vestingDuration: BigNumberish;
        releaseType: BigNumberish;
        amount: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "symbol()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
