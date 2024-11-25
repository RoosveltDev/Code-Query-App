export const updatedHtmlString = (htmlString:string,bucketURL:string)=>{
    return htmlString.replace(
    /<img\s+[^>]*src=["']([^"']*)["']/,
    `<img src="${bucketURL}"`
  )

}