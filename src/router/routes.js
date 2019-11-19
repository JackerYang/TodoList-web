import Main from "../pages/Main.vue";

export default [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "add",
        name: "add-item",
        component: () => import("../views/EditItem.vue")
      },
      {
        path: "edit/:id",
        name: "edit-item",
        component: () => import("../views/EditItem.vue")
      },
    ]
  }
];