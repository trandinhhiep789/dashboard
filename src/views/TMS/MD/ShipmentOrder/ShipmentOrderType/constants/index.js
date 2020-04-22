export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentOrderType/Search";
export const LoadAPIPath = "api/ShipmentOrderType/Load";
export const AddAPIPath = "api/ShipmentOrderType/Add";
export const UpdateAPIPath = "api/ShipmentOrderType/Update";
export const DeleteAPIPath = "api/ShipmentOrderType/Delete";
export const BackLink = "/ShipmentOrderType";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderTypeID";

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/ShipmentOrderType", Title: "Loại yêu cầu vận chuyển" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ" },
{ Link: "/ShipmentOrderType", Title: "Loại yêu cầu vận chuyển" },
{ Link: "", Title: "Chỉnh sửa Loại yêu cầu vận chuyển" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

// thêm mới loại yêu cầu vận chuyển
export const AddModalColumnList = [
    {
        Name: "ShipmentOrderTypeID",
        type: "numeric",
        label: "Mã loại yêu cầu vận chuyển",
        maxSize: "10",
        DataSourceMember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        Name: "ShipmentOrderTypeName",
        type: "text",
        label: "Tên loại yêu cầu vận chuyển",
        maxSize: "200",
        DataSourceMember: "ShipmentOrderTypeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        Name: "AddFunctionID",
        type: "text",
        label: "Quyền thêm yêu cầu này",
        maxSize: "400",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        validatonList: []
    },
    // {
    //     Name: "PieTypeID",
    //     type: "select",
    //     label: "Mã loại yêu cầu",
    //     DataSourceMember: "PieTypeID",
    //     readonly: false,
    //     validatonList: ["required"],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
    //     ValueMember: "PieTypeID",
    //     NameMember: "PieTypeName",
    // },
    {
        Name: "IsSelectSenderPartner",
        type: "checkbox",
        label: "IsSelectSenderPartner",
        DataSourceMember: "IsSelectSenderPartner",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "IsSelectSenderStore",
        type: "checkbox",
        label: "IsSelectSenderStore",
        DataSourceMember: "IsSelectSenderStore",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "IsSelectReceiverPartner",
        type: "checkbox",
        label: "IsSelectReceiverPartner",
        DataSourceMember: "IsSelectReceiverPartner",
        readonly: false,
        validatonList: [],
        value: false
    },
    {
        Name: "IsSelectReceiverStore",
        type: "checkbox",
        label: "IsSelectReceiverStore",
        DataSourceMember: "IsSelectReceiverStore",
        readonly: false,
        validatonList: [],
        value: false
    },
    //  {
    //     Name: "PartnerID",
    //     type: "select",
    //     label: "Mã đối tác",
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    //     // LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
    //     // ValueMember: "PieTypeID",
    //     // NameMember: "PieTypeName",
    // },
    // {
    //     Name: "StatusID",
    //     type: "select",
    //     label: "Trạng thái vận chuyển",
    //     DataSourceMember: "StatusID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    //     // LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
    //     // ValueMember: "PieTypeID",
    //     // NameMember: "PieTypeName",
    // },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        rows: "6",
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        validatonList: []
    }

];

export const MTabList = [
    {
        Name: "PieRequestType",
        DefaultValue: "",
        BindControlName: "PieRequestType",
        DataSourceMember: "PieRequestType"
    },
    {
        Name: "PieRequestTypeWorkflow",
        DefaultValue: "",
        BindControlName: "PieRequestTypeWorkflow",
        DataSourceMember: "PieRequestTypeWorkflow"
    }
];

//loại yêu cầu vận chuyển object
export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        Label: "mã loại yêu cầu vận chuyển",
        BindControlName: "ShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        ValidationList: ["required"]
    },
    {
        Name: "ShipmentOrderTypeName",
        DefaultValue: "",
        Label: "tên loại yêu cầu vận chuyển",
        BindControlName: "ShipmentOrderTypeName",
        DataSourceMember: "ShipmentOrderTypeName",
        ValidationList: ["required"]
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        Label: "Quyền thêm yêu cầu này",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsSelectSenderPartner",
        DefaultValue: "",
        BindControlName: "IsSelectSenderPartner",
        DataSourceMember: "IsSelectSenderPartner"
    },
    {
        Name: "IsSelectSenderStore",
        DefaultValue: "",
        BindControlName: "IsSelectSenderStore",
        DataSourceMember: "IsSelectSenderStore"
    },
    {
        Name: "IsSelectReceiverPartner",
        DefaultValue: "",
        BindControlName: "IsSelectReceiverPartner",
        DataSourceMember: "IsSelectReceiverPartner"
    },
    {
        Name: "IsSelectReceiverStore",
        DefaultValue: "",
        BindControlName: "IsSelectReceiverStore",
        DataSourceMember: "IsSelectReceiverStore"
    },
    {
        Name: "Description",
        DefaultValue: "",
        Label: "Mô tả",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
        Label: "Thứ tự hiển thị",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        Label: "kích hoạt",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        Label: "Hệ thống",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    //mã đối tác 
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "PartnerID",
        DataSourceMember: "PartnerID"
    },
    //trạng thái vận chuyển
    {
        Name: "StatusID",
        DefaultValue: "",
        BindControlName: "StatusID",
        DataSourceMember: "StatusID"
    }

];

// lưới hiển thị danh sách loại yêu cầu vận chuyển
export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentOrderTypeID",
        Width: 50
    },
    {
        Name: "ShipmentOrderTypeID",
        Type: "text",
        Caption: "Mã loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeID",
        Width: 200
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Tên loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 300
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PieRequestTypeID",
        Width: 200,
        Link: "/ShipmentOrderType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const WFColumnList = [
    {
        Name: "chkSelectShipmentOrderStepID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentOrderStepID",
        Width: 100
    },
    {
        Name: "ShipmentOrderStepID",
        Type: "text",
        Caption: "Mã bước xử lý",
        DataSourceMember: "ShipmentOrderStepID",
        Width: 120
    },
    {
        Name: "ShipmentOrderStepName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "ShipmentOrderStepName",
        Width: 200
    },
    {
        Name: "StepCompletePercent",
        Type: "text",
        Caption: "% hoàn thành",
        DataSourceMember: "StepCompletePercent",
        Width: 150
    },
    {
        Name: "MaxProcessTime",
        Type: "text",
        Caption: "Thời gian XL tối đa",
        DataSourceMember: "DisplayProcessTime",
        Width: 150
    },
    {
        Name: "IsInitStep",
        Type: "checkicon",
        Caption: "Là bước khởi tạo",
        DataSourceMember: "IsInitStep",
    },
    {
        Name: "IsFinishStep",
        Type: "checkicon",
        Caption: "Là bước hoàn thành",
        DataSourceMember: "IsFinishStep",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived"
    },
    {
        Name: "EditShipmentOrderStepID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ShipmentOrderStepID",
    }
];

export const MLObjectShipmentOrderTypeWorkFlow = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID"
    },
    {
        Name: "ShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepID",
        DataSourceMember: "ShipmentOrderStepID"
    },
    {
        Name: "ShipmentOrderStepName",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepName",
        DataSourceMember: "ShipmentOrderStepName"
    },
    {
        Name: "AutoChangeToShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangeToShipmentOrderStatusID",
        DataSourceMember: "AutoChangeToShipmentOrderStatusID"
    },
    {
        Name: "StepColorCode",
        DefaultValue: "",
        BindControlName: "StepColorCode",
        DataSourceMember: "StepColorCode"
    },
    {
        Name: "StepCompletePercent",
        DefaultValue: "",
        BindControlName: "StepCompletePercent",
        DataSourceMember: "StepCompletePercent"
    },
    {
        Name: "MaxProcessTime",
        DefaultValue: "",
        BindControlName: "MaxProcessTime",
        DataSourceMember: "MaxProcessTime"
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep"
    },
    {
        Name: "IsFinishStep",
        DefaultValue: "",
        BindControlName: "IsFinishStep",
        DataSourceMember: "IsFinishStep"
    },
    {
        Name: "IsMustChooseProcessUser",
        DefaultValue: "",
        BindControlName: "IsMustChooseProcessUser",
        DataSourceMember: "IsMustChooseProcessUser"
    },
    {
        Name: "IsSentEmail",
        DefaultValue: "",
        BindControlName: "IsSentEmail",
        DataSourceMember: "IsSentEmail"
    },
    {
        Name: "IsSentSMS",
        DefaultValue: "",
        BindControlName: "IsSentSMS",
        DataSourceMember: "IsSentSMS"
    },
    {
        Name: "SMSTemplate",
        DefaultValue: "",
        BindControlName: "SMSTemplate",
        DataSourceMember: "SMSTemplate"
    },
    {
        Name: "EmailTitle",
        DefaultValue: "",
        BindControlName: "EmailTitle",
        DataSourceMember: "EmailTitle"
    },
    {
        Name: "EmailTemplate",
        DefaultValue: "",
        BindControlName: "EmailTemplate",
        DataSourceMember: "EmailTemplate"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "PieRequestType_WF_Next",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Next",
        DataSourceMember: "PieRequestType_WF_Next"
    },
    {
        Name: "PieRequestType_WF_Permis",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Permis",
        DataSourceMember: "PieRequestType_WF_Permis"
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