import Layout from '../components/layout/Layout';
import '../styles/globals.css';
//This is basically our App.js component. It will not be rendered to the user
function MyApp({ Component, pageProps }) {

  return (
    <Layout>  
      <Component {...pageProps}/>
    </Layout>
  );
}

export default MyApp;

