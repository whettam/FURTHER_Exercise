// src/components/GoogleScripts.js
import { useEffect } from 'react';

const GoogleScripts = () => {
  useEffect(() => {
    const gtmId = process.env.REACT_APP_GTM_ID;
    const gaId = process.env.REACT_APP_GA_ID;

    // Insert GTM script
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(gtmScript);

    // Insert GA script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    const gaInlineScript = document.createElement('script');
    gaInlineScript.innerHTML = `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');`;
    document.head.appendChild(gaInlineScript);

    // Insert GTM noscript iframe
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  }, []);

  return null;
};

export default GoogleScripts;
