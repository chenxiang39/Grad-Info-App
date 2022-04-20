const CheckRegex = (value, pattern) => {
    if(!value){
        return true;
    }
    const regex = new RegExp(pattern);
    return regex.test(value);
}

export default CheckRegex;