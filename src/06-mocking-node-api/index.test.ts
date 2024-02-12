// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(999);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(1);
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(setInterval).toHaveBeenLastCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    jest.advanceTimersByTime(3000);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.spyOn(path, 'join');
    const file = 'text.txt';
    await readFileAsynchronously(file);
    expect(mockedJoin).toHaveBeenLastCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const file = 'text.txt';
    expect(await readFileAsynchronously(file)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve('test content'));
    const file = 'text.txt';
    expect(await readFileAsynchronously(file)).toBe('test content');
  });
});
