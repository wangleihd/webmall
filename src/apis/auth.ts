import request from '@/utils/request'


export const getCaptcha = () => {
	return request({
		url: '/auth/captcha',
		method: 'post'
	})
}