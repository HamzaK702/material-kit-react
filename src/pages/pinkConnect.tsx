import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PinkConnectView } from 'src/sections/pinkConnect/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`PinkConnect - ${CONFIG.appName}`}</title>
      </Helmet>

      <PinkConnectView />
    </>
  );
}
