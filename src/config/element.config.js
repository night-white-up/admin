/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-30 18:05:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 15:57:54
 */
// 导入自己需要的组件
import 'element-ui/lib/theme-chalk/index.css'
import {
    Select,
    Option,
    OptionGroup,
    Input,
    Tree,
    Dialog,
    Row,
    Col,
    Table,
    TableColumn,
    Pagination,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Menu,
    MenuItem,
    Submenu,
    Form,
    FormItem,
    Message,
    MessageBox,
} from 'element-ui'
const element = {
    install(Vue) {
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Pagination)
        Vue.use(Button)
        Vue.use(Breadcrumb)
        Vue.use(BreadcrumbItem)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(Submenu)
        Vue.prototype.$message = Message;
        Vue.prototype.$confirm = MessageBox.confirm;
    }
}
export default element