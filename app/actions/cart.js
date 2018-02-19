import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../constants'

const initialIndex = 1

export const addProductToCart = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {
    id_index: initialIndex++,
    ...data
  }
})

export const removeProductFromCart = (id_subproduct) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  id_subproduct
})