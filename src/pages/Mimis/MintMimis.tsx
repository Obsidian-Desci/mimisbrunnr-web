import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Container, Heading } from '@chakra-ui/react'
import { BYOL } from '@/components/MintMimis/BYOL'
export const MintMimis = () => {

    return (<>
        <Heading>Mint Mimis</Heading>
        <Container>
            <Box p={4}>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Bring Your Own Liquidity</Tab>
                        <Tab>Zap In</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <BYOL />
                        </TabPanel>
                        <TabPanel>
                            <p>Zap In</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container>
    </>)
}