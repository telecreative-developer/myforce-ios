import { reactotronRedux } from 'reactotron-redux'
import Reactotron from 'reactotron-react-native'

Reactotron
	.configure({ name: 'myForce' })
	.useReactNative()
	.use(reactotronRedux())
	.connect()