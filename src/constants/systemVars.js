export const AUTHEN_HOSTNAME = "AuthenAPI";
export const AUTHEN_HOST_BASEURL = "https://erpauthenapi.dichvutantam.vn/";
export const CLIENT_INFO_OBJECT_STORENAME = "TTERP_RegisterClient";
export const CACHE_OBJECT_STORENAME = "TTERP_LocalCacheData";
export const CACHE_HOSTNAME = "CacheAPI";
export const COOKIELOGIN = "LoginInfo";
export const SESSION_EXPIRE_MINUTE = 30;
export const API_HOST_LIST = {
  AuthenAPI: {
    HostName: "AuthenAPI",
    HostBaseURL: "https://erpauthenapi.dichvutantam.vn/",
  },
  TMSAPI: {
    HostName: "TMSAPI",
    // HostBaseURL: "http://192.168.1.5:2121/",
    // HostBaseURL: "http://localhost:44338/",
    // HostBaseURL: 'http://devtmsapi.tterpbeta.vn/'
    HostBaseURL: 'https://tmsapi.dichvutantam.vn/'
  },
  TMSMDMAPI: {
    HostName: "TMSMDMAPI",
    // HostBaseURL: "https://localhost:44336/",
    HostBaseURL: "https://devtmsmdmapi.tterpbeta.vn/",
  },
  CacheAPI: {
    HostName: "CacheAPI",
    HostBaseURL: "https://erpcacheapi.dichvutantam.vn/",
    //HostBaseURL:'http://devcacheapi.mwg.vn/'
  },
  ERPAPI: {
    HostName: "ERPAPI",
    HostBaseURL: "https://erpsearchengineapi.dichvutantam.vn/",
  },
};

export const MAX_PAGE_SHOW = 10;

export const DEFAULT_ROW_PER_PAGE = 6;
export const CDN_LOGO_IMAGE = "http://imagecdn.dichvutantam.vn/";
export const CDN_DOWNLOAD_FILE = "http://expfilecdn.tterpbeta.vn/";
