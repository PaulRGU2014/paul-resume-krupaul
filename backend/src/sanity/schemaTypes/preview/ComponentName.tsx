import {Badge, Flex, Box} from '@sanity/ui'
import {PreviewProps} from 'sanity'

export function ComponentName(compName: string) {
  return function ComponentNameWithProps(props: PreviewProps) {
    return (
      <Flex align="center">
        <Box flex={1}>{props.renderDefault(props)}</Box>
        <Badge tone="positive">{compName}</Badge>
      </Flex>
    )
  }
}