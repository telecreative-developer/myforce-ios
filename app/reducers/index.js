import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { loading, success, failed, navigate, activePageHome } from './processor'
import { customers, resultCustomersPlace } from './customers'
import { sessionPersistance } from './session'
import { products } from './products'
import { subproducts } from './subproducts'
import { users } from './users'
import { pipelines, pipelinesWithUserId, pipelineProducts } from './pipelines'
import { pics, picsCustomers, resultPics } from './pics'
import { questionWithStep } from './questions'
import { sellingProcessWithStep } from './sellingprocess'
import { teamUpdatesWithBranch } from './updates'
import { cartProducts } from './cart'
import { target } from './targets'
import { events } from './events'
import { points } from './points'
import { checks } from './checks'

const config = {
	key: 'root',
	storage
}

const reducers = persistCombineReducers(config, {
	pipelines,
	pipelinesWithUserId,
	loading,
	success,
	failed,
	checks,
	pipelineProducts,
	navigate,
	activePageHome,
	customers,
	resultCustomersPlace,
	sessionPersistance,
	products,
	subproducts,
	users,
	pics,
	picsCustomers,
	resultPics,
	questionWithStep,
	sellingProcessWithStep,
	teamUpdatesWithBranch,
	cartProducts,
	target,
	events,
	points
})

export default reducers
