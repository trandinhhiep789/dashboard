export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/MaterialGroup_Product/Add";
export const UpdateAPIPath = "api/MaterialGroup_Product/Update";
export const DeleteAPIPath = "api/MaterialGroup_Product/Delete";

export const ModalColumnList_Insert = [
    // {
    //     type: "multiselect",
    //     Name: "SkillRankID",
    //     label: "cấp bậc kỹ năng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SkillRankID",
    //     readonly: false,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
    //     ValueMember: "SkillRanKid",
    //     NameMember: "SkillRankName"
    // },
    {
        Name: "ProductID",
        type: "productbox",
        label: "mã sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        Name: "ConvertRatio",
        type: "text",
        label: "tỷ lệ quy đổi",
        maxSize: "9",
        value: 0,
        DataSourceMember: "ConvertRatio",
        readonly: false,
        validatonList: ["required","digit"]
    },
    {
        type: "multiselect",
        Name: "AdvanceQuantityUnitID",
        label: "đơn vị tính SP tạm ứng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AdvanceQuantityUnitID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnit"
    },
    {
        Name: "AdvanceProductID",
        type: "productbox",
        label: "mã sản phẩm tạm ứng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "AdvanceProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        Name: "AdvanceConveratio",
        type: "text",
        label: "tỷ lệ quy đổi tạm ứng",
        maxSize: "9",
        value: 0,
        DataSourceMember: "AdvanceConveratio",
        readonly: false,
        validatonList: ["required","digit"]
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
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
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const ModalColumnList_Edit = [
    // {
    //     type: "multiselect",
    //     Name: "SkillRankID",
    //     label: "cấp bậc kỹ năng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SkillRankID",
    //     readonly: true,
    //     disabled: true,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SKILLRANK",
    //     ValueMember: "SkillRanKid",
    //     NameMember: "SkillRankName"
    // },
    // {
    //     Name: "ProductID",
    //     type: "productbox",
    //     label: "mã sản phẩm vật tư",
    //     //maxSize: "20",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "ProductID",
    //     readonly: true,
    //     disabled: true,
    //     validatonList: ["Comborequired"]
    // },

    {
        Name: "ProductID",
        type: "text",
        label: "mã sản phẩm vật tư",
        DataSourceMember: "ProductID",
        readonly: true,
        validatonList: []
    },
    {
        Name: "ProductName",
        type: "text",
        label: "tên sản phẩm vật tư",
        DataSourceMember: "ProductName",
        readonly: true,
        validatonList: []
    },
    {
        Name: "ConvertRatio",
        type: "text",
        label: "tỷ lệ quy đổi",
        maxSize: "9",
        value: 0,
        DataSourceMember: "ConvertRatio",
        readonly: false,
        validatonList: ["required","digit"]
    },
    {
        type: "multiselect",
        Name: "AdvanceQuantityUnitID",
        label: "đơn vị tính SP tạm ứng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AdvanceQuantityUnitID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.QUANTITYUNIT",
        ValueMember: "QuantityUnitID",
        NameMember: "QuantityUnit"
    },
    {
        Name: "AdvanceProductID",
        type: "productbox",
        label: "mã sản phẩm tạm ứng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "AdvanceProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        Name: "AdvanceConveratio",
        type: "text",
        label: "tỷ lệ quy đổi tạm ứng",
        maxSize: "9",
        value: 0,
        DataSourceMember: "AdvanceConveratio",
        readonly: false,
        validatonList: ["required","digit"]
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
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
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectMaterialGroupProductCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "MaterialGroupProductCSID",
        Width: 60
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm vật tư",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm vật tư",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "ConvertRatio",
        Type: "text",
        Caption: "Tỷ lệ quy đổi",
        DataSourceMember: "ConvertRatio",
        Width: 150
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "MaterialGroupProductCSID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "MaterialGroupProductCSID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "MaterialGroupProductCSID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "MaterialGroupProductCSID"
    },
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "MaterialGroupID"
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
    {
        Name: "ConvertRatio",
        DefaultValue: "",
        BindControlName: "ConvertRatio",
        DataSourceMember: "ConvertRatio"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
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
        Name: "AdvanceQuantityUnitID",
        DefaultValue: "",
        BindControlName: "AdvanceQuantityUnitID",
        DataSourceMember: "AdvanceQuantityUnitID"
    },
    {
        Name: "AdvanceProductID",
        DefaultValue: "",
        BindControlName: "AdvanceProductID",
        DataSourceMember: "AdvanceProductID"
    },
    {
        Name: "AdvanceConveratio",
        DefaultValue: "",
        BindControlName: "AdvanceConveratio",
        DataSourceMember: "AdvanceConveratio"
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