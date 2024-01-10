// Utilities
import { h, defineComponent, defineAsyncComponent } from "vue";

// Component
import Auth from "../components/Auth/Auth.vue";

export const withAuth = (component: any) =>
  defineComponent(() => {
    const renderComponent = () => {
      /**@description If the component is a async component, use defineAsyncComponent */
      if (component instanceof Function && !component?.render) {
        return defineAsyncComponent(component);
      }
      return component;
    };

    return () => {
      return h(Auth, null, {
        default: () => h(renderComponent()),
      });
    };
  });
