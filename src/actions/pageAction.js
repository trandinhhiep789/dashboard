import {PAGE_UPDATEPATH}  from "../constants/actionTypes";
export function updatePagePath(pagePath)
{
 //   console.log(PAGE_UPDATEPATH);
    return {
        type: PAGE_UPDATEPATH,
        PagePath:pagePath
    };
}