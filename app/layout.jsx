import '@styles/index.css'
import Provider from '@components/Provider.jsx'
import Nav from '@components/Nav.jsx';

export const metadata = {
    title: "InspireAI",
    description: "Discover & Share AI Prompts",
    icons: {
      icon: "/assets/Logo-.png",
    },
  };
const RootLayout = ( { children } ) => {
  return (
    <html lang='en'>
        <body>
        <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
              <Nav />
              {children}
              </main>
        </Provider>
        </body>
    </html>
  )
}

export default RootLayout