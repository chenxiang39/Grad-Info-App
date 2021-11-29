import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
export default function CommonUseFetchByGet(props) {
    //https://www.robinwieruch.de/react-hooks-fetch-data/
    const {params, apiFun,dispatchSaveFun, dataModlSaveFun, dependencies} = props;
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        let didCancel = false;
        setdataLoading(true);
        apiFun(...params).then((res) => {
            if(!didCancel){
                dispatch(dispatchSaveFun(dataModlSaveFun(res)));
                setdataLoading(false);
            }
        }, 
        (err) => {
            if(!didCancel){
                seterror(err);
            }
        })
        return ()=>{
            didCancel = true;
        }
    },[...dependencies]);

    return [dataLoading,error];
}