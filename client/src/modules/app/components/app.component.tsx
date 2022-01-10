import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'utilities/services/query-client.service';
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '../../../assets/theme';
import { Loading } from '../../../shared/components/loading.component';
import { Navbar } from './navbar.component';
import { Routes } from './routes.component';

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Loading />
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} 
                            position="bottom-right" 
        />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
