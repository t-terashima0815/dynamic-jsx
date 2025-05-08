import createRoot from '@/packages/jsx/render'
import Header from "@/components/Header.tsx";
import { Router } from '@/packages/router/router';

export const App = () => <>
  <Header />
  <div id="page-content" style={{ padding: '20px' }}></div>
</>

const app = document.getElementById('app')

if (app) {
  (async () => {
    // Render the main app shell first
    await createRoot(<App/>, app)

    // Get the page content container
    const pageContent = document.getElementById('page-content')

    if (pageContent) {
      // Initialize the router
      const router = new Router(pageContent);

      // Register routes with lazy-loaded components
      router
        .addRoute('/', async () => {
          const { default: HomePage } = await import('./pages/home.tsx');
          return <HomePage />;
        })
        .addRoute('/about', async () => {
          const { default: AboutPage } = await import('./pages/about.tsx');
          return <AboutPage />;
        })
        .addRoute('/login', async () => {
          const { default: LoginPage } = await import('./pages/login.tsx');
          return <LoginPage />;
        });

      // Start the router
      router.start();
    }
  })()
}
