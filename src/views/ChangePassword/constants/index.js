export const PagePath = [{ Link: "/", Title: "Trang chủ" , icon: "fa fa-home"},
{ Link: "", Title: "Đổi mật khẩu" }
];


export const ElementList = [
  {
    type: "text",
    name: "txtUserName",
    label: "Tên truy cập:",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    validatonList: ["required"]

  },
  {
    type: "password",
    name: "txtOldPassword",
    label: "Mật khẩu cũ",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    validatonList: ["required"]

  },
  {
    type: "password",
    name: "txtNewPassword",
    label: "Mật khẩu mới",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    validatonList: ["required"]

  },
  {
    type: "password",
    name: "txtConfirmPassword",
    label: "Gõ lại mật khẩu mới",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    validatonList: ["required"]

  }
];

export const MLObjectDefinition = [
  {
    Name: "UserName",
    DefaultValue: "",
    BindControlName: "txtUserName"
  },
  {
    Name: "OldPassword",
    DefaultValue: "",
    BindControlName: "txtOldPassword"
  },
  {
    Name: "NewPassword",
    DefaultValue: "",
    BindControlName: "txtNewPassword"
  }
]