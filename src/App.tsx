import Well from '@/assets/QmfFhyvwK6YnURiW3o4WkEH9XhkzyTRUPUnKCPqgxi2hb7.jpg'

import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
export const App = () => {
  const navigate = useNavigate()
    return(
    <Stack minH = { '100vh'} direction = {{ base: 'column', md: 'row' }} >
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple.400',
                zIndex: -1,
              }}>
              Mimisbrunnr
            </Text>
            <br />{' '}
            <Text color={'purple.400'} as={'span'}>
                Knowledge Well
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
           Sell Desci token/WETH LP and receive minted MIMIS,
           Unwrap MIMIS and receive Desci tokens + WETH 
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'purple.400'}
              color={'white'}
              _hover={{
                bg: 'purple.500',
              }}
              onClick={() => {
                navigate('/mimis/mint')
              }}
              >
              Mint Mimis
            </Button>
            <Button onClick={() => {
              window.open('https://obsidian-desci.github.io/Docs/docs/category/mimisbrunnr', '_blank')
            }}rounded={'full'}>Read the Docs</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={Well}
        />
      </Flex>
    </Stack >
  )
}