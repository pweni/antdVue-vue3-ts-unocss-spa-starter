import { message } from 'ant-design-vue'
import { AxiosError } from 'axios'
export const errorNotify = (
    error?: AxiosError,
    msg: string = `Oops...No internet connection or Server is dead! If server is dead, Please send me an email at 961886900@qq.com and wait for repair.`
) => {
    message.error({
        content: msg,
        style: {
            zIndex: 9999,
        },
        duration: 20,
    })
}
