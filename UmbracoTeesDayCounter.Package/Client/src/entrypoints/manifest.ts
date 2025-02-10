export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Tees Day Counter Package Entrypoint",
    alias: "UmbracoTeesDayCounter.Package.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  },
  {
    type: "headerApp",
    alias: "H5YR.UmbracoTeesCounter.HeaderApp",
    name: "Umbraco Tees Day Counter",
    element: () => import("../elements/header-app-element"),
    kind: "button",
    weight: 200,
    meta: {
      label: "Umbraco Tees Day!",
      icon: "icon-t-shirt",
      href: "https://umbracocommunity.store/"
    }
  }
];
