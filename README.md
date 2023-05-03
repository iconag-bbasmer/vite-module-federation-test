# Test with dynamic module federation using Vite

This is a test repo for dynamic module federation using Vite.

The modules to load are specified in the container app in `public/externalRemotes.json`. The remotes specified in this file are being loaded dynamically into the container app.

To start all the apps, use your terminal of choice to cd into the 5 app folders and run `pnpm build && pnpm preview`.
Then open the container app at http://localhost:5001. To load the components, hit the "Load modules" button.

## Known issues

- In the externalRemotes.json are 3 remotes to load. There seems to be a kind of race condition though when loading multiple modules. An error shows up telling that
  React specific code is not available. Reloading the app multiple times and trying to load the components gives different results, sometimes it works, sometimes not.
  If only one module is specified in the `externalRemotes.json` file, everything works without problem.
