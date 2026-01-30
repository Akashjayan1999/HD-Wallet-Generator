// import { atom } from "jotai";
// import { Keypair } from "@/types";

// const wallets = atom<Keypair[]>([])
// const updateWallets = atom(null, (_get, set,update: Keypair[]) => {
//     set(wallets, (prev: Keypair[]) => [...prev, ...update])
// })

// const mnemonicPhrase = atom<string>("")
// const updateMnemonicPhrase = atom(null, (_get, set,update: string) => {
//     set(mnemonicPhrase, update)
// })

// const activeWallet = atom<Keypair>({publicKey:"",secretKey:""})
// const updateActiveWallet = atom(null, (_get, set,update: Keypair) => {
//     set(activeWallet, update)
// })

import { atomWithReducer } from "jotai/utils";
import {atom } from "jotai";
import { Keypair } from "@/types";

type WalletState = {
    wallets: Keypair[]
    mnemonicPhrase: string
    activeWallet: Keypair
}

type WalletAction = 
    | { type: 'ADD_WALLETS', payload: Keypair[] }
    | { type: 'SET_WALLETS', payload: Keypair[] }
    | { type: 'SET_MNEMONIC', payload: string }
    | { type: 'SET_ACTIVE_WALLET', payload: Keypair }
    | { type: 'RESET' }

const initialState: WalletState = {
    wallets: [],
    mnemonicPhrase: "",
    activeWallet: { publicKey: "", secretKey: "" }
}

function walletReducer(state: WalletState, action: WalletAction): WalletState {
    switch (action.type) {
        case 'ADD_WALLETS':
            return { ...state, wallets: [...state.wallets, ...action.payload] }
        case 'SET_WALLETS':
            return { ...state, wallets: action.payload }
        case 'SET_MNEMONIC':
            return { ...state, mnemonicPhrase: action.payload }
        case 'SET_ACTIVE_WALLET':
            return { ...state, activeWallet: action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export const walletStateAtom = atomWithReducer(initialState, walletReducer)

// Derived atoms
export const walletsAtom = atom((get) => get(walletStateAtom).wallets)
export const mnemonicPhraseAtom = atom((get) => get(walletStateAtom).mnemonicPhrase)
export const activeWalletAtom = atom((get) => get(walletStateAtom).activeWallet)

// const [, dispatch] = useAtom(walletStateAtom)
// dispatch({ type: 'ADD_WALLETS', payload: newWallets })