export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/DeliveryGoodsGroup_Apply/Add";
export const UpdateAPIPath = "api/DeliveryGoodsGroup_Apply/Update";
export const DeleteAPIPath = "api/DeliveryGoodsGroup_Apply/Delete";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm sản phẩm áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     Name: "Description",
    //     type: "textarea",
    //     label: "Mô tả",
    //     maxSize: "2000",
    //     DataSourceMember: "Description",
    //     rows: "6",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     Name: "IsActived",
    //     type: "checkbox",
    //     label: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     readonly: false,
    //     validatonList: [],
    //     value: true
    // },
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
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm sản phẩm áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     Name: "Description",
    //     type: "textarea",
    //     label: "Mô tả",
    //     maxSize: "2000",
    //     DataSourceMember: "Description",
    //     rows: "6",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     Name: "IsActived",
    //     type: "checkbox",
    //     label: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     readonly: false,
    //     validatonList: [],
    //     value: ""
    // },
    // {
    //     Name: "IsSystem",
    //     type: "checkbox",
    //     label: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: [],
    //     value: ""
    // }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectDeliveryGoodsGroupApplyID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DeliveryGoodsGroupApplyID",
        Width: 60
    },
    {
        Name: "MainGroupName",
        Type: "text",
        Caption: "Ngành hàng",
        DataSourceMember: "MainGroupName",
        Width: 350
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm sản phẩm áp dụng",
        DataSourceMember: "SubGroupName",
        Width: 350
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm áp dụng",
        DataSourceMember: "ProductName",
        //Width: 200
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 80
    // },
    {
        Name: "DeliveryGoodsGroupApplyID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "DeliveryGoodsGroupApplyID",
        Width: 80
    }

];

export const MLObjectDefinition = [
    // {
    //     Name: "DeliveryGoodsGroupApplyID",
    //     DefaultValue: "",
    //     BindControlName: "",
    //     DataSourceMember: "DeliveryGoodsGroupApplyID"
    // },
    {
        Name: "DeliveryGoodsGroupApplyID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "DeliveryGoodsGroupApplyID"
    },
    {
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "DeliveryGoodsGroupID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "MainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "SubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "MainGroupName",
        DefaultValue: "",
        BindControlName: "MainGroupName",
        DataSourceMember: "MainGroupName"
    },
    {
        Name: "SubGroupName",
        DefaultValue: "",
        BindControlName: "SubGroupName",
        DataSourceMember: "SubGroupName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
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