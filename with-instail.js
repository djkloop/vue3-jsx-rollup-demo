

export const withInstall = (
  main
) => {
  main.install = app => {
    app.component(comp.name, comp)
  }
  return main
}