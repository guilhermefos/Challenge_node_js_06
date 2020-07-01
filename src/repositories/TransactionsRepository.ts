import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: string;
  category_id: string;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const filteredIncome = transactions.filter(
      transaction => transaction.type === 'income',
    );

    const income =
      filteredIncome.length === 0
        ? 0
        : filteredIncome
            .map(transaction => transaction.value)
            .reduce((prev, curr) => prev + curr);

    const filteredOutcome = transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcome =
      filteredOutcome.length === 0
        ? 0
        : filteredOutcome
            .map(transaction => transaction.value)
            .reduce((prev, curr) => prev + curr);

    return { income, outcome, total: income - outcome };
  }
}

export default TransactionsRepository;
