import { useCallback, useState } from 'react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://weatherbit-v1-mashape.p.rapidapi.com';

const api = axios.create();

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// your auth token is configured here
		//config.headers.Authorization = `Bearer token`;

		// weather api need this headers
		// if you want to use this api, you need to create an account and get your own api key
		// else you can remove this headers
		config.headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
		config.headers['X-RapidAPI-Host'] = 'weatherbit-v1-mashape.p.rapidapi.com';

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response?.data;
	},
	(error) => {
		const errorMessage = error.response?.data?.error?.errorMessage || error.message;
		const statusCode = error.response?.data?.status || error.response?.status || 400;
		return Promise.reject({ errorMessage, statusCode });
	},
);

export const useAxios = (baseURL = BASE_URL) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleApiRequest = useCallback((request: () => Record<string, any>, msg?: string) => {
		setIsLoading(true);
		return request()
			.then((data: Record<string, any> | Record<string, any>[]) => {
				if (msg) {
					// show snackbar notification here in case of success and msg is not empty
				}

				return data;
			})
			.catch(() => {
				// show snackbar notification here in case of error
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const get = useCallback(
		(url: string, params?: Record<string, any>) => {
			return handleApiRequest(() => api.get(url, { params, baseURL }));
		},
		[handleApiRequest, baseURL],
	);

	const post = useCallback(
		(url: string, data?: Record<string, any>, msg: string = 'Successfully Created') => {
			return handleApiRequest(() => api.post(url, data, { baseURL }), msg);
		},
		[handleApiRequest, baseURL],
	);

	const put = useCallback(
		(url: string, data?: Record<string, any>, msg: string = 'Successfully Updated') => {
			return handleApiRequest(() => api.put(url, data, { baseURL }), msg);
		},
		[handleApiRequest, baseURL],
	);

	const patch = useCallback(
		(url: string, data?: Record<string, any>, msg: string = 'Successfully Updated') => {
			return handleApiRequest(() => api.patch(url, data, { baseURL }), msg);
		},
		[handleApiRequest, baseURL],
	);

	const remove = useCallback(
		(url: string, data?: Record<string, any>, msg: string = 'Successfully Deleted') => {
			return handleApiRequest(() => api.delete(url, { baseURL, data }), msg);
		},
		[handleApiRequest, baseURL],
	);

	return { get, post, put, patch, remove, isLoading };
};
