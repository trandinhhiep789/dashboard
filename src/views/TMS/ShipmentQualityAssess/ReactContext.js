import React from 'react';

const ReactContext = React.createContext({
    dataGrid: [],
    handleDataGrid: () => { },
})

ReactContext.displayName = "ShipmentQualityAssess";
export default ReactContext;