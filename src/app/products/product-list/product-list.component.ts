import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State } from '../state/product.state';
import { getCurrentProduct, getProducts, getShowProductCode } from '../state/product.reducer';
import { loadProducts, setCurrentProduct, toggleProductCode }  from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  selectedProduct$: Observable<Product>;
  //sub: Subscription;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.products$ = this.store.select(getProducts);
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.store.dispatch(loadProducts());

    // TODO: Unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => {
          this.displayCode = showProductCode
        }
      );
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.store.dispatch(
    //   { type: '[Product] Toggle Product Code' }
    // );

    this.store.dispatch(toggleProductCode());
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    
    this.store.dispatch(setCurrentProduct({product}));
  }

}
