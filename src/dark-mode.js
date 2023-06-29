const storageKey = "theme-preference"

const changeTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light"
  setPreference()
}

const getColorPreference = () => {
  const preference = localStorage.getItem(storageKey)
  if (preference) {
    return preference
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  const toggleElement = document.querySelector("#toggle")
  document.firstElementChild.dataset.theme = theme.value
  toggleElement?.setAttribute("aria-label", theme.value)
  toggleElement?.toggleAttribute("checked", theme.value === "dark")
}

const theme = {
  value: getColorPreference(),
}
reflectPreference()

window.addEventListener("load", () => {
  reflectPreference()
  document.querySelector("#toggle")?.addEventListener("click", changeTheme)
})

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light"
    setPreference()
  })
