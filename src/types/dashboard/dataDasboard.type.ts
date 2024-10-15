export type DataDashboardType = {
    name:string;
    created_at:Date
}
export type ChartDatasetType = {
    labels:string[]
    datasets:ChartDataset[]
}

export type ChartDataset = {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    fill: boolean,
}