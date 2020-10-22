
import * as AppState from 'src/app/state/app.state';
import { Product } from '../product';

export interface State extends AppState.AppState {
    products: ProductState;
  }
  
  export interface ProductState {
    showProductCode: boolean;
    currentProductCode: string;
    currentProduct: Product;
    products: Product[];
  }