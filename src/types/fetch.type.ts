export type FetchType={
    fetchOptions:{
        context: string;
        method: string;
        data: { [id: string]: string | number };
        hasCredentials: boolean;
        bodyFormat: "row" | "form-data";
    }
}