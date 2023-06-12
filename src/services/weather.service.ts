import { useCallback } from 'react';
import { useAxios } from '@/hooks/useAxios';

export const useWeatherService = () => {
	const { get, isLoading } = useAxios();

	const getWeatherAlerts = useCallback(() => get('/alerts', { lat: '38.5', lon: '-78.5' }), [get]);

	return { getWeatherAlerts, isLoadingWeather: isLoading };
};
