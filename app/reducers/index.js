import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { loading, failed, navigate, activePageHome } from './processor'
import { customers } from './customers'
import { sessionPersistance } from './session'
import { regionals } from './regionals'
import { products } from './products'
import { subproducts } from './subproducts'
import { users, userRegionRank, userNationRank } from './users'
import { pipelines } from './pipelines'

const config = {
  key: 'root',
  storage
}

const reducers = persistCombineReducers(config, {
  userRegionRank, userNationRank, pipelines,
  loading, failed, navigate, activePageHome, customers, sessionPersistance, regionals, products, subproducts, users
})

export default reducers