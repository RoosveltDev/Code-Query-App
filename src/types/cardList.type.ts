import { ReactNode } from "react";

export interface CardListType<T> {
    cardData: T;    
    index: number;
    elementCard: ReactNode[];  
    customClass?:string;
    clickFn?:()=>void
  }
