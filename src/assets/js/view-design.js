/**
 * @desc 按需引入view-design组件
 */

import {
  Button,
  Table,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Message
} from "view-design";

const viewDesign = {
  install: Vue => {
    Vue.component("Button", Button);
    Vue.component("Table", Table);
    Vue.component("Icon", Icon);
    Vue.component("Breadcrumb", Breadcrumb);
    Vue.component("BreadcrumbItem", BreadcrumbItem);
    Vue.component("Input", Input);
    Vue.component("Form", Form);
    Vue.component("FormItem", FormItem);
    Vue.component("Row", Row);
    Vue.component("Col", Col);
    Vue.component("DatePicker", DatePicker);
    Vue.component("TimePicker", TimePicker);
    Vue.prototype.$Message = Message;
  }
};

export default viewDesign;