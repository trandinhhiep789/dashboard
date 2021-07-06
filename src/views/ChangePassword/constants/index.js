export const PagePath = [{ Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
{ Link: "", Title: "Đổi mật khẩu" }
];


export const ElementList = [
  // {
  //   type: "text",
  //   name: "txtUserName",
  //   label: "Tên truy cập:",
  //   value: "",
  //   DataSourceMember: "UserName",
  //   readonly: true,
  //   placeholder: "",
  //   icon: "",
  //   listoption: {},
  //   validatonList: []

  // },
  {
    type: "password",
    name: "txtOldPassWord",
    label: "Mật khẩu cũ",
    value: "",
    placeholder: "",
    DataSourceMember: "OldPassWord",
    icon: "",
    listoption: {},
    validatonList: ["required"]

  },
  {
    type: "password",
    name: "txtPassWord",
    label: "Mật khẩu mới",
    value: "",
    placeholder: "",
    isCheckPasswork: true,
    icon: "",
    listoption: {},
    validatonList: ["required"]

  },
  {
    type: "password",
    name: "txtPassWordConfirm",
    label: "Gõ lại mật khẩu mới",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    validatonList: ["required"]
  },
  {
    type: "checkbox",
    name: "chkShowPassWord",
    label: "Hiển thị mật khẩu:",
    value: "",
    placeholder: "",
    icon: "",
    listoption: [],
    readonly: false,
    DataSourceMember: "",
    validatonList: []
  }
];

export const MLObjectDefinition = [
  {
    Name: "UserName",
    DefaultValue: "",
    BindControlName: "txtUserName",
    DataSourceMember: "UserName"
  },
  {
    Name: "OldPassWord",
    DefaultValue: "",
    BindControlName: "txtOldPassWord",
    DataSourceMember: "OldPassWord"
  },
  {
    Name: "PassWord",
    DefaultValue: "",
    BindControlName: "txtPassWord",
    DataSourceMember: "PassWord"
  },
  {
    Name: "PassWordConfirm",
    DefaultValue: "",
    BindControlName: "txtPassWordConfirm",
    DataSourceMember: "PassWordConfirm"
  }
]