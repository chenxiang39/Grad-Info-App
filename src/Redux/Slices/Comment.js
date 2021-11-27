import { createSlice } from '@reduxjs/toolkit';
import { CommentDataModel } from '../../Model/comment/CommentDataModel';
export const CommentSlice = createSlice({
    name : 'Comment',
    initialState:{
        commentTableData:CommentDataModel.CommentDataModelArray([])
    },
    reducers: {
        SaveCommentTableData: (state,action) =>{
            state.commentTableData = action.payload;
        },
    }
})
export const {SaveCommentTableData} = CommentSlice.actions; 
export const CommentTableData = state => state.Comment.commentTableData;
export default CommentSlice.reducer;