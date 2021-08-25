import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProductsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Products {
  readonly id: string;
  readonly title?: string;
  readonly quantity?: number;
  readonly description?: string;
  readonly image?: string;
  readonly subtitle?: string;
  readonly barCode?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Products, ProductsMetaData>);
  static copyOf(source: Products, mutator: (draft: MutableModel<Products, ProductsMetaData>) => MutableModel<Products, ProductsMetaData> | void): Products;
}