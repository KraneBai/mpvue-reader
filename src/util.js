import config from './config'

export function get (url, data) {
    return request('GET', url, data)
}

export function post (url, data) {
    return request('POST', url, data)
}

export function request (method, url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            method,
            data,
            url: config.host + url,
            success: function (res) {
                if (res.data.code === 0) {
                    resolve(res.data.data)
                } else {
                    showModal('失败', res.data.data.msg)
                    reject(res.data)
                }
            }
        })
    })
}

export function showModal (title, content) {
    wx.showModal({
        title,
        content,
        showCancel: false
    })
}

export function showSuccess (title) {
    wx.showToast({
        title,
        icon: 'success'
    })
}
