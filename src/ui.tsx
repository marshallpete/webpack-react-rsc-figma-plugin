import { Provider, defaultTheme } from '@adobe/react-spectrum';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './ui.css';
import { ChartBuilder } from './ui/ChartBuilder';
import { store } from './ui/store';
import { Provider as ReduxProvider } from 'react-redux';

function App() {
	return (
		<ReduxProvider store={store}>
			<Provider theme={defaultTheme} scale="medium" id="provider" height="100vh">
				<ChartBuilder />
			</Provider>
		</ReduxProvider>
	);
}

ReactDOM.createRoot(document.getElementById('react-page')).render(<App />);
