import { Token } from "@/hooks/constants"
import { useToken } from "@/hooks/useTokens"
import { UnwrapForm} from '@/components/UnwrapMimis/UnwrapForm'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Container, Heading } from '@chakra-ui/react'
export const UnwrapMimis = () => {
    const { balance: mimisBalance } = useToken(Token.MIMIS)
    return (<>
    <Heading>Unwrap Mimis</Heading> 
        <Container>
            <Box p={4}>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Unwrap Mimis</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <UnwrapForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container>
    </>)
}