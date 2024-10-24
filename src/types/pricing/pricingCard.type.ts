export type PricingCardType ={
    elementCard:PricingPlansType
    period:boolean
}
export type PricingPlansType= {
    name: string;
    price: number;
    features: string[];
   
}