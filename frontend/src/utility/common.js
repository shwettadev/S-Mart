import Cookies from "js-cookie";
export const checkUserToken = (callback) => {
    let data = Cookies.get("isLoggedin");
    if (data) {
        callback(true);
    } else {
        callback(false);
    }
 };