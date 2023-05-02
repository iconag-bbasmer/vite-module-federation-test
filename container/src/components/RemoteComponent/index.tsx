import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Empty from "sbhEmpty/Empty";

type Props = {
  fallback?: string | React.ReactNode;
  modulesToLoad: any[];
  scope?: string;
  [key: string]: any;
};

// const loadComponent = (remoteUrl: string, moduleName: string) => async () => {
//   const container = await import(remoteUrl);
//   const factory = await container.get(moduleName);
//   const Module = factory();
//   return Module;
// };

const EmptyComponent = Empty;

const remotesMap: any = {};

const loadComponent = (componentName: string, moduleName: string) => async () => {
  // @ts-ignore
  const component = await __federation_method_getRemote(componentName, moduleName);
  return component.default;
};

const RemoteComponent: FC<Props> = ({ modulesToLoad, scope = "default", fallback = null, ...props }) => {
  const [components, setCompoments] = React.useState<any>();

  React.useEffect(() => {
    if (modulesToLoad.length > 0) {
      // debugger;
      const promises = modulesToLoad.map(async (module: any) => {
        remotesMap[module.component] = {
          url: module.remoteUrl,
          format: "esm",
          from: "vite",
        };
        return await React.lazy(loadComponent(module.component, `./${module.module}`));
      });
      Promise.all(promises).then((results) => {
        let tempComponents: any[] = [];
        results.forEach((Component) => {
          tempComponents.push(
            <ErrorBoundary>
              <React.Suspense fallback={fallback}>{<Component {...props} />}</React.Suspense>
            </ErrorBoundary>
          );
        });
        setCompoments(tempComponents);
      });
    }
  }, [modulesToLoad]);

  return <>{components && components.map((component: any) => component)}</>;
};

export default RemoteComponent;
