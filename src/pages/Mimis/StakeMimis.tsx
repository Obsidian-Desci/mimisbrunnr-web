import { Stake } from '@/components/StakeMimis/Stake'

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Container, Heading } from '@chakra-ui/react'
export const StakeMimis = () => {
    return (<>
        <Heading>Stake Mimis</Heading>
        <Container>
            <Box p={4}>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Stake MIMIS/WETH</Tab>
                        <Tab>Remove Stake</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Stake />
                        </TabPanel>
                        <TabPanel>
                            <p>Remove Stake</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
        </>)
}