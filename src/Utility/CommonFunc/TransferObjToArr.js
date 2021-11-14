export default function TransferObjToArr(data){
    let arr =[];
    for(let i in data){
        let o = {};
        o[i] = data[i];
        arr.push(o);
    }
    return arr;
}