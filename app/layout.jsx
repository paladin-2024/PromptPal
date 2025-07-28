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
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/public/assets/images/logo.svg" />

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