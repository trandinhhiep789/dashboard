import React from 'react';

const ReactContext = React.createContext({
    dataGrid: [],
    callSearchData: () => { },
})

ReactContext.displayName = "ShipmentQualityAssess";
export default ReactContext;