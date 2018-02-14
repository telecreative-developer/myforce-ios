import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { StackNavigator } from 'react-navigation'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import Reactotron from 'reactotron-react-native'
import thunk from 'redux-thunk'
import reducers from './app/reducers'
import './ReactotronConfig'

import Splash from './app/screens/Splash'
import Start from './app/screens/Start'
import Home from './app/screens/Home'
import Profile from './app/screens/Profile'
import CustomerProfile from './app/screens/CustomerProfile'
import FirstStepper from './app/screens/FirstStepper'
import QuestionPage from './app/screens/QuestionPage'
import Notifications from './app/screens/Notifications'
import SubProduct from './app/screens/SubProduct'
import Settings from './app/screens/Settings'
import EditProfile from './app/screens/EditProfile'
import ChangePassword from './app/screens/ChangePassword'
import ForgotPassword from './app/screens/ForgotPassword'
import OrderSummary from './app/screens/OrderSummary'
import Cart from './app/screens/Cart'
import AddCustomer from './app/screens/AddCustomer'
import AddCustomerPreview from './app/screens/AddCustomerPreview'
import Calendar from './app/screens/Calendar'

const store = Reactotron.createStore(reducers, applyMiddleware(thunk))
const persistor = persistStore(store)

const App = StackNavigator(
	{
		Splash: { screen: Splash },
		Start: { screen: Start },
		Home: { screen: Home },
		AddCustomer: { screen: AddCustomer },
		Profile: { screen: Profile },
		CustomerProfile: { screen: CustomerProfile },
		FirstStepper: { screen: FirstStepper },
		QuestionPage: { screen: QuestionPage },
		Notifications: { screen: Notifications },
		SubProduct: { screen: SubProduct },
		Settings: { screen: Settings },
		EditProfile: { screen: EditProfile },
		ChangePassword: { screen: ChangePassword },
		ForgotPassword: { screen: ForgotPassword },
		OrderSummary: { screen: OrderSummary },
		Cart: { screen: Cart },
		AddCustomerPreview: { screen: AddCustomerPreview },
		Calendar: { screen: Calendar }
	},
	{
		headerMode: 'none'
	}
)

const MyForce = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
)

AppRegistry.registerComponent('myForce', () => MyForce)
