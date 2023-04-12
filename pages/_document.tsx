import { Html, Head, Main, NextScript } from 'next/document';
import { TagManagerTag } from '../components/common/google_tag_manager/tag_manager_tag';

export default function Document() {
  return (
    <Html style={{scrollBehavior: "smooth"}}>
        <Head>
            <TagManagerTag />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {/* <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet" /> */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block" rel="stylesheet" />
            
            <link href="/fonts/CabinetGrotesk-Regular.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link href="/fonts/CabinetGrotesk-Extrabold.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link href="/fonts/GloriaHallelujah-Regular.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        </Head>
      
        <body style={{position: "relative"}}>
            <noscript>
                <iframe 
                    src="https://www.googletagmanager.com/ns.html?id=GTM-MPR3T85" 
                    height="0" width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>

            <Main />
            
            <NextScript />
        </body>
    </Html>
  )
}