import AdmissionInfo from '../MainPage/MainContent/Content/AdmissionInfo/AdmissionInfo'
import TransferRecords from '../MainPage/MainContent/Content/TransferRecords/TransferRecords';
import NonCourseRelatedEvent from '../MainPage/MainContent/Content/NonCourseRelatedEvent/NonCourseRelatedEvent';
import Comment from '../MainPage/MainContent/Content/Comment/Comment';
import DegreeCheck from '../MainPage/MainContent/Content/DegreeCheck/DegreeCheck';
import StarsExcption from '../MainPage/MainContent/Content/StarsException/StarsException'
export const titleDataArr = [
    {title:"ADMISSION INFO",link:"ADMISSION%20INFO",element:<AdmissionInfo/>},
    {title:"TRANSFER RECORDS",link:"TRANSFER%20RECORDS",element:<TransferRecords/>},
    {title:"NON-COURSE RELATED EVENTS",link:"NON-COURSE%20RELATED%20EVENTS",element:<NonCourseRelatedEvent/>},
    {title:"COMMENTS",link:"COMMENTS",element:<Comment/>},
    {title:"DEGREE CHECK",link:"DEGREE%20CHECK",element:<DegreeCheck/>},
    {title:"STARS EXCEPTION",link:"STARS%20EXCEPTION",element:<StarsExcption/>}
]