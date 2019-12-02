import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { toast } from 'react-toastify';
import withRedux from 'next-redux-wrapper';
import store from '../store/store';
import NextNProgress  from '../config/NextNProgress';
toast.configure()
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        const { store } = ctx || {};
        return { pageProps, store }
    }

    render() {
        const { Component, store, pageProps } = this.props;
        return(
            <Container>
                <Provider store={store}>
                    <NextNProgress />
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withRedux(store)(MyApp)