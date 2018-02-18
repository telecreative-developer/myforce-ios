import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { loading, success, failed, navigate, activePageHome } from './processor'
import {
	customers,
	resultCustomersPlace,
	selectedCustomerPlace,
	resultCheckCustomer
} from './customers'
import { sessionPersistance } from './session'
import { regionals } from './regionals'
import { products } from './products'
import { subproducts } from './subproducts'
import { users, userRegionRank, userNationRank } from './users'
import { pipelines, pipelinesWithUserId } from './pipelines'
import { pics, picsCustomers, resultPics } from './pics'
import { questionWithStep } from './questions'

const config = {
	key: 'root',
	storage
}

const reducers = persistCombineReducers(config, {
	userRegionRank,
	userNationRank,
	pipelines,
	pipelinesWithUserId,
	loading,
	success,
	failed,
	navigate,
	activePageHome,
	customers,
	resultCustomersPlace,
	selectedCustomerPlace,
	resultCheckCustomer,
	sessionPersistance,
	regionals,
	products,
	subproducts,
	users,
	pics,
	picsCustomers,
	resultPics,
	questionWithStep
})

export default reducers
