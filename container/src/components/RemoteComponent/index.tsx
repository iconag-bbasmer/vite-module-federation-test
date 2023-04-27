import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";

type Props = {
  fallback?: string | React.ReactNode;
  modulesToLoad: any[];
  scope?: string;
  [key: string]: any;
};

const loadComponent = (remoteUrl: string, moduleName: string) => async () => {
  const container = await import(remoteUrl);
  const factory = await container.get(moduleName);
  const Module = factory();
  return Module;
};

const RemoteComponent: FC<Props> = ({ modulesToLoad, scope = "default", fallback = null, ...props }) => {
  const [components, setCompoments] = React.useState<any>();

  React.useEffect(() => {
    if (modulesToLoad.length > 0) {
      const promises = modulesToLoad.map(
        async (module: any) => await React.lazy(loadComponent(module.remoteUrl, `./${module.module}`))
      );
      Promise.all(promises).then((results) => {
        let tempComponents: any[] = [];
        results.forEach((Component) => {
          tempComponents.push(
            <ErrorBoundary>
              <React.Suspense fallback={fallback}>{<Component {...props} />}</React.Suspense>
            </ErrorBoundary>
          );
        });
        // debugger;
        setCompoments(tempComponents);
      });
    }
  }, [modulesToLoad]);

  return <>{components && components.map((component: any) => component)}</>;
};

export default RemoteComponent;
