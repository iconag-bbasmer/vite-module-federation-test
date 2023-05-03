import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Empty from "sbhEmpty/Empty";

type Props = {
  fallback?: string | React.ReactNode;
  modulesToLoad: any[];
  scope?: string;
  [key: string]: any;
};

const EmptyComponent = Empty;

const RemoteComponent: FC<Props> = ({ modulesToLoad, scope = "default", fallback = null, ...props }) => {
  const [components, setComponents] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (modulesToLoad.length > 0) {
      modulesToLoad.map(async (module: any) => {
        // @ts-ignore
        await __federation_method_setRemote(module.component, {
          url: module.remoteUrl,
          format: "esm",
          from: "vite",
        });

        // @ts-ignore
        const loadedComponent = await __federation_method_getRemote(module.component, `./${module.module}`);
        const Component = loadedComponent.default;
        setComponents((old) => [
          ...old,
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>,
        ]);
      });
    }
  }, [modulesToLoad]);

  return (
    <>
      {components !== undefined && components.length > 0 ? (
        components.map((component: any) => component)
      ) : (
        <p>No components</p>
      )}
    </>
  );
};

export default RemoteComponent;
