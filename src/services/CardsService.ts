/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import Card from "../model/Card";
import axiosRetry from "axios-retry";

export interface CardsService {
  getCards: () => Promise<Card[]>;
}

export class CardsServiceImplementation implements CardsService {
  private cacheKey = "cards_cache";
  private cacheTTL = 350000; //5 min

  private axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
  });

  constructor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (Array.isArray(response.data.cards)) {
          response.data = response.data.cards
            .filter((item: any) => item.imageUrl)
            .sort((a: Card, b: Card) => a.id.localeCompare(b.id))
            .map((item: any) => {
              return new Card(item.id, item.name, item.imageUrl);
            });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 1000,
      shouldResetTimeout: true,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error),
    });
  }

  async getCards(): Promise<Card[]> {
    const cachedData = sessionStorage.getItem(this.cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      if (Date.now() - timestamp < this.cacheTTL) {
        return data;
      }
    }

    try {
      const response = await this.axiosInstance.get("/cards");
      sessionStorage.setItem(
        this.cacheKey,
        JSON.stringify({ data: response.data, timestamp: Date.now() })
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
