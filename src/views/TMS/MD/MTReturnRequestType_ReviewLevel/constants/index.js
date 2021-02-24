export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/MTReturnRequestType_ReviewLevel/Add";
export const UpdateAPIPath = "api/MTReturnRequestType_ReviewLevel/Update";
export const DeleteAPIPath = "api/MTReturnRequestType_ReviewLevel/Delete";
export const LoadAPIPath = "api/MTReturnRequestType_ReviewLevel/Load";
export const BackLink = "/MTReturnRequestType";


export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MTReturnRequestType", Title: "Loại yêu cầu nhập trả vật tư" },
    //{ Link: "/InventoryRequestType/ReviewLevelDetail", Title: "Mức duyệt" },
    { Link: "", Title: "Mức duyệt yêu cầu nhập trả vật tư" }
];

export const ModalColumnList_Insert = [
    {
        Name: "ReviewLevelID",
        type: "text",
        label: "mã mức duyệt",
        maxSize: "9",
        DataSourceMember: "ReviewLevelID",
        readonly: false,
        validatonList: ["required","number"]
    },
    {
        Name: "ReviewLevelName",
        type: "text",
        label: "tên mức duyệt",
        maxSize: "200",
        DataSourceMember: "ReviewLevelName",
        readonly: false,
        validatonList: []
    },
    {
        Name: "ReviewOrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "ReviewOrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
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
    {
        Name: "ReviewLevelID",
        type: "text",
        label: "mã mức duyệt",
        maxSize: "9",
        DataSourceMember: "ReviewLevelID",
        readonly: true,
        validatonList: ["required","number"]
    },
    {
        Name: "ReviewLevelName",
        type: "text",
        label: "tên mức duyệt",
        maxSize: "200",
        DataSourceMember: "ReviewLevelName",
        readonly: false,
        validatonList: []
    },
    {
        Name: "ReviewOrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "ReviewOrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
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
        Name: "chkSelectReviewLevelID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ReviewLevelID",
        Width: 60
    },
    {
        Name: "ReviewLevelID",
        Type: "text",
        Caption: "Mã mức duyệt",
        DataSourceMember: "ReviewLevelID",
        Width: 150
    },
    {
        Name: "ReviewLevelName",
        Type: "texttolink",
        Link: "/MTReturnRequestType/ReviewLevelDetail/",
        Caption: "Tên mức duyệt",
        DataSourceMember: "ReviewLevelName",
        Width: 300
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 300
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "EditReviewLevelID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ReviewLevelID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "ReviewLevelID",
        DefaultValue: "",
        BindControlName: "ReviewLevelID",
        DataSourceMember: "ReviewLevelID"
    },
    {
        Name: "ReviewLevelName",
        DefaultValue: "",
        BindControlName: "ReviewLevelName",
        DataSourceMember: "ReviewLevelName"
    },
    {
        Name: "MTReturnRequestTypeID",
        DefaultValue: "",
        BindControlName: "MTReturnRequestTypeID",
        DataSourceMember: "MTReturnRequestTypeID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "ReviewOrderIndex",
        DefaultValue: "",
        BindControlName: "ReviewOrderIndex",
        DataSourceMember: "ReviewOrderIndex"
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