import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter, Route } from "react-router-dom";

import { connect, getCurrentPathname, iAmReady } from './libs/nexo/helpers';
import nexo from './nexoClient';
import NexoSyncRoute from './NexoSyncRoute';
import Main from './pages/Main';
import Subpage from './pages/Subpage';
import ProductList from './pages/ProductList';

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    connect(nexo).then(async () => {
      const pathname = await getCurrentPathname(nexo);
      if (pathname && pathname !== window.location.pathname) {
        window.location.replace(window.location.origin + pathname);
        return;
      }

      setReady(true);
      iAmReady(nexo);
    });
  }, [])

  if (!ready) return null;

  return (<BrowserRouter>
    <NexoSyncRoute>
      <Switch>
        <Route path="/subpage" exact>
          <Subpage />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </NexoSyncRoute>
  </BrowserRouter>);
}

export default App;
