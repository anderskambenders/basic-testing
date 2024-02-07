// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
  });
  test('should create instance with provided base url', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({ data: '' }),
    };
    jest
      .spyOn(axios, 'create')
      .mockReturnValue(client as unknown as AxiosInstance);
    await throttledGetDataFromApi('/users');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({ data: '' }),
    };
    jest
      .spyOn(axios, 'create')
      .mockReturnValue(client as unknown as AxiosInstance);
    const path = '/users';
    await throttledGetDataFromApi(path);
    expect(client.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const response = { id: 1, title: 'post' };
    const client = {
      get: jest.fn().mockResolvedValue({ data: response }),
    };
    jest
      .spyOn(axios, 'create')
      .mockReturnValue(client as unknown as AxiosInstance);
    const result = await throttledGetDataFromApi('/users');
    expect(result).toEqual(response);
  });
});
