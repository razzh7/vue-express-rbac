import Vue from "vue";
import {
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Scrollbar,
  Alert,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Dialog,
  Tag,
  Message,
  Card,
  Select,
  Option,
  Tree
} from "element-ui";

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Alert)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
// message不需要使用Vue.use 否则刷新页面会自动弹窗
Vue.prototype.$message = Message;