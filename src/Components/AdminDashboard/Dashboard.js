
import { CacheProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


import { createTheme } from './theme';
import { createEmotionCache } from './utils/create-emotion-cache';
import {Layout} from "./layout";
import 'simplebar-react/dist/simplebar.min.css';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const Dashboard = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    // useNProgress();
    //
    // const getLayout = Component.getLayout ?? ((page) => page);

    const theme = createTheme();

    return (
        <CacheProvider value={emotionCache}>
            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                            {
                                // (auth) => auth.isLoading
                                //     ? <SplashScreen />
                                //     : getLayout(<Component {...pageProps} />)
                                <Layout />
                            }
                    </ThemeProvider>
            {/*</LocalizationProvider>*/}
        </CacheProvider>
    );
};

export default Dashboard;
