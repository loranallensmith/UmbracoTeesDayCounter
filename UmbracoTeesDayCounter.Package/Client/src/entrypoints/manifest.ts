export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Tees Day Counter Package Entrypoint",
    alias: "UmbracoTeesDayCounter.Package.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
