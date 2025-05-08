import createRoot from '@/packages/jsx/render'
import Header from "@/components/Header.tsx";

export const App = () => <>
  <Header />
</>

const app = document.getElementById('app')

if (app) {
  (async () => {
    await createRoot(<App/>, app)
  })()
}
