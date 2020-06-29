export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Partner/Search";
export const LoadAPIPath = "api/Partner/Load";
export const AddAPIPath = "api/Partner/Add";
export const UpdateAPIPath = "api/Partner/Update";
export const DeleteAPIPath = "api/Partner/Delete";
export const UpdateOrderAPIPath = "api/Partner/UpdateOrder";
export const BackLink = "/Partner";
export const AddLink = "/Partner/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];
import {CDN_LOGO_IMAGE} from '../../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Partner", Title: "Danh sách đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Partner", Title: "Danh sách đối tác" },
    { Link: "", Title: "Thêm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtPartnerID",
        label: "Mã đối tác",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "txtPartnerTypeID",
        label: "Loại nhà cung cấp",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERTYPE",
        ValueMember: "PartnerTypeID",
        NameMember: "PartnerTypeName"
    },
    {
        type: "text",
        name: "txtPartnerName",
        label: "Tên đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtBusinessRegistrationNumber",
        label: "Số giấy đăng ký kinh doanh",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BusinessRegistrationNumber",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtIncorporationDate",
        label: "Ngày thành lập",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "IncorporationDate",
        ValueMember: "IncorporationDate",
        NameMember: "IncorporationDate",
        validatonList: ["date"]
    },
    {
        type: "select",
        name: "txtCountryID",
        label: "Quốc gia",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CountryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.COUNTRY",
        ValueMember: "CountryID",
        NameMember: "CountryName"
    },
    {
        type: "select",
        name: "txtProvinceID",
        label: "Tỉnh/thành phố",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProvinceID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
    },
    {
        type: "select",
        name: "txtDistrictID",
        label: "Quận/huyện",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DistrictID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName"
    },
    {
        type: "select",
        name: "txtWardID",
        label: "Phường/xã",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "WardID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.WARD",
        ValueMember: "WardID",
        NameMember: "WardName"
    },
    {
        type: "text",
        name: "txtAddress",
        label: "Số nhà/đường",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Address",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtFullAddress",
        label: "Địa chỉ đầy đủ",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "FullAddress",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtWebSite",
        label: "Website đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "WebSite",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtPhoneNumber",
        label: "Điện thoại",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerFullName",
        label: "Tên chủ doanh nghiệp",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerFullName",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerTitle",
        label: "Chức vụ",
        maxSize: "50",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerTitle",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerPhoneNumber",
        label: "Số điện thoại chủ doanh nghiệp",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerPhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerEmail",
        label: "Email chủ doanh nghiệp",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerEmail",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "text",
        name: "txtContactFullName",
        label: "Tên người liên hệ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactFullName",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactTitle",
        label: "Chức vụ người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactTitle",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactPhoneNumber",
        label: "Số điện thoại người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactPhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactEmail",
        label: "Email người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactEmail",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "singleFileUpload",
        name: "txtPictureURL",
        NameMember: "PictureURL",
        label: "Logo nhà cung cấp dịch vụ",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "PictureURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtCustomerID",
        label: "Mã khách hàng của NCC",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CustomerID",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtPartnerID",
        label: "Mã đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "txtPartnerTypeID",
        label: "Loại nhà cung cấp",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERTYPE",
        ValueMember: "PartnerTypeID",
        NameMember: "PartnerTypeName"
    },
    {
        type: "text",
        name: "txtPartnerName",
        label: "Tên đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtBusinessRegistrationNumber",
        label: "Số giấy đăng ký kinh doanh",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BusinessRegistrationNumber",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtIncorporationDate",
        label: "Ngày thành lập",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "IncorporationDate",
        ValueMember: "IncorporationDate",
        NameMember: "IncorporationDate",
        validatonList: ["date"]
    },
    {
        type: "select",
        name: "txtCountryID",
        label: "Quốc gia",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CountryID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.COUNTRY",
        ValueMember: "CountryID",
        NameMember: "CountryName"
    },
    {
        type: "select",
        name: "txtProvinceID",
        label: "Tỉnh/thành phố",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProvinceID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
    },
    {
        type: "select",
        name: "txtDistrictID",
        label: "Quận/huyện",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DistrictID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName"
    },
    {
        type: "select",
        name: "txtWardID",
        label: "Phường/xã",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "WardID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.WARD",
        ValueMember: "WardID",
        NameMember: "WardName"
    },
    {
        type: "text",
        name: "txtAddress",
        label: "Số nhà/đường",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Address",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtFullAddress",
        label: "Địa chỉ đầy đủ",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "FullAddress",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtWebSite",
        label: "Website đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "WebSite",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtPhoneNumber",
        label: "Điện thoại",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerFullName",
        label: "Tên chủ doanh nghiệp",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerFullName",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerTitle",
        label: "Chức vụ",
        maxSize: "50",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerTitle",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerPhoneNumber",
        label: "Số điện thoại chủ doanh nghiệp",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerPhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOwnerEmail",
        label: "Email chủ doanh nghiệp",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "OwnerEmail",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "text",
        name: "txtContactFullName",
        label: "Tên người liên hệ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactFullName",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactTitle",
        label: "Chức vụ người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactTitle",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactPhoneNumber",
        label: "Số điện thoại người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactPhoneNumber",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtContactEmail",
        label: "Email người liên hệ",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContactEmail",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "singleFileUpload",
        name: "txtPictureURL",
        NameMember: "PictureURL",
        label: "Logo nhà cung cấp dịch vụ",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "PictureURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtCustomerID",
        label: "Mã khách hàng của NCC",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "CustomerID",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "PartnerTypeID",
        DefaultValue: "",
        BindControlName: "txtPartnerTypeID",
        DataSourceMember: "PartnerTypeID"
    },
    {
        Name: "PartnerName",
        DefaultValue: "",
        BindControlName: "txtPartnerName",
        DataSourceMember: "PartnerName"
    },
    {
        Name: "BusinessRegistrationNumber",
        DefaultValue: "",
        BindControlName: "txtBusinessRegistrationNumber",
        DataSourceMember: "BusinessRegistrationNumber"
    },
    {
        Name: "IncorporationDate",
        DefaultValue: "",
        BindControlName: "txtIncorporationDate",
        DataSourceMember: "IncorporationDate"
    },
    {
        Name: "CountryID",
        DefaultValue: "",
        BindControlName: "txtCountryID",
        DataSourceMember: "CountryID"
    },
    {
        Name: "ProvinceID",
        DefaultValue: "",
        BindControlName: "txtProvinceID",
        DataSourceMember: "ProvinceID"
    },
    {
        Name: "DistrictID",
        DefaultValue: "",
        BindControlName: "txtDistrictID",
        DataSourceMember: "DistrictID"
    },
    {
        Name: "WardID",
        DefaultValue: "",
        BindControlName: "txtWardID",
        DataSourceMember: "WardID"
    },
    {
        Name: "Address",
        DefaultValue: "",
        BindControlName: "txtAddress",
        DataSourceMember: "Address"
    },
    {
        Name: "FullAddress",
        DefaultValue: "",
        BindControlName: "txtFullAddress",
        DataSourceMember: "FullAddress"
    },
    {
        Name: "WebSite",
        DefaultValue: "",
        BindControlName: "txtWebSite",
        DataSourceMember: "WebSite"
    },
    {
        Name: "PhoneNumber",
        DefaultValue: "",
        BindControlName: "txtPhoneNumber",
        DataSourceMember: "PhoneNumber"
    },
    {
        Name: "OwnerFullName",
        DefaultValue: "",
        BindControlName: "txtOwnerFullName",
        DataSourceMember: "OwnerFullName"
    },
    {
        Name: "OwnerTitle",
        DefaultValue: "",
        BindControlName: "txtOwnerTitle",
        DataSourceMember: "OwnerTitle"
    },
    {
        Name: "OwnerPhoneNumber",
        DefaultValue: "",
        BindControlName: "txtOwnerPhoneNumber",
        DataSourceMember: "OwnerPhoneNumber"
    },
    {
        Name: "OwnerEmail",
        DefaultValue: "",
        BindControlName: "txtOwnerEmail",
        DataSourceMember: "OwnerEmail"
    },
    {
        Name: "ContactFullName",
        DefaultValue: "",
        BindControlName: "txtContactFullName",
        DataSourceMember: "ContactFullName"
    },
    {
        Name: "ContactTitle",
        DefaultValue: "",
        BindControlName: "txtContactTitle",
        DataSourceMember: "ContactTitle"
    },
    {
        Name: "ContactPhoneNumber",
        DefaultValue: "",
        BindControlName: "txtContactPhoneNumber",
        DataSourceMember: "ContactPhoneNumber"
    },
    {
        Name: "ContactEmail",
        DefaultValue: "",
        BindControlName: "txtContactEmail",
        DataSourceMember: "ContactEmail"
    },
    {
        Name: "PictureURL",
        DefaultValue: "",
        BindControlName: "txtPictureURL",
        DataSourceMember: "PictureURL"
    },
    {
        Name: "CustomerID",
        DefaultValue: "",
        BindControlName: "txtCustomerID",
        DataSourceMember: "CustomerID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUserFullName",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerID",
        Width: 60
    },
    {
        Name: "PartnerID",
        Type: "text",
        Caption: "Mã đối tác",
        DataSourceMember: "PartnerID",
        Width: 150
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Tên đối tác",
        DataSourceMember: "PartnerName",
        Width: 450
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 250
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "CarrierTypeID",
        Width: 100,
        Link: "/Partner/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
