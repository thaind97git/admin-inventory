import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html>
                <Head>
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/static/access/antd.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/static/access/ReactToastify.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/static/access/main.css"
                    />
                    {/* <link
                        rel="stylesheet"
                        type="text/css"
                        href="/static/access/bootstrap.min.css"
                    /> */}
                    <link rel="shortcut icon" href="/static/image/favicon.png"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}