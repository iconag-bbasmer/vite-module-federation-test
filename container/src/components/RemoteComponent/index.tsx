import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";

type Props = {
  fallback?: string | React.ReactNode;
  remoteUrl: string;
  remote: string;
  component: string;
  scope?: string;
  [key: string]: any;
};

const loadComponent = (remoteUrl: string, moduleName: string) => async () => {
  const container = await import(remoteUrl);
  const factory = await container.get(moduleName);
  const Module = factory();
  return Module;
};

const RemoteComponent: FC<Props> = ({ remoteUrl, remote, component, scope = "default", fallback = null, ...props }) => {
  if (!remoteUrl) return <div>Unable to Fetch: {`${remote}/${component}`}</div>;
  const Component = React.lazy(loadComponent(remoteUrl, `./${component}`));

  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>{<Component {...props} />}</React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteComponent;
