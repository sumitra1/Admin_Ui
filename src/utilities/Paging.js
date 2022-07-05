import configObject from '../constantsPageSize'

//define paging

export const getIndexOfRecord = (pageSize)=> {
    return (pageSize-1)*configObject.PAGE_SIZE ;
}

export const getTotalNumberOfPages = (lengthOfPage)=> {
    return Math.ceil(lengthOfPage/10);
}




