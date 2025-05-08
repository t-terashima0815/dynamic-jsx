import type { Node } from '@/packages/jsx/jsx-runtime';

type RouteConfig = {
  path: string;
  component: () => Promise<Node>;
};

export class Router {
  private routes: RouteConfig[] = [];
  private container: HTMLElement;
  private currentComponent: Node | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    // Listen for browser back/forward button events
    window.addEventListener('popstate', () => this.handleRouteChange());
  }

  // Register a route
  addRoute(path: string, component: () => Promise<Node>) {
    this.routes.push({ path, component });
    return this;
  }

  // Render component based on current URL
  async handleRouteChange() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path);

    if (route) {
      // Dynamically load the component for the matching route
      this.currentComponent = await route.component();

      // Use the existing render function to render the component
      const render = (await import('@/packages/jsx/render')).render;
      this.container.innerHTML = '';
      await render(this.currentComponent, this.container);
    }
  }

  // Navigate to a new URL without page reload
  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.handleRouteChange();
  }

  // Start handling the initial route
  start() {
    this.handleRouteChange();
  }
}
