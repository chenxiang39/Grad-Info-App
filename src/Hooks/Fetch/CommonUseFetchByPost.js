import { useState, useEffect, useCallback } from 'react';
import { useDispatch} from 'react-redux';
export default function CommonUseFetchByPost(props) {
    //https://www.robinwieruch.de/react-hooks-fetch-data/
    const {apiFun,dataModelSaveFun} = props;
    const [data, setData] = useState({});
    const [error, seterror] = useState(null);
    const fetchData = async (requestBody) => {
        try{
            let res = await apiFun(requestBody);
            setData(dataModelSaveFun(res));
        }catch(error){
            seterror(error);
        }
    }
    return [data, error,fetchData];
}
