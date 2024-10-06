export const validateInputs = <T extends { [key: string]: string|number }, K extends { [key: string]: string|number }>(
    userObject: K,
    schema: T
  ) => {
    const keys = Object.keys(userObject);
  
    for (const key of keys) {
      const type = typeof userObject[key]; 
      if (typeof schema[key] === type) {
            if(type ==='number' &&  isNaN(userObject[key] as number)) return null
      } else return null
    }
    return userObject
  };
export const validatePassword = (password:string)=>{
    const patternMayus = /^(?=.*[A-Z]).*$/;
    const patternLength = /^[A-Za-z\d_\-=?]{8,}$/
    if(!patternMayus.test(password)) return {valid:false,text:"At least one UpperCase"}
    if(!patternLength.test(password)) return {valid:false,text:"At least 8 character length"}
    return {valid:true,text:""}
    
}