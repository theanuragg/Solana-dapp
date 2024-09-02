import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocumnet extends Document {

    static async getInitialProps(ctx: DocumentContext) {
      const initialProps =await Document.getInitialProps(ctx)

      return initialProps;
      
    }

    render(){
      return (
        <Html>
          <Head>
            <link rel="stylesheet" href="/favion.icon" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
}

export default MyDocumnet;