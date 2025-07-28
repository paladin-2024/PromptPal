import "@styles/globals.css";
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "PromptPal",
    description: "Discover & Share AI Prompts",

};

const RootLayout = ({ children }) => (
    <html lang='en'>
    <head>
        <link rel="icon" href="/public/assets/images/logo.svg" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
    </head>
    <body>
        <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav/>
                {children}
            </main>
        </Provider>
    </body>
    </html>
);

export default RootLayout;