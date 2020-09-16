export interface Ingredient{
  idIngredient:string;
  strDescription:string|null;
  strIngredient : string|null;
  strType : string|null;
  strAlcohol : string|null;
  strABV:string|null;
}

export interface RefrigeItemInterface{
  index: number;
  name: string;
  type: string;
  alcohol: string;
  abv: string;
  handleSelectedIngredients:  (index: number, PushOrPop: boolean) => void;
}

export interface IngredientFilter {
  strType: string;
  strAlcohol: string; 
}

export interface DialogProps{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  defaultInfo?: any;
  request: () => void;
}