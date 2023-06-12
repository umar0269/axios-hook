import { useWeatherService } from '@/services/weather.service';
import { useCallback, useEffect } from 'react';

export default function Home() {
	const { getWeatherAlerts } = useWeatherService();

	const getWeatherAlertsService = useCallback(async () => {
		const data = await getWeatherAlerts();
		console.log(data);
	}, [getWeatherAlerts]);

	useEffect(() => {
		getWeatherAlertsService();
	}, [getWeatherAlertsService]);

	return <>Home</>;
}
