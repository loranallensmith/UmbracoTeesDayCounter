const e = [
  {
    name: "Umbraco Tees Day Counter Package Entrypoint",
    alias: "UmbracoTeesDayCounter.Package.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BSlTz4-p.js")
  },
  {
    type: "headerApp",
    alias: "H5YR.UmbracoTeesCounter.HeaderApp",
    name: "Umbraco Tees Day Counter",
    element: () => import("./header-app-element-Dooy9mkq.js"),
    kind: "button",
    weight: 200,
    meta: {
      label: "Umbraco Tees Day!",
      icon: "icon-t-shirt",
      href: "https://umbracocommunity.store/"
    }
  }
], t = [
  ...e
];
export {
  t as manifests
};
//# sourceMappingURL=umbraco-tees-day-counter-package.js.map
