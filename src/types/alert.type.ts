export type AlertContextType = {
    showToast:(message:string,type?:string)=>void
    hideToast:()=>void
    toast: {
        visibility: boolean;
        message: string;
        type: string;
    }
}