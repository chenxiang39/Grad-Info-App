export default function FilterSamePersonInCommitteeTable(dataArr, dataObjName){
    for(let i = 0; i < dataArr.length; i++){
        if(!!dataArr[i] && dataArr[i].committeeName === dataObjName){
            return true;
        }
    }
    return false;
}