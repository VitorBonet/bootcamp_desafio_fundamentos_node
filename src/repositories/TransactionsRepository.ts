import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((tot, transaction) => {
      return transaction.type === 'income' ? tot + transaction.value : tot;
    }, 0);
    const outcome = this.transactions.reduce((tot, transaction) => {
      return transaction.type === 'outcome' ? tot + transaction.value : tot;
    }, 0);
    const total = income - outcome;

    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transation = new Transaction({ title, type, value });

    this.transactions.push(transation);

    return transation;
  }
}

export default TransactionsRepository;
