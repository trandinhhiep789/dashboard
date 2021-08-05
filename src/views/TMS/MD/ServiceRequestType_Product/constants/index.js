export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/ServiceRequestType_Product/Add";
export const UpdateAPIPath = "api/ServiceRequestType_Product/Update";
export const DeleteAPIPath = "api/ServiceRequestType_Product/Delete";
export const GetUserAPIPath = "api/ServiceRequestType_Product/GetUserByStoreID";
export const BackLink = "/CoordinatorGroup";
export const AddByFileAPIPath = "api/ServiceRequestType_Product/AddByFile";

export const ModalColumnList_Insert = [
    // {
    //     type: "select",
    //     Name: "ProductID",
    //     label: "kho đối tác",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "ProductID",
    //     readonly: false,
    //     validatonList: ["Comborequired"],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
    //     ValueMember: "StoreID",
    //     NameMember: "StoreName",
    //     KeyFilter: "CompanyID",
    //     ValueFilter: 1

    // },

    // {
    //     type: "multiselect",
    //     Name: "ProductID",
    //     label: "sản phẩm/dịch vụ",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "ProductID",
    //     readonly: false,
    //     validatonList: ["Comborequired"],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: false,
    //     // LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
    //     // ValueMember: "StoreID",
    //     // NameMember: "StoreName",
    //     // KeyFilter: "CompanyID",
    //     // ValueFilter: 1
    // },

    {
        Name: "ProductID",
        type: "productbox",
        label: "sản phẩm/dịch vụ",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        //disabled: true,
        validatonList: ["Comborequired"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    // {
    //     Name: "IsSystem",
    //     type: "checkbox",
    //     label: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // }
];

export const ModalColumnList_Edit = [
    {
        Name: "ProductID",
        type: "productbox",
        label: "sản phẩm/dịch vụ",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    // {
    //     Name: "IsSystem",
    //     type: "checkbox",
    //     label: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // }
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
        Caption: "Mã sản phẩm/dịch vụ",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm/dịch vụ",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 150
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 150
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    // {
    //     Name: "EditUserName",
    //     Type: "edit",
    //     Caption: "Sửa",
    //     DataSourceMember: "UserName",
    //     Width: 100
    // }
    {
        Name: "EditProductID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ProductID",
        Width: 100
    }



];

export const MLObjectDefinition = [
    {
        Name: "CSID",
        DefaultValue: "",
        BindControlName: "CSID",
        DataSourceMember: "CSID"
    },
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
    // {
    //     Name: "UserName",
    //     DefaultValue: "",
    //     BindControlName: "UserName",
    //     DataSourceMember: "UserName"
    // },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsSystem"
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


export const schema = {
    'Mã trưởng nhóm': {
        prop: 'UserName',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã trưởng nhóm": '98138'
    }
];