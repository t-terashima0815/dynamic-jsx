import createRoot from './jsx/render'
const headingArray = ['Hello', 'World']
export const App = () => <>
  { headingArray.map(heading => <h1>{heading}</h1>) }
</>

const app = document.getElementById('app') ?? document.body

(async () => {
  await createRoot(<App />, app)
  headingArray.push('!')
  await createRoot(<App />, app)
})()

