import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {BachelorDegreeInfoDataModel} from '../../../Model/transferCourse/BachelorDegreeInfoDataModel'
import {getBachelorDegreeInfoByID} from '../../../Api/transferCourse'
import {SaveBachelorDegreeInfoData} from '../../../Redux/Slices/TransferCourse'
export default function useFetchBachelorDegreeInfo(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getBachelorDegreeInfoByID(curStudentID).then((res) => {
            dispatch(SaveBachelorDegreeInfoData(BachelorDegreeInfoDataModel.BechelorDegreeInfoDataModelObj(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
