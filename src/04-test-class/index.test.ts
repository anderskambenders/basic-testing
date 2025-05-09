// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initialBalance = 10;
const bankAccount = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(initialBalance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(15, bankAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(3).getBalance()).toBe(17);
  });

  test('should transfer money', () => {
    const bankAccountSecond = getBankAccount(initialBalance);
    bankAccount.transfer(5, bankAccountSecond);
    expect(bankAccount.getBalance()).toBe(12);
    expect(bankAccountSecond.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const res = await bankAccount.fetchBalance();
    if (res !== null) {
      expect(typeof res).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(10));
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
