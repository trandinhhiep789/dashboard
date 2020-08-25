export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/DestroyRequestType_Product/Add";
export const UpdateAPIPath = "api/DestroyRequestType_Product/Update";
export const DeleteAPIPath = "api/DestroyRequestType_Product/Delete";

export const ModalColumnList_Insert = [
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm tạm ứng",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    }
];

export const ModalColumnList_Edit = [
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"]
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectProductID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductID",
        Width: 60
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm tạm ứng",
        DataSourceMember: "ProductID",
        Width: 500
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm tạm ứng",
        DataSourceMember: "ProductName",
        Width: 500
    },
    

];

export const MLObjectDefinition = [
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];