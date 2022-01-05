import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

// type ITransactionInput = Pick<ITransaction, 'title' | 'amount' | 'type' | 'category'>; 

interface ITransactionPrivoderProps {
    children: ReactNode;
}

interface ITransactionContextData {
    transactions: ITransaction[];
    createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionContext = createContext<ITransactionContextData>(
    {} as ITransactionContextData
);

export function TransactionProvider({ children }: ITransactionPrivoderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: ITransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionContext.Provider value={{
            transactions,
            createTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );

}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context
}