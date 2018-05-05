module.exports = {

  // 设置cookie
  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setDate(d.getDate() + exdays);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/`;
  },

  // 获取cookie
  getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) !== -1) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },

  // 清除cookie
  clearCookie(cname) {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=''; ${expires}; path=/`;
  }
}
;
