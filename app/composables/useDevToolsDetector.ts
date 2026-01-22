// composables/useDevToolsDetector.ts
export const useDevToolsDetector = () => {
  if (import.meta.server) return

  onMounted(() => {
    if (import.meta.dev) return

    const warning = () => {
      console.log('%cSTOP!!! Yamete kudasai!!!', 'color: red; font-size: 80px; font-weight: bold; text-shadow: 3px 3px 0 rgb(217,31,38) ;')
      console.log('%cmày định làm j?', 'font-size: 20px; color: yellow; background: black; padding: 10px;')
    }

    const devtools = {
      isOpen: false
    }

    const element = new Image()
    Object.defineProperty(element, 'id', {
      get: () => {
        warning()
        throw new Error("DevTools detected");
      }
    })

    const timer = setInterval(() => {
      console.log(element)
      console.clear()
      onUnmounted(() => clearInterval(timer))
    })
  }



