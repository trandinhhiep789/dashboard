export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/accountinfo", Title: "Thông tin cá nhân" }
];

export const SidebarAccountInfo = [
    {
        MenuName: "CommonInfo",
        MenuTitle: "Thông tin chung",
        LinkTo: "",
        MenuIcon: "",
        SubMenu: [
            {
                MenuName: "CommonInfo1",
                MenuTitle: "Thông tin chung 1",
                LinkTo: "/accountinfo",
                MenuIcon: "",
                SubMenu: []
            },
        ]
    },
    {
        MenuName: "ChangePassword",
        MenuTitle: "Đổi mật khẩu",
        LinkTo: "/accountinfo/changepassword",
        MenuIcon: "",
        SubMenu: []
    },
    {
        MenuName: "Video",
        MenuTitle: "Video",
        LinkTo: "/accountinfo/video",
        MenuIcon: "",
        SubMenu: []
    }
]