import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';
import { toggleProductCode, setCurrentProduct, loadProductsSuccess }  from './product.actions';

const initialState: ProductState = {
  showProductCode: true,
  currentProductCode: null,
  currentProduct: null,
  products: []
}

export const productReducer = createReducer<ProductState>(
  initialState,
  on(toggleProductCode, (state):ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  on(loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products
    }
  })
);

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState, 
  state => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

/*
const getCurrentProductCode = createSelector(
  getProductFeatureState,
  state => state.currentProductCode
)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductCode,
  (state, currentProdCode) => state.products.find(prod => prod.productCode === currentProdCode)
)
*/