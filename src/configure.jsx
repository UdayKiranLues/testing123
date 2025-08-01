
export const baseurl = "http://64.227.131.13:5001"
export const authentication = {
    login_url: `${baseurl}/api/v1/auth/login`,
    cart_url: `${baseurl}/api/v1/cart/list`,
    cart_add: `${baseurl}/api/v1/cart/add`,
    cart_update: `${baseurl}/api/v1/cart/quantity/update`,
    Order_Create: `${baseurl}/api/v1/order/create`,
    Order_list: `${baseurl}/api/v1/order/user/list`,
    remove_cart_item: `${baseurl}/api/v1/cart/delete/`,
    checkout : `${baseurl}/api/v1/checkout`,
    products_list : `${baseurl}/api/v1/product/list`
}