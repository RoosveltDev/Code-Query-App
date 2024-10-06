
const sanitizeInput= function (inputText:string){
    const htmlEntities:{[id:string]:string} = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
      }
    return inputText.replace(/([&<>"'])/g, match => htmlEntities[match])

}

export default sanitizeInput